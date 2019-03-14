import React from "react";
import { connect, Field } from "formik";

import _debounce from "lodash/debounce";

function DebouncedField(props) {
  const { debounce, formik, ...fieldProps } = props;

  const debouncedValidation = React.useRef(
    _debounce(validate.bind(this, props.name, formik), debounce)
  ).current;

  return (
    <Field
      {...fieldProps}
      onChange={e => {
        formik.setFieldValue(props.name, e.currentTarget.value, false);
        debouncedValidation();
      }}
      onBlur={e => {
        // We run it explicitly, so that formik sets `isValidating`
        validate(props.name, formik);
      }}
    />
  );
}

function validate(name, formik) {
  formik.setFieldTouched(name, true, false);
  formik.validateForm();
}

export default connect(DebouncedField);
