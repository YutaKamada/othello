import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, WHITE } from "../../../../constants/board";
import {
  boardSelector,
  Coordinate,
  KindOfStone,
} from "../../../../recoil/boardAtom";
import { canPutBoardAtom } from "../../../../recoil/canPutBoardAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";
import { turnOverStones } from "../../../utils/logic";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardSelector);
  const canPutBoardState = useRecoilValue(canPutBoardAtom);

  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);

  const clickCallbackFactory = useCallback(
    (coordinate: Coordinate) => {
      const { v, h } = coordinate;
      const isEnable = canPutBoardState[v][h];
      const turn = gameStatus.turn;

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

        // ポイント更新
        const points = Object.entries(turnOveredBoardState)
          .map(([_, row]) =>
            Object.entries(row).map(([_, stone]) => stone as KindOfStone)
          )
          .flat()
          .reduce(
            (acc, cur) => {
              const black = cur === BLACK ? acc.black + 1 : acc.black;
              const white = cur === WHITE ? acc.white + 1 : acc.white;
              return { black, white };
            },
            { black: 0, white: 0 }
          );

        // 白黒変更
        setGameStatus((prev) => ({
          ...prev,
          points,
          turn: prev.turn === BLACK ? WHITE : BLACK,
        }));
      };
    },
    [boardState, gameStatus, canPutBoardState, setBoardState, setGameStatus]
  );

  // NOTE: canPutBoardStateを更新するために初回セットを行う
  useEffect(() => {
    setBoardState((prev) => prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clickCallbackFactory };
};
