import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import useBlock from "../../hooks/useBlock";
import {
  add,
  remove,
  setActive,
  changeType,
  loseFocus,
  onBlur,
} from "../../store/actions";

import EditableBlock from "../EditableBlock";
import TypeSelectMenu from "../TypeSelectMenu";
import CodeEditor from "../CodeEditor";
import Note from "../Note";
import Quote from "../Quote";
import Equation from "../Equation";
import ListItem from "../ListItem";
import CheckListItem from "../CheckListItem";

const equality = (newVal, oldVal) => {
  if (!newVal || !oldVal) return false;
  if (Object.keys(newVal).length !== Object.keys(oldVal).length) return false;
  return Object.keys(newVal).every((key) => newVal[key] === oldVal[key]);
};

function atEnd(element) {
  var range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

const BlockWrapper = ({ _id, ...rest }) => {
  const { block, active } = useBlock(_id);
  return <Block info={block} active={active} _id={_id} {...rest} />;
};

const Block = memo(({ _id, info, active, disable }) => {
  const dispatch = useDispatch();
  const ref = useRef(0);
  const [menu, setMenu] = useState({ open: false, add: false });

  const addBlock = (tag = "p") => dispatch(add(_id, tag));

  const removeBlock = () => dispatch(remove(_id));

  const setActiveBlock = (move) => dispatch(setActive(_id, move));

  const onTypeChange = (newTagName) => {
    if (newTagName) {
      if (menu.add) dispatch(add(_id, newTagName));
      else dispatch(changeType(_id, newTagName));
    }
    setMenu({ open: false, add: false });
  };

  const openTypeMenu = (add) => {
    dispatch(loseFocus());
    setMenu({ open: true, add });
  };

  const onBlurFunc = (block) => {
    if (!equality(info, block)) dispatch(onBlur({ _id, ...info, ...block }));
  };

  useEffect(() => {
    if (active && ref?.current) {
      if (ref?.current?.focus) {
        ref?.current?.focus();
        atEnd(ref?.current);
      } else if (ref?.current?.editor) ref?.current?.editor?.focus();
    }
  }, [active, dispatch]);

  let elementToRender;

  switch (info.type) {
    case "code":
      elementToRender = (
        <CodeEditor
          {...info}
          innerRef={ref}
          onBlur={onBlurFunc}
          disable={disable}
          remove={removeBlock}
        />
      );
      break;
    case "divider":
      elementToRender = <Divider style={{ margin: "8px 0" }} />;
      break;
    case "note":
      elementToRender = (
        <Note
          {...info}
          add={addBlock}
          innerRef={ref}
          disable={disable}
          onBlur={onBlurFunc}
          remove={removeBlock}
          onChangeType={openTypeMenu}
          setActiveBlock={setActiveBlock}
        />
      );
      break;
    case "quote":
      elementToRender = (
        <Quote
          {...info}
          add={addBlock}
          innerRef={ref}
          disable={disable}
          onBlur={onBlurFunc}
          remove={removeBlock}
          onChangeType={openTypeMenu}
          setActiveBlock={setActiveBlock}
        />
      );
      break;
    case "equation":
      elementToRender = (
        <Equation
          {...info}
          active={active}
          disable={disable}
          onBlur={onBlurFunc}
        />
      );
      break;
    case "li":
      elementToRender = (
        <ListItem
          {...info}
          innerRef={ref}
          disable={disable}
          onBlur={onBlurFunc}
          remove={removeBlock}
          onChangeType={openTypeMenu}
          add={addBlock.bind(undefined, "li")}
          setActiveBlock={setActiveBlock}
          changeType={() => {
            dispatch(loseFocus());
            setTimeout(() => dispatch(changeType(_id, "p")), 10);
          }}
        />
      );
      break;
    case "checklist":
      elementToRender = (
        <CheckListItem
          {...info}
          innerRef={ref}
          disable={disable}
          onBlur={onBlurFunc}
          remove={removeBlock}
          onChangeType={openTypeMenu}
          add={addBlock.bind(undefined, "checklist")}
          setActiveBlock={setActiveBlock}
          changeType={() => {
            dispatch(loseFocus());
            setTimeout(() => dispatch(changeType(_id, "p")), 10);
          }}
        />
      );
      break;
    default:
      elementToRender = (
        <EditableBlock
          {...info}
          add={addBlock}
          innerRef={ref}
          disable={disable}
          onBlur={onBlurFunc}
          remove={removeBlock}
          onChangeType={openTypeMenu}
          setActiveBlock={setActiveBlock}
        />
      );
      break;
  }

  return (
    <>
      {!!ref.current && !disable && (
        <TypeSelectMenu
          open={menu.open}
          anchor={ref.current}
          onChange={onTypeChange}
        />
      )}
      {elementToRender}
    </>
  );
});

export default memo(BlockWrapper);
