export const range = (n: number, offset = 0) => [...Array(n).keys()].map(x => offset + x)
