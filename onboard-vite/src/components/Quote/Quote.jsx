import { makeStyles } from "@material-ui/core";
import EditableBlock from "../EditableBlock";

const useStyles = makeStyles((theme) => ({
  quote: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 1, 1, 2),
    background: theme.palette.grey[100],
    borderLeft: `4px solid ${theme.palette.grey[800]}`,
    "& p": { margin: "0 !important", textDecoration: "italic" },
  },
}));

const Quote = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.quote}>
      <EditableBlock {...props} type="p" />
    </div>
  );
};

export default Quote;
