export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));

    return `{${entries.map(([key, val]) => `${JSON.stringify(key)}:${stableStringify(val)}`).join(",")}}`;
  }

  return JSON.stringify(value);
}

export function normalizeForCompare(value: unknown): unknown {
  if (Array.isArray(value)) {
    const normalized = value.map(normalizeForCompare);

    if (normalized.every((item) => Array.isArray(item))) {
      return [...(normalized as unknown[][])]
        .map((group) => [...group].sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))))
        .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b)));
    }

    return normalized;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, val]) => [key, normalizeForCompare(val)]),
    );
  }

  return value;
}

export function compareOutputs(actual: string, expected: string): boolean {
  try {
    const parsedActual = JSON.parse(actual);
    const parsedExpected = JSON.parse(expected);

    return stableStringify(normalizeForCompare(parsedActual)) === stableStringify(normalizeForCompare(parsedExpected));
  } catch {
    return actual.trim() === expected.trim();
  }
}
