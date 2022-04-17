import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, WHITE } from "../../../../constants/board";
import { boardSelector } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";
import { turnOverStones } from "../../../utils/logic";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardSelector);
  const boardEnableState = useRecoilValue(boardEnableAtom);

  const [warSituation, setWarSituation] = useRecoilState(gameStatusAtom);

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

  // NOTE: EnableStateを更新するために初回セットを行う
  useEffect(() => {
    setBoardState((prev) => prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clickCallbackFactory };
};
