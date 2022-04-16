import { Box } from "@mui/material";
import { FC } from "react";
import { Cell } from "../Cell";

const length = Array.from({ length: 8 });

export const Board: FC = () => {
  return (
    <>
      {length.map((_, i) => (
        <Box key={`c-row-${i}`} display="flex">
          {length.map((_, j) => (
            <Box key={`c-${j}`}>
              <Cell i={i} j={j} />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};
