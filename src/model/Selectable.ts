export interface Selectable {
  selected: boolean;
}

export function initSelectable<T>(obj: T, selected = false): (T & Selectable) {
  return {
    ...obj,
    selected
  }
};
