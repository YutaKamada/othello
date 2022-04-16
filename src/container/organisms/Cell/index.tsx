import { Box } from "@mui/material";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { CELL_STYLE } from "../../../constants/constants";
import { getStoneState, StoneState } from "../../../recoil/boardAtom";

interface Props {
  i: number;
  j: number;
}

export const Cell: FC<Props> = React.memo(({ i, j }) => {
  const state = useRecoilValue(getStoneState({ i, j }));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={CELL_STYLE.width}
      height={CELL_STYLE.width}
      border="solid 1px"
    >
      <Stone state={state} />
    </Box>
  );
});

const Stone: FC<{ state: StoneState }> = ({ state }) => {
  if (state === null) {
    return <Box>空</Box>;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {state === "Black" ? (
        <img
          src="/images/black.png"
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      ) : (
        <img
          src="/images/white.png"
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      )}
    </Box>
  );
};
