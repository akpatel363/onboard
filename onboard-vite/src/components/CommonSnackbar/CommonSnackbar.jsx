import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_SNACKBAR } from "../../store/actions";

const CommonSnackbar = () => {
  const snackbar = useSelector((state) => state.common.snackbar);
  const dispatch = useDispatch();

  const close = () => dispatch({ type: CLEAR_SNACKBAR });

  return (
    <Snackbar onClose={close} open={snackbar?.open} autoHideDuration={3000}>
      <Alert
        elevation={6}
        onClose={close}
        variant="filled"
        severity={snackbar?.type}
      >
        {snackbar?.message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
