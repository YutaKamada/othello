import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { BLACK, WHITE } from "../../../../constants/constants";
import { boardAtom } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../../recoil/warSituationAtom";
import { createEnableBoard, turnOverStones } from "../../../utils/logic";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const [boardEnableState, setBoardEnableState] =
    useRecoilState(boardEnableAtom);

  const [warSituation, setWarSituation] = useRecoilState(warSituationAtom);

  const clickCallbackFactory = useCallback(
    (v: number, h: number) => {
      const isEnable = boardEnableState[v][h];
      const turn = warSituation.turn;

      if (!isEnable || turn === undefined) return undefined;
      return () => {
        const changedBoardState = _.cloneDeep(boardState);

        // クリック分の石を配置
        changedBoardState[v][h] = turn;
        const turnOveredBoardState = turnOverStones({
          boardState: changedBoardState,
          coordinate: { v, h },
          turn,
        });
        setBoardState(turnOveredBoardState);

        // 白黒変更
        setWarSituation((prev) => ({
          ...prev,
          turn: prev.turn === BLACK ? WHITE : BLACK,
        }));
      };
    },
    [boardState, warSituation, boardEnableState, setBoardState, setWarSituation]
  );

  useEffect(() => {
    setBoardEnableState(createEnableBoard(boardState));
  }, [boardState, setBoardEnableState]);

  return { clickCallbackFactory };
};
