import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Document from "../../components/Document";
import ErrorPage from "../../components/ErrorPage";
import LoaderFAB from "../../components/LoaderFAB";
import ConfirmDialog from "../../components/ConfirmDialog";
import ShareDialog from "../../components/ShareDialog";
import ShareInfo from "../../components/ShareInfo";
import ShareGlobal from "../../components/ShareGlobal";
import {
  useDocuments,
  useCreateDocument,
  useDeleteDocument,
} from "./Dashboard.hooks";
import { clone } from "../../utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64,
    overflowY: "auto",
    padding: theme.spacing(2, 1, 1),
    height: "calc(100vh - 88px)",
    "&::-webkit-scrollbar": { width: 0 },
  },
  height: {
    height: "100vh",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: 6,
    backgroundColor: theme.palette.grey[200],
  },
}));

const Dashboard = () => {
  const ref = useRef();

  const classes = useStyles();
  const {
    hasNextPage,
    fetchNextPage,
    isFetching,
    data,
    error,
    isLoading,
    refetch,
  } = useDocuments();
  const [action, setAction] = useState({ doc: null, type: null });
  const { isLoading: isCreating, mutate: createDoc } = useCreateDocument();
  const { isLoading: isDeleting, mutate: deleteDoc } = useDeleteDocument();

  const docList = useMemo(() => {
    return data?.pages?.map((p) => p?.info?.documents || [])?.flat();
  }, [data]);

  const onAction = useCallback(
    (e, type, selectedDoc) => setAction({ doc: clone(selectedDoc), type }),
    []
  );

  const closePopups = useCallback(
    () => setAction({ doc: null, type: null }),
    []
  );

  useEffect(() => {
    if (!ref.current || !hasNextPage || isFetching) return;
    const observer = new IntersectionObserver((elements) => {
      elements.forEach((el) => {
        if (el.isIntersecting) fetchNextPage();
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isFetching, hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className={cx(classes.height, classes.center)}>
        <CircularProgress size={30} />
      </div>
    );

  if (error)
    return (
      <ErrorPage refetch={refetch} message={"Error fetching documents!"} />
    );

  return (
    <>
      <div className={classes.root}>
        <LoaderFAB
          color="primary"
          variant="extended"
          disabled={isCreating}
          onClick={() => createDoc()}
        >
          <Add style={{ marginRight: 8 }} /> Add
        </LoaderFAB>
        <Grid container spacing={2}>
          {docList.map((doc) => (
            <Document doc={doc} key={doc?._id} onAction={onAction} />
          ))}
          <Grid
            item
            xs={12}
            ref={ref}
            className={cx(classes.center, classes.note)}
          >
            {(isFetching && <CircularProgress size={22} />) ||
              (!hasNextPage && (
                <Typography>
                  {docList?.length
                    ? "No more documents."
                    : "No documents to show."}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </div>
      {action.type === "delete" && (
        <ConfirmDialog
          open
          loading={isDeleting}
          title="Delete Document"
          onCancel={closePopups}
          onConfirm={() =>
            deleteDoc(action.doc?._id, { onSettled: closePopups })
          }
        >
          Are you sure you want to delete this document?
        </ConfirmDialog>
      )}
      {action.type === "share" && (
        <ShareDialog doc={action.doc} onClose={closePopups} />
      )}
      {action.type === "shareInfo" && (
        <ShareInfo doc={action.doc} onClose={closePopups} />
      )}
      {action.type === "shareGlobal" && (
        <ShareGlobal doc={action.doc} onClose={closePopups} />
      )}
    </>
  );
};

export default Dashboard;
