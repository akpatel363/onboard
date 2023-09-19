import { memo } from "react";
import { Menu, MenuItem } from "@material-ui/core";

const blockTypes = [
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Paragraph", value: "p" },
  { label: "Code", value: "code" },
  { label: "Note", value: "note" },
  { label: "Quote", value: "quote" },
  { label: "Equations", value: "equation" },
  { label: "Divider", value: "divider" },
  { label: "List", value: "li" },
  { label: "Checklist", value: "checklist" },
];

const TypeSelectMenu = ({ anchor, open, onChange }) => {
  const handleChange = (type) => onChange(type);

  return (
    <Menu
      open={open}
      anchorEl={anchor}
      onClose={() => onChange()}
      PaperProps={{ style: { maxHeight: 250 } }}
    >
      {blockTypes.map((type) => (
        <MenuItem
          key={type.value}
          value={type.value}
          onClick={handleChange.bind(this, type.value)}
        >
          {type.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default memo(TypeSelectMenu);
