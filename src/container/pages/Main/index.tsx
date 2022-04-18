import { Grid, Typography } from "@mui/material";
import React from "react";
import { FC } from "react";
import { StatusView } from "../../organisms/StatusView";
import { Board } from "../../organisms/Board";
import { ResultDialog } from "../../organisms/ResultDialog.tsx";
import { useGameCallbacks } from "./hooks/useGameCallbacks";
import { TurnView } from "../../organisms/TurnView";

export const Main: FC = () => {
  const { passCallback, resetCallback } = useGameCallbacks();
  return (
    <>
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="center" mb={5}>
          <Title />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
          <TurnView passCallback={passCallback} />
        </Grid>
        <Grid item md={12} lg={8} display="flex" justifyContent="center">
          <Board />
        </Grid>
        <Grid item md={12} lg={4} p={3}>
          <StatusView />
        </Grid>
      </Grid>
      <ResultDialog resetCallback={resetCallback} />
    </>
  );
};

const Title: FC = React.memo(() => {
  return <Typography variant="h2">オセロ</Typography>;
});
