import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { memo, useCallback, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useUserSuggestions, useShareDocument } from "./ShareDialog.hooks";

const ShareDialog = ({ doc, onClose }) => {
  const { isLoading: sharing, mutate: shareDoc } = useShareDocument();
  const [input, setInput] = useState("");
  const deferredInput = useDebounce(input);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
  });
  const { data: suggestions = [] } = useUserSuggestions(deferredInput);

  const changePermission = useCallback((e) => {
    const { name, checked } = e.target;

    setPermissions((prev) => {
      const newPermission = { ...prev, [name]: checked };
      if (newPermission.write) return { read: true, write: true };
      return newPermission;
    });
  }, []);

  const onConfirm = () =>
    shareDoc(
      {
        userIds: selectedUsers?.map((each) => each?._id),
        docId: doc?._id,
        ...permissions,
      },
      { onSettled: onClose }
    );

  return (
    <Dialog
      fullWidth
      open={!!doc}
      maxWidth="sm"
      onClose={() => !sharing && onClose()}
    >
      <DialogTitle>Share "{doc?.title}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share your documents with other users on the platform.
        </DialogContentText>
        <Autocomplete
          multiple
          size="small"
          inputValue={input}
          value={selectedUsers}
          options={suggestions}
          style={{ marginBottom: 8 }}
          onInputChange={(_, v) => setInput(v)}
          getOptionLabel={(o) => `@${o?.username}`}
          onChange={(_, value) => setSelectedUsers(value)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select Users" />
          )}
        />
        <FormControlLabel
          name="read"
          label="Read"
          control={<Checkbox />}
          onChange={changePermission}
          checked={permissions.read}
          disabled={permissions.write}
        />
        <FormControlLabel
          name="write"
          label="Write"
          control={<Checkbox />}
          onChange={changePermission}
          checked={permissions.write}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={sharing} onClick={onClose}>
          No
        </Button>
        <Button
          color="primary"
          disabled={
            sharing ||
            !selectedUsers?.length ||
            !Object.values(permissions).reduce((x, y) => x || y, false)
          }
          variant="contained"
          onClick={onConfirm}
        >
          {sharing ? <CircularProgress size={22} /> : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ShareDialog);
