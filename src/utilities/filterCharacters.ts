import type {FormulaValue, Character} from '@/types'

export const filterCharecters = (formula: FormulaValue[], offset?: number): string => {
  const cursorIndex = formula.findIndex((el) => el.type === "cursor");
  const lastElementIndex = offset ? cursorIndex + offset : cursorIndex;
  const filtered = formula.filter((el, i) => {
    return el.type === "character" && i < lastElementIndex;
  }) as Character[];
  let lastOperandIndex = -1;
  filtered.forEach((el, i) => {
    if (!/[a-zA-Z0-9]/.test(el.value)) {
      lastOperandIndex = i;
    }
  });
  const res = filtered
    .slice(lastOperandIndex + 1)
    .map((el) => el.value)
    .join("");
  return res;
};