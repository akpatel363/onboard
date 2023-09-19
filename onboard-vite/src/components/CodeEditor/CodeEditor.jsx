import { useState } from "react";
import AceEditor from "react-ace";
import { Chip, IconButton, makeStyles } from "@material-ui/core";
import Code from "@material-ui/icons/Code";
import ModeSelector from "./ModeSelector";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-language_tools";
import supportedLanguages from "../../utils/supportedLanguages";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#272822", margin: theme.spacing(2, 0) },
  configContainer: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiAutocomplete-root": {
      minWidth: 100,
    },
  },
}));

const CodeEditor = ({ innerRef, onBlur, remove, disable, ...info }) => {
  const classes = useStyles();
  const [value, setValue] = useState(info?.content || "");
  const [mode, setMode] = useState(
    info?.mode
      ? supportedLanguages.find((e) => e.value === info?.mode)
      : supportedLanguages[0]
  );
  const [selector, setSelector] = useState(false);

  const selectMode = (mode) => {
    setMode(mode);
    setSelector(false);
    onBlur({ content: value, mode });
  };

  return (
    <div className={classes.root}>
      <div className={classes.configContainer}>
        <ModeSelector selected={mode} open={selector} onSelect={selectMode} />
        <IconButton onClick={remove}>
          <Delete htmlColor="white" />
        </IconButton>
        <Chip
          clickable
          size="small"
          label={mode?.label}
          icon={<Code />}
          disabled={disable}
          onClick={() => setSelector(true)}
          style={{ margin: "8px 12px" }}
        />
      </div>
      <AceEditor
        mode={mode?.value}
        width="100%"
        minLines={5}
        fontSize={18}
        value={value}
        ref={innerRef}
        theme="monokai"
        showGutter={true}
        readOnly={!!disable}
        maxLines={Infinity}
        showPrintMargin={true}
        highlightActiveLine={true}
        onChange={(v) => setValue(v)}
        onBlur={() => onBlur({ type: "code", content: value, mode })}
        setOptions={{
          tabSize: 2,
          enableSnippets: true,
          showLineNumbers: true,
          enableLiveAutocompletion: true,
          enableBasicAutocompletion: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
