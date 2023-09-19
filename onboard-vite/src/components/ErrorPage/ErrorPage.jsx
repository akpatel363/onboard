import { Button, makeStyles, Typography } from "@material-ui/core";
import { Error, Replay } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  icon: {
    fontSize: "4rem",
    marginBottom: theme.spacing(1),
  },
  retryBtn: {
    marginTop: theme.spacing(2),
  },
}));

const ErrorPage = ({ refetch, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Error color="error" className={classes.icon} />
        <Typography>{message || "Something went wrong"}</Typography>
        {refetch && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => refetch()}
            startIcon={<Replay />}
            className={classes.retryBtn}
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
