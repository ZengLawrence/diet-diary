import numeral from "numeral";


export function toIntString(val?: number): string {
  return numeral(val).format('0');
}

export function toString(val?: number): string {
  return numeral(val).format('0.0');
}