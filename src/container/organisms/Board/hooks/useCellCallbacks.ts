import _ from "lodash";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardSelector, Coordinate } from "../../../../recoil/boardAtom";
import { canPutBoardAtom } from "../../../../recoil/canPutBoardAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";
import { turnOverStones } from "../../../utils/logic";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardSelector);
  const canPutBoardState = useRecoilValue(canPutBoardAtom);

  const { turn } = useRecoilValue(gameStatusAtom);

  const clickCallbackFactory = useCallback(
    (coordinate: Coordinate) => {
      const { v, h } = coordinate;
      const isEnable = canPutBoardState[v][h];

      if (!isEnable || turn === undefined) return undefined;
      return () => {
        const changedBoardState = _.cloneDeep(boardState);

        // 追加の石を配置
        changedBoardState[v][h] = turn;
        const turnOveredBoardState = turnOverStones(
          changedBoardState,
          { v, h },
          turn
        );
        setBoardState(turnOveredBoardState);
      };
    },
    [canPutBoardState, turn, boardState, setBoardState]
  );

  return { clickCallbackFactory };
};
