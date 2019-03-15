/**
 * This approach debounces the async validation function.
 *
 * Gotchas:
 *
 * - Async validation function gets called every time field validation gets called but at least it's debounced
 */
import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import { Form, withFormik } from "formik";

import isEmail from "validator/lib/isEmail";
import Input from "./Input";
import useDebouncedValidator from "../hooks/useDebouncedValidator";

function Hooks({ classes, ...formikBag }) {
  const [userExists, userExistsValidation] = useDebouncedValidator(emailExists);

  return (
    <Form className={classes.form}>
      <div className={classes.fieldGroup}>
        <Typography variant="caption">Try with: `user@example.com`</Typography>
        <Input
          id="email"
          name="email"
          validate={async value => {
            if (!value) {
              return "Email is required";
            }

            if (!isEmail(value)) {
              return "Email has invalid format";
            }

            if (!(await userExistsValidation(value))) {
              return "User not found";
            }
          }}
          TextFieldProps={{
            fullWidth: true,
            type: "email",
            InputProps: {
              endAdornment: userExists.loading ? (
                <CircularProgress size={18} />
              ) : (
                undefined
              )
            },
            label: "Email"
          }}
        />
      </div>
      <div className={classes.fieldGroup}>
        <Input
          id="password"
          name="password"
          TextFieldProps={{
            type: "password",
            fullWidth: true,
            label: "Password"
          }}
        />
      </div>
      <div className={classes.fieldGroup}>
        <Button variant="contained" color="primary" type="submit">
          Enter
        </Button>
      </div>
    </Form>
  );
}

//
// Helpers
//
async function validate(values) {
  const errors = {};

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (Object.keys(errors).length) {
    throw errors;
  }
}

function emailExists(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
const HooksStyled = withStyles(({ spacing }) => ({
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
}))(Hooks);

export default withFormik({
  mapPropsToValues: p => ({
    email: "",
    password: ""
  }),
  displayName: "LoginForm",
  async handleSubmit(values) {
    console.log("Submitting values:", values);
  },
  validate
})(HooksStyled);
