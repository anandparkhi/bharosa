import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../.test-build/api/ai.mjs";
function response() {
  return {
    code: 200,
    headers: {},
    data: null,
    setHeader(k, v) {
      this.headers[k] = v;
      return this;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    }
  };
}
const req = (body) => ({
  method: "POST",
  body,
  headers: { host: "bharosa.example" },
  socket: { remoteAddress: "test" }
});
test("wrong method returns Allow and no-store", async () => {
  const res = response();
  await handler({ ...req({}), method: "GET" }, res);
  assert.equal(res.code, 405);
  assert.equal(res.headers.Allow, "POST");
  assert.equal(res.headers["Cache-Control"], "no-store");
});
test("malformed request returns 400", async () => {
  const res = response();
  await handler(req({ mode: "ask", text: {} }), res);
  assert.equal(res.code, 400);
});
test("cross-origin browser submission is rejected", async () => {
  const res = response();
  await handler(
    { ...req({ mode: "ask", text: "font" }), headers: { host: "bharosa.example", origin: "https://evil.example" } },
    res
  );
  assert.equal(res.code, 403);
});
test("scope refusal is enforced through actual API with no AI key", async () => {
  const res = response();
  await handler(req({ mode: "ask", text: "I use a C++ coding app on my phone. Print Hello World.", lang: "en" }), res);
  assert.equal(res.code, 200);
  assert.equal(res.data.supported, false);
  assert.doesNotMatch(res.data.answer, /#include/);
});
test("supported API phone help works without AI key", async () => {
  const res = response();
  await handler(req({ mode: "ask", text: "How do I block a number?", lang: "en" }), res);
  assert.equal(res.code, 200);
  assert.equal(res.data.topic, "block");
});
