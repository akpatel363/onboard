import { Fab, withStyles } from "@material-ui/core";

const CustomFab = withStyles((theme) => ({
  root: {
    right: 0,
    bottom: 0,
    margin: 20,
    position: "absolute",
    zIndex: theme.zIndex.appBar,
    "@media print": {
      display: "none",
    },
  },
}))(Fab);

const LoaderButton = ({ disabled, children, size = "large", ...rest }) => (
  <CustomFab {...rest} size={size} disabled={disabled}>
    {children}
  </CustomFab>
);

export default LoaderButton;
