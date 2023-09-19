import { Button, CircularProgress } from "@material-ui/core";

const LoaderButton = ({ disabled, children, size = "medium", ...rest }) => (
  <Button {...rest} disabled={disabled} size={size}>
    {disabled ? (
      <CircularProgress size={size === "medium" ? 24 : 26} />
    ) : (
      children
    )}
  </Button>
);

export default LoaderButton;
