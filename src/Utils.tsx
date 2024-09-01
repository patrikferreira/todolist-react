let currentId = 0;

export function generateUniqueId(): number {
  return ++currentId;
}
