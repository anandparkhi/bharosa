import test from "node:test";
import assert from "node:assert/strict";
import { GUIDES, getGuide, isTaskId, parseHistory, addOutcome, outcomeStats, helperDraft } from "../.test-build/src/lib/coach.mjs";

test("every supported guide has real steps on Android/iPhone and in English Hindi Marathi", () => {
  assert.equal(GUIDES.length, 6);
  for (const g of GUIDES) {
    for (const device of ["android", "iphone"]) {
      for (const lang of ["en", "hi", "mr"]) {
        const guide = getGuide(g.id, lang, device);
        assert.ok(guide);
        assert.ok(guide.steps.length >= 3);
        assert.ok(guide.steps.every((s) => s.length > 15));
      }
    }
  }
});
test("unlisted tasks cannot become executable or sharable", () => {
  assert.equal(isTaskId("write_cpp"), false);
  assert.equal(getGuide("write_cpp", "en", "android"), null);
  assert.equal(helperDraft("write_cpp", "en", "android"), "");
});
test("help drafts omit raw sensitive user content by construction", () => {
  const message = helperDraft("balance", "en", "android");
  assert.match(message, /OTP or PIN/);
  assert.doesNotMatch(message, /account number:|password:|screenshot:/i);
});
test("malformed, extra-field and unsupported history are rejected", () => {
  assert.deepEqual(parseHistory("invalid JSON"), []);
  assert.deepEqual(parseHistory('{"x":1}'), []);
  assert.deepEqual(parseHistory('[{"task":"write_cpp","outcome":"completed","at":100,"device":"android"}]'), []);
  assert.deepEqual(parseHistory('[{"task":"font","outcome":"completed","at":-5,"device":"android"}]'), []);
});
test("outcome data is bounded and success counts only completed, never opened drafts", () => {
  const start = Date.now();
  let events = [];
  for (let i = 0; i < 110; i++) events = addOutcome(events, { task: "font", outcome: "unresolved", device: "android", at: start });
  assert.equal(events.length, 100);
  events = addOutcome(events, { task: "linked", outcome: "help_requested", device: "iphone", at: start });
  events = addOutcome(events, { task: "block", outcome: "completed", device: "iphone", at: start });
  const stats = outcomeStats(events);
  assert.equal(stats.total, 100);
  assert.equal(stats.completed, 1);
  assert.equal(stats.rate, 0.01);
});
test("history never becomes a high-entropy tracking store", () => {
  const row = { task: "font", outcome: "completed", at: Date.now(), device: "android", note: "my OTP is 123456" };
  const parsed = parseHistory(JSON.stringify([row]));
  assert.equal(parsed.length, 1);
  // History schema is only task / outcome / date / device.
  assert.equal(Object.prototype.hasOwnProperty.call(parsed[0], "note"), false);
});
