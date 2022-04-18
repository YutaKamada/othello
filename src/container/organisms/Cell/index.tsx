import { Box } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  BLACK,
  BLACK_IMAGE,
  BOTH,
  CELL_STYLE,
  WHITE_IMAGE,
} from "../../../constants/board";
import {
  Coordinate,
  cellSelector,
  StoneState,
} from "../../../recoil/boardAtom";
import { canPutCellSelector } from "../../../recoil/canPutBoardAtom";
import { gameStatusAtom } from "../../../recoil/gameStatusAtom";

interface Props {
  coordinate: Coordinate;
  onClick: (() => void) | undefined;
}

export const Cell: FC<Props> = React.memo(({ coordinate, onClick }) => {
  const cellState = useRecoilValue(cellSelector(coordinate));
  const canPutCellState = useRecoilValue(canPutCellSelector(coordinate));
  const { turn } = useRecoilValue(gameStatusAtom);
  const enable = useMemo(
    () =>
      canPutCellState !== undefined &&
      (canPutCellState === turn || canPutCellState === BOTH),
    [turn, canPutCellState]
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={CELL_STYLE.width}
      height={CELL_STYLE.height}
      border="solid 1px"
      onClick={enable ? onClick : undefined}
      style={{ cursor: !cellState && enable ? "pointer" : "default" }}
    >
      <Stone stoneState={cellState} />
      {enable ? <Stone stoneState={turn} opacity={0.2} /> : null}
    </Box>
  );
});

const Stone: FC<{ stoneState: StoneState; opacity?: number }> = ({
  stoneState,
  opacity,
}) => {
  if (stoneState === undefined) {
    return null;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {stoneState === BLACK ? (
        <img
          src={BLACK_IMAGE}
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity }}
        />
      ) : (
        <img
          src={WHITE_IMAGE}
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity }}
        />
      )}
    </Box>
  );
};
