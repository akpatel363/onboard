import { memo } from "react";
import {
  Avatar,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Delete, Link as LinkIcon } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { formatDate } from "../../../utils/date";

const ShareGlobalListItem = ({ link, index, onDelete, onCopy, disabled }) => {
  const isExpired = link?.dueDate && new Date(link.dueDate) < new Date();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Link ${index + 1}`}
        secondary={
          !isExpired && link?.dueDate
            ? `Valid upto ${formatDate(link?.dueDate)} `
            : ""
        }
      />
      <ListItemSecondaryAction>
        {isExpired ? (
          <Chip
            label="Expired"
            color="error"
            size="small"
            style={{
              marginRight: 8,
              backgroundColor: red[500],
              color: "white",
            }}
          />
        ) : (
          <IconButton onClick={onCopy} disabled={disabled}>
            <LinkIcon />
          </IconButton>
        )}
        <IconButton onClick={onDelete} disabled={disabled}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(ShareGlobalListItem);
