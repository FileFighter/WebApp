export function notMinStrLength(text: string, minAnz: number): boolean {
  return text.length < minAnz;
}

export function biggerMaxStrLength(text: string, maxAnz: number): boolean {
  return text.length > maxAnz;
}
