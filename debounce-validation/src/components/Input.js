import React from "react";

import { ErrorMessage } from "formik";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DebouncedField from "./DebouncedField";

export function Debounced({ formikBag, debounce, ...inputProps }) {
  return (
    <>
      <DebouncedField
        {...inputProps}
        debounce={debounce}
        error={
          formikBag.touched[inputProps.name] &&
          !!formikBag.errors[inputProps.name]
        }
        component={TextField}
      />
      <ErrorMessage
        component={Typography}
        variant="body2"
        color="error"
        name={inputProps.name}
      />
    </>
  );
}

const Input = {
  Debounced
};

export default Input;
