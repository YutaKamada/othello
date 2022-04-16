import { Box } from "@mui/material";
import { FC } from "react";
import { Cell } from "../Cell";
import { useCellCallbacks } from "./hooks/useCellCallbacks";

const length = Array.from({ length: 8 });

export const Board: FC = () => {
  const { clickCallbackFactory } = useCellCallbacks();
  return (
    <>
      {length.map((_, i) => (
        <Box key={`c-row-${i}`} display="flex">
          {length.map((_, j) => (
            <Box key={`c-${j}`}>
              <Cell i={i} j={j} onClick={clickCallbackFactory(i, j)} />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};
