import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { memo } from "react";
import { usePermittedUsers, useRevokePermission } from "./ShareInfo.hooks";
import ShareListItem from "./ShareListItem";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
}));

const ShareInfo = ({ doc, onClose, disabled, onDelete }) => {
  const classes = useStyles();
  const {
    data: permittedUsers,
    isLoading,
    isError,
  } = usePermittedUsers(doc?._id);
  const { mutate: revoke, isLoading: revoking } = useRevokePermission();

  if (isLoading)
    return (
      <Dialog fullWidth open={!!doc} maxWidth="sm">
        <div className={classes.center}>
          <CircularProgress size={25} />
        </div>
      </Dialog>
    );

  const close = () => !revoking && onClose();

  return (
    <Dialog fullWidth open={!!doc} maxWidth="sm" onClose={close}>
      <DialogTitle>Sharing Info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Below is the list of users who can access "{doc?.title}".
        </DialogContentText>
        {isError && (
          <div className={classes.center}>
            <Typography color="textSecondary">Something went wrong!</Typography>
          </div>
        )}
        <List dense disablePadding>
          {permittedUsers?.map((each) => (
            <ShareListItem
              item={each}
              key={each._id}
              onRevoke={revoke}
              disabled={revoking}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ShareInfo);
