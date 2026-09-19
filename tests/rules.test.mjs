import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runRules } from "../.test-build/rules.mjs";

const drills = JSON.parse(readFileSync(new URL("../src/data/drills.json", import.meta.url), "utf8"));
const LANGS = ["hi", "mr", "en"];

for (const { id, scam, text } of drills) {
  for (const lang of LANGS) {
    test(`drill ${id} [${lang}] ${scam ? "is RED" : "is not RED"}`, () => {
      const { forced, hits } = runRules(text[lang]);
      if (scam) assert.equal(forced, "RED", `hits: ${hits.join(",")}`);
      else assert.notEqual(forced, "RED", `hits: ${hits.join(",")}`);
    });
  }
}

test("bank's own 'do not share OTP' SMS is not an OTP request", () => {
  assert.equal(runRules("Your OTP is 123456. Do not share it with anyone.").hits.includes("otp_request"), false);
});
test("caller asking for OTP is critical", () => {
  assert.equal(runRules("Please tell me the OTP you just received").forced, "RED");
});
