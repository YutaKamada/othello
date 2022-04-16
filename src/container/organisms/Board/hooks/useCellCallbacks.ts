import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardAtom } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../../recoil/warSituationAtom";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const [boardEnableState, setBoardEnableState] =
    useRecoilState(boardEnableAtom);

  const [warSituation, setWarSituation] = useRecoilState(warSituationAtom);

  const clickCallbackFactory = useCallback(
    (i: number, j: number) => {
      const isEnable = boardEnableState[i][j];
      if (!isEnable) return undefined;
      return () => {
        const newBoardState = { ...boardState };
        console.log({ newBoardState, i, j, turn: warSituation.turn });
        const targetRow = { ...newBoardState[i] };
        targetRow[j] = warSituation.turn;
        newBoardState[i] = targetRow;

        setBoardState(newBoardState);
      };
    },
    [boardState]
  );
  return { clickCallbackFactory };
};
