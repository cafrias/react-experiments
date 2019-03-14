import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

import LoginForm from "./components/Naive";

function App({ classes }) {
  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={8}
        justify="center"
        alignContent="center"
        className={classes.container}
      >
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <LoginForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(t => ({
  container: {
    height: "66vh",
    maxWidth: "100vw"
  },
  paper: {
    padding: `${t.spacing.unit * 4}px ${t.spacing.unit * 3}px`
  }
}))(App);
