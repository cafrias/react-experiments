import React from "react";

import { Field as FormikField, ErrorMessage } from "formik";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function Input({
  field,
  formik,
  label,
  fullWidth,
  InputProps,
  ...inputProps
}) {
  const Field = field || FormikField;

  return (
    <>
      <Field
        {...inputProps}
        render={({ field, form }) => {
          return (
            <TextField
              {...field}
              label={label}
              InputProps={InputProps}
              // onBlur={e => {
              //   if (!asyncValidation) {
              //     field.onBlur(e);
              //     return;
              //   }

              //   form.setFieldTouched(inputProps.name, true, true);

              //   if (!form.errors[inputProps.name]) {
              //     asyncValidation(e.target.value);
              //   }
              // }}
              fullWidth={fullWidth}
              error={
                form.touched[inputProps.name] && !!form.errors[inputProps.name]
              }
            />
          );
        }}
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
