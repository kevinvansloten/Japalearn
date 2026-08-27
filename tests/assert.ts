let passed = 0;
let failed = 0;

export function ok(label: string, condition: boolean, detail = ''): void {
  if (condition) {
    passed += 1;
    return;
  }
  failed += 1;
  console.log(`FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
}

export function eq(label: string, got: unknown, want: unknown): void {
  ok(label, got === want, `got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
}

export function summarise(): void {
  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed) process.exitCode = 1;
}
