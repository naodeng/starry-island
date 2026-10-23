/** IDs accepted by the challenge routes. Keep manifest validation aligned with route parsing. */
export function isValidChallengeGroupId(id: string): boolean {
  return /^[a-z0-9-]+$/.test(id);
}

/** Challenge task IDs encode a group-like path segment and a task path segment. */
export function isValidChallengeTaskId(id: string): boolean {
  return /^[a-z0-9-]+\/[a-z0-9-]+$/.test(id);
}
