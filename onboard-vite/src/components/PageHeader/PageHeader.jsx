import { InputBase } from "@material-ui/core";
import { useState } from "react";
import { useUpdateTitle } from "./PageHeader.hooks";

const PageHeader = ({ disable, title }) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const { mutate } = useUpdateTitle();
  return (
    <InputBase
      multiline
      fullWidth
      disabled={disable}
      value={editableTitle}
      onBlur={() => mutate(editableTitle)}
      style={{ fontSize: "3.25rem", color: "black" }}
      onChange={(e) => setEditableTitle(e.target.value)}
    />
  );
};

export default PageHeader;
