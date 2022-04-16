import _ from "lodash";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { BLACK, WHITE } from "../../../../constants/constants";
import { boardAtom } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../../recoil/warSituationAtom";
import { turnOverStones } from "../../../utils/logic";

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
        const newBoardState = _.cloneDeep(boardState);

        // クリック分の石を配置
        newBoardState[v][h] = turn;

        setBoardState(
          turnOverStones({
            boardState: newBoardState,
            coordinate: { v, h },
            turn,
          })
        );

        // 白黒変更
        setWarSituation((prev) => ({
          ...prev,
          turn: prev.turn === BLACK ? WHITE : BLACK,
        }));
      };
    },
    [boardState, warSituation]
  );
  return { clickCallbackFactory };
};
