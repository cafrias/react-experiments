import React from "react";

import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

import Naive from "./components/Naive";

function App({ classes }) {
  const [value, setValue] = React.useState(0);

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
        <Grid item xs={12} md={5}>
          <Tabs
            value={value}
            onChange={(e, v) => setValue(v)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Naive" />
            <Tab label="Status" />
          </Tabs>
          <Paper className={classes.paper}>
            <SwipeableViews index={value} onChangeIndex={i => setValue(i)}>
              <Naive />
              <Naive />
            </SwipeableViews>
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
