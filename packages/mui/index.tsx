import { TextField, TextFieldProps } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";

import { FormControl, useFormStateVersion } from "@react-typed-form/core";

export type FTextFieldProps = {
  state: FormControl<string | undefined>;
} & TextFieldProps;

export function FTextField({
  state,
  ...others
}: FTextFieldProps): ReactElement {
  useFormStateVersion(state);
  const showError =
    state.showValidation && !state.valid && Boolean(state.error);
  return (
    <TextField
      {...others}
      value={state.value || ""}
      error={showError}
      disabled={state.disabled}
      helperText={showError ? state.error : others.helperText}
      onBlur={() => state.setShowValidation(true)}
      onChange={(e) => state.setValue(e.currentTarget.value)}
    />
  );
}

export type FNumberFieldProps = {
  state: FormControl<number | null | undefined>;
  invalidError?: string | undefined;
  blankError?: string | undefined;
} & TextFieldProps;

export function FNumberField({
  state,
  invalidError,
  blankError,
  ...others
}: FNumberFieldProps): ReactElement {
  useFormStateVersion(state);
  const showError =
    state.showValidation && !state.valid && Boolean(state.error);
  const [text, setText] = useState(state.value?.toString() ?? "");
  useEffect(() => {
    setText(state.value?.toString() ?? "");
  }, [state.value]);
  return (
    <TextField
      {...others}
      value={text}
      error={showError}
      disabled={state.disabled}
      helperText={showError ? state.error : others.helperText}
      onBlur={() => state.setShowValidation(true)}
      onChange={(e) => {
        const textVal = e.currentTarget.value;
        setText(textVal);
        if (!textVal) {
          if (blankError) {
            state.setError(blankError);
          } else {
            state.setValue(null);
          }
        } else {
          const value = parseInt(textVal, 10);
          if (!isNaN(value)) {
            state.setValue(value);
          } else {
            state.setError(invalidError);
          }
        }
      }}
    />
  );
}
