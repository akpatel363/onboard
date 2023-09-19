import { TextField } from "@material-ui/core";
import { FastField } from "formik";

const Input = ({ name, children, ...rest }) => (
  <FastField name={name}>
    {({ meta, field }) => (
      <TextField
        fullWidth
        color="primary"
        variant="outlined"
        error={meta?.touched && !!meta?.error}
        helperText={meta?.touched && meta?.error}
        {...rest}
        {...field}
      >
        {children}
      </TextField>
    )}
  </FastField>
);

export default Input;
