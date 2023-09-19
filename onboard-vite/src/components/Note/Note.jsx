import { makeStyles } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import EditableBlock from "../EditableBlock";

const useStyles = makeStyles((theme) => ({
  note: {
    display: "flex",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    background: theme.palette.grey[200],
    "& > div": {
      flexGrow: 1,
      "& p": { margin: 0 },
    },
    "& > .MuiSvgIcon-root": {
      color: theme.palette.info.dark,
      marginRight: theme.spacing(2),
    },
  },
}));

const Note = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.note}>
      <Info />
      <div>
        <EditableBlock {...props} type="p" />
      </div>
    </div>
  );
};

export default Note;
