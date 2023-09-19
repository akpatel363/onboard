import { useState, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
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
import { DateTimePicker } from "@material-ui/pickers";
import { pushToSnackBar } from "../../store/actions/common";
import ShareGlobalListItem from "./ShareGlobalListItem";
import {
  useCreateLink,
  useGlobalLinks,
  useDeleteLink,
} from "./ShareGlobal.hooks";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
}));

const ShareGlobal = ({ doc, onClose }) => {
  const docId = doc?._id;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState(null);
  const { isLoading, data: links } = useGlobalLinks(docId);
  const { isLoading: creating, mutate: createLink } = useCreateLink();
  const { isLoading: deleting, mutate: deleteLink } = useDeleteLink();

  const onCreate = () =>
    createLink({ docId, dueDate }, { onSettled: () => setDueDate(null) });

  const onDelete = useCallback((link) => deleteLink(link._id), [deleteLink]);
  const onCopy = useCallback(
    (link) => {
      if (!link?.uid) return;
      navigator?.clipboard
        ?.writeText?.(`${origin}/document/${link?.uid}`)
        .then(() => dispatch(pushToSnackBar("Link Copied!", "success")));
    },
    [dispatch]
  );

  if (isLoading)
    return (
      <Dialog fullWidth open={!!doc} maxWidth="sm">
        <div className={classes.center}>
          <CircularProgress size={25} />
        </div>
      </Dialog>
    );

  return (
    <Dialog
      fullWidth
      open={!!doc}
      maxWidth="sm"
      onClose={() => !creating && !deleting && onClose()}
    >
      <DialogTitle>Create Readable Link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create Publicly accessible links to share you documents with anyone.
        </DialogContentText>
        {links?.length ? (
          <List dense disablePadding>
            {links.map((each, index) => (
              <ShareGlobalListItem
                link={each}
                index={index}
                key={each?._id}
                disabled={deleting || creating}
                onCopy={onCopy.bind(null, each)}
                onDelete={onDelete.bind(null, each)}
              />
            ))}
          </List>
        ) : (
          <Typography align="center">No Active Links</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <DateTimePicker
          fullWidth
          disablePast
          size="small"
          value={dueDate}
          onChange={setDueDate}
          label="Expiry Date"
          inputVariant="filled"
        />
        <Button
          color="primary"
          onClick={onCreate}
          variant="contained"
          disabled={creating || deleting}
        >
          {creating ? <CircularProgress size={22} /> : "Create"}
        </Button>
        <Button disabled={creating || deleting} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ShareGlobal);
