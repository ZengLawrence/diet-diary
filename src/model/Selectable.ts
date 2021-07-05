export interface Selectable {
  selected: boolean;
}

export function initSelectable<T>(obj: T): (T & Selectable) {
  return {
    ...obj,
    selected: false
  }
};

export function setSelected<T>(obj: (T & Selectable), selected: boolean): (T & Selectable) {
  return {
    ...obj,
    selected
  }
};
