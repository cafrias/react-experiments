import React from "react";

import _debounce from "lodash/debounce";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import { Form, withFormik } from "formik";

import isEmail from "validator/lib/isEmail";
import Input from "./Input";

const asyncValidations = {};

function Hooks({ classes, ...formikBag }) {
  const [userExists, setUserExists] = React.useState({
    loading: false,
    valid: false
  });

  const userExistsValidation = React.useRef(
    _debounce(async email => {
      if (formikBag.touched["email"] && !formikBag.errors["email"]) {
        setUserExists({ ...userExists, loading: true });

        const exists = await emailExists(email);
        setUserExists({ valid: exists, loading: false });

        if (!exists) {
          console.log("Setting field error");
          formikBag.setFieldError("email", "User doesn't exist");
        }
      }
    }, 50)
  ).current;

  // React.useEffect(() => {
  //   asyncValidations.userExists = _debounce(async email => {
  //     console.log(formikBag.touched);
  //     if (formikBag.touched["email"] && !formikBag.errors["email"]) {
  //       setUserExists({ ...userExists, loading: true });

  //       const exists = await emailExists(email);
  //       setUserExists({ valid: exists, loading: false });

  //       if (!exists) {
  //         console.log("Setting field error");
  //         formikBag.setFieldError("email", "User doesn't exist");
  //       }
  //     }
  //   }, 50);
  //   return () => {
  //     delete asyncValidations.userExists;
  //   };
  // }, []);

  return (
    <Form className={classes.form}>
      <div className={classes.fieldGroup}>
        <Typography variant="caption">Try with: `user@example.com`</Typography>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          fullWidth
          InputProps={{
            endAdornment: userExists.loading ? (
              <CircularProgress size={18} />
            ) : (
              undefined
            )
          }}
          onBlur={e => {
            formikBag.setFieldTouched("email", true, true);
            userExistsValidation(e.target.value);
            // asyncValidations.userExists(e.target.value);
          }}
        />
      </div>
      <div className={classes.fieldGroup}>
        <Input
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
  );
}

//
// Helpers
//
async function validate(values) {
  const errors = {};

  const emailError = validateEmail(values.email);
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

function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  if (!isEmail(value)) {
    return "Email has invalid format";
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
  handleSubmit(values) {
    console.log("Submitting values:", values);
  },
  validate
})(HooksStyled);
