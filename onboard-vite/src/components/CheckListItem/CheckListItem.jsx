import cx from "classnames";
import { Checkbox, makeStyles } from "@material-ui/core";
import { useState } from "react";
import EditableBlock from "../EditableBlock";

const useStyles = makeStyles((theme) => ({
  li: {
    display: "flex",
    padding: theme.spacing(0, 1),
    margin: theme.spacing(2, 0, 1),
    "& + &": {
      margin: theme.spacing(-1, 0, 1),
    },
  },
  grow: {
    flexGrow: 1,
    "& p": { margin: 0 },
  },
  icon: { margin: theme.spacing(-1, 1, -1, -2) },
  checked: { textDecoration: "line-through" },
}));

const CheckListItem = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(props.checked || false);
  const toggleCheck = (e) => {
    setChecked(e.currentTarget.checked);
    props.onBlur({ checked: e.currentTarget.checked });
  };
  return (
    <div className={classes.li}>
      <div className={classes.icon}>
        <Checkbox
          checked={checked}
          onChange={toggleCheck}
          disabled={props.disable}
        />
      </div>
      <div className={cx(classes.grow, { [classes.checked]: checked })}>
        <EditableBlock {...props} remove={() => props.changeType()} type="p" />
      </div>
    </div>
  );
};

export default CheckListItem;
