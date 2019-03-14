import React from "react";

import { Field as FormikField, ErrorMessage } from "formik";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FieldDebounced from "./Field/Debounced";

export default function Input({ formikBag, debounce, ...inputProps }) {
  const Field = debounce ? FieldDebounced : FormikField;

  return (
    <>
      <Field
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
