import { makeStyles } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import EditableBlock from "../EditableBlock";

const useStyles = makeStyles((theme) => ({
  li: {
    display: "flex",
    margin: theme.spacing(2, 0, 1),
    "& + &": {
      margin: theme.spacing(-2, 0, 1),
    },
  },
  grow: {
    flexGrow: 1,
    "& p": { margin: 0 },
  },
  icon: {
    display: "flex",
    height: "1.5rem",
    alignItems: "center",
    marginRight: theme.spacing(1.5),
    "& .MuiSvgIcon-root": { fontSize: "0.6rem" },
  },
}));

const ListItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.li}>
      <div className={classes.icon}>
        <FiberManualRecord />
      </div>
      <div className={classes.grow}>
        <EditableBlock {...props} remove={() => props.changeType()} type="p" />
      </div>
    </div>
  );
};

export default ListItem;
