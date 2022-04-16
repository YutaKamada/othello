import { selector } from "recoil";
import { boardAtom } from "./boardAtom";

export const boardSelector = selector({
  key: "boardSelector",
  get: ({ get }) => {
    const state = get(boardAtom);
    return state;
  },
});
