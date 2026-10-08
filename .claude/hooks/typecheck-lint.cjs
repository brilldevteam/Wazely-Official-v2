#!/usr/bin/env node
/**
 * PostToolUse hook: after Write/Edit touches a .ts/.tsx file, run
 * `npm run typecheck` and `npm run lint`. Silent on success. On failure,
 * prints a trimmed summary to stderr and exits 2 so an `asyncRewake` hook
 * surfaces it back to Claude without blocking the edit that triggered it
 * (the hook runs async — see .claude/settings.json).
 */
const { execSync } = require("node:child_process");

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    // PostToolUse always sends a payload, but don't hang forever if not.
    setTimeout(() => resolve(data), 2000);
  });
}

function filePath(payload) {
  try {
    const input = JSON.parse(payload).tool_input || {};
    return input.file_path || input.notebook_path || "";
  } catch {
    return "";
  }
}

function run(cmd) {
  try {
    execSync(cmd, { cwd: __dirname + "/../..", stdio: "pipe" });
    return { ok: true, output: "" };
  } catch (error) {
    const out = `${error.stdout || ""}${error.stderr || ""}`.trim();
    return { ok: false, output: out };
  }
}

(async () => {
  const file = filePath(await readStdin());
  if (!/\.(ts|tsx)$/.test(file)) process.exit(0);

  const typecheck = run("npm run typecheck");
  const lint = run("npm run lint");

  if (typecheck.ok && lint.ok) process.exit(0);

  const sections = [];
  if (!typecheck.ok) sections.push(`--- typecheck ---\n${typecheck.output}`);
  if (!lint.ok) sections.push(`--- lint ---\n${lint.output}`);
  const summary = `typecheck/lint found issues after editing ${file}\n\n${sections.join("\n\n")}`;
  process.stderr.write(summary.slice(0, 3000));
  process.exit(2);
})();
