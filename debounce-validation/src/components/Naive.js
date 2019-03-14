import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import { Formik, Form } from "formik";

import isEmail from "validator/lib/isEmail";
import Input from "./Input";

function Naive({ classes }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={values => {
        console.log("Submitting values:", values);
      }}
      validate={validate}
    >
      {formikBag => (
        <Form className={classes.form}>
          <div className={classes.fieldGroup}>
            <Typography variant="caption">
              Try with: `user@example.com`
            </Typography>
            <Input
              formikBag={formikBag}
              id="email"
              name="email"
              type="email"
              debounce={200}
              label="Email"
              fullWidth
              InputProps={{
                endAdornment: formikBag.isValidating ? (
                  <CircularProgress size={18} />
                ) : (
                  undefined
                )
              }}
            />
          </div>
          <div className={classes.fieldGroup}>
            <Input
              formikBag={formikBag}
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              debounce={200}
            />
          </div>
          <div className={classes.fieldGroup}>
            <Button variant="contained" color="primary" type="submit">
              Enter
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

//
// Helpers
//
async function validate(values) {
  const errors = {};

  const emailError = await validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (Object.keys(errors).length) {
    throw errors;
  }
}

async function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  if (!isEmail(value)) {
    return "Email has invalid format";
  }

  if (!(await emailExists(value))) {
    return "No user with that email";
  }
}

function emailExists(value) {
  console.log("Checking email exists");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("time");
      if (value === "user@example.com") {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
}

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }
}

//
// Styles
//
export default withStyles(({ spacing }) => ({
  fieldGroup: {
    marginBottom: spacing.unit * 3,
    "&:last-child": {
      marginBottom: 0
    }
  },
  form: {
    // Prevents weird horizontal scrolling glitch when
    // Spinner appears on TextField
    overflowX: "hidden",
    width: "100%"
  }
}))(Naive);
