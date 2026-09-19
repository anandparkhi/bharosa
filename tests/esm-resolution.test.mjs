import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * package.json sets "type": "module", so Vercel runs api/*.js as real Node ESM,
 * where relative imports MUST carry an explicit file extension. tsc does not add
 * one on emit, so an extensionless specifier typechecks locally and then fails in
 * production with ERR_MODULE_NOT_FOUND. Guard both server-side folders.
 */
const files = ["api", "server"].flatMap((dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => join(dir, f))
);

test("every server-side relative import has an explicit .js extension", () => {
  const offenders = [];
  for (const file of files) {
    for (const [, spec] of readFileSync(file, "utf8").matchAll(/from\s+"(\.[^"]*)"/g)) {
      if (!spec.endsWith(".js")) offenders.push(`${file} -> ${spec}`);
    }
  }
  assert.deepEqual(offenders, [], `extensionless ESM imports will 500 on Vercel:\n${offenders.join("\n")}`);
});
