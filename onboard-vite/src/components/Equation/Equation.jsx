import { makeStyles, Popover, TextField } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";

import { BlockMath } from "react-katex";

import "katex/dist/katex.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2, 0),
  },
  error: {
    background: "rgba(235, 86, 86, 0.2)",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  title: {
    background: theme.palette.grey[100],
    padding: theme.spacing(2),
  },
}));

const Equation = (props) => {
  const ref = useRef(0);
  const classes = useStyles();
  const [popover, setPopover] = useState(props.active && !props.disable);
  const [tex, setTex] = useState(props?.content || "");

  useEffect(() => {
    setPopover(props.active);
  }, [props.active]);

  return (
    <div
      ref={ref}
      onClick={() => setPopover(!props.disable && true)}
      className={classes.root}
    >
      {tex ? (
        <BlockMath
          errorColor={"#f44336"}
          renderError={() => (
            <p className={classes.error}>
              Error parsing KaTeX: Verify your syntax
            </p>
          )}
        >
          {String.raw`${tex}`}
        </BlockMath>
      ) : (
        <p className={classes.title}>Add TeX here</p>
      )}
      <Popover
        open={popover}
        anchorEl={ref}
        onClose={() => {
          props.onBlur({ content: tex });
          setPopover(false);
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <TextField
          multiline
          autoFocus
          value={tex}
          minRows={3}
          variant="outlined"
          onBlur={() => {
            props.onBlur({ content: tex });
            setPopover(false);
          }}
          onChange={(e) => setTex(e.target.value)}
        />
      </Popover>
    </div>
  );
};

export default Equation;
