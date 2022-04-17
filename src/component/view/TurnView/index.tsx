import { Box, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import {
  BLACK,
  BLACK_IMAGE,
  WHITE,
  WHITE_IMAGE,
} from "../../../constants/board";
import { StoneState } from "../../../recoil/boardAtom";

interface TurnViewProps {
  turn: StoneState;
  passCallback: (() => void) | undefined;
}

export const TurnView: FC<TurnViewProps> = ({ turn, passCallback }) => {
  return (
    <Grid container>
      <Grid xs={12} display="flex" justifyContent="center">
        <Typography variant="h3">
          {turn === BLACK ? (
            <>
              <img
                src={BLACK_IMAGE}
                alt="point of white cat"
                width={50}
                height={50}
              />
              黒の番です
            </>
          ) : null}
          {turn === WHITE ? (
            <>
              <img
                src={WHITE_IMAGE}
                alt="point of white cat"
                width={50}
                height={50}
              />
              白の番です
            </>
          ) : null}
        </Typography>
        {!!passCallback ? (
          <Box ml={3} display="flex" alignItems="center">
            <Button
              onClick={passCallback}
              style={{ backgroundColor: "rgb(243 124 124)" }}
            >
              <Typography variant="h6" color={"black"}>
                パス
              </Typography>
            </Button>
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
};
