import React from "react";

import _debounce from "lodash/debounce";

export default function useDebouncedValidator(validator) {
  const [status, updateStatus] = React.useState({
    loading: false,
    valid: false
  });

  const debounced = React.useRef(
    _debounce(async (value, done) => {
      updateStatus({ ...status, loading: true });
      const isValid = await validator(value);

      updateStatus({ valid: isValid, loading: false });

      done(isValid);
    }, 200)
  ).current;

  return [
    status,
    value =>
      new Promise(resolve => {
        debounced(value, result => {
          resolve(result);
        });
      })
  ];
}
