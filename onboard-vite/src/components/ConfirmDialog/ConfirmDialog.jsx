import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { memo } from "react";

const ConfirmDialog = ({
  loading,
  onConfirm,
  onCancel,
  children,
  title,
  open,
}) => (
  <Dialog open={open} onClose={() => !loading && onCancel()}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button disabled={loading} onClick={() => !loading && onCancel()}>
        No
      </Button>
      <Button
        color="primary"
        disabled={loading}
        variant="contained"
        onClick={onConfirm}
      >
        {loading ? <CircularProgress size={22} /> : "Yes"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default memo(ConfirmDialog);
