import { atom } from "recoil";
import { BLACK, WHITE } from "../constants/constants";

interface WarSituationState {
  turn: typeof BLACK | typeof WHITE | undefined;
  winner: typeof BLACK | typeof WHITE | undefined;
}

export const warSituationAtom = atom<WarSituationState>({
  key: "warSituationState",
  default: { turn: BLACK, winner: undefined },
});
