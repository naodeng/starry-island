import type { ActivityDefinition } from '../../content/types';

function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, normalize((value as Record<string, unknown>)[key])]),
    );
  }
  return value;
}

export async function fingerprintActivity(
  activity: ActivityDefinition,
  subtleCrypto: SubtleCrypto = globalThis.crypto.subtle,
): Promise<string> {
  const { id: _activityId, ...content } = activity;
  const canonicalJson = JSON.stringify(normalize(content));
  const digest = await subtleCrypto.digest('SHA-256', new TextEncoder().encode(canonicalJson));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
