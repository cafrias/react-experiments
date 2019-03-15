import React from "react";

import { Field as FormikField, ErrorMessage } from "formik";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function Input({
  field,
  formik,
  TextFieldProps,
  ...fieldProps
}) {
  const { name } = fieldProps;
  const Field = field || FormikField;

  return (
    <>
      <Field
        {...fieldProps}
        render={({ field, form }) => {
          const touched = form.touched[name];
          const error = !!form.errors[name];

          return (
            <TextField
              {...field}
              {...TextFieldProps}
              error={touched && error}
            />
          );
        }}
      />
      <ErrorMessage
        component={Typography}
        variant="body2"
        color="error"
        name={name}
      />
    </>
  );
}
