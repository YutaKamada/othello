import { Box } from "@mui/material";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { BLACK, CELL_STYLE } from "../../../constants/constants";
import {
  Coordinate,
  getStoneState,
  StoneState,
} from "../../../recoil/boardAtom";
import { getEnableCellState } from "../../../recoil/boardEnableAtom";

interface Props {
  coordinate: Coordinate;
  onClick: (() => void) | undefined;
}

export const Cell: FC<Props> = React.memo(({ coordinate, onClick }) => {
  const state = useRecoilValue(getStoneState(coordinate));
  const enable = useRecoilValue(getEnableCellState(coordinate));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={CELL_STYLE.width}
      height={CELL_STYLE.height}
      border="solid 1px"
      onClick={enable ? onClick : undefined}
      style={{ cursor: !state && enable ? "pointer" : "default" }}
    >
      <Stone state={state} />
    </Box>
  );
});

const Stone: FC<{ state: StoneState }> = ({ state }) => {
  if (state === undefined) {
    return <Box>空</Box>;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {state === BLACK ? (
        <img
          src="/images/blackCat.png"
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      ) : (
        <img
          src="/images/whiteCat.png"
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      )}
    </Box>
  );
};
