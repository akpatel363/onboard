import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ShareListItem = ({ item, disabled, onRevoke }) => {
  const message = item?.permissions?.owner
    ? "Owner"
    : item?.permissions?.write
    ? "Read / Write"
    : "Read";
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{item?.entityName?.charAt(0)?.toUpperCase?.()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={`@${item?.entityName}`} secondary={message} />
      <ListItemSecondaryAction>
        {!item?.permissions?.owner && (
          <IconButton disabled={disabled} onClick={() => onRevoke(item?._id)}>
            <Close />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ShareListItem;
