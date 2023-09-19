import { makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Block from "../../components/Block";
import PageHeader from "../../components/PageHeader";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 750,
    display: "flex",
    marginTop: 64,
    overflowY: "auto",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    margin: theme.spacing(0, "auto"),
    "&::-webkit-scrollbar": { width: 0 },
  },
  contentRoot: {
    "& h1": { margin: theme.spacing(2, 0), fontSize: "3rem" },
    "& h2": { fontSize: "2rem" },
    "& h3": { fontSize: "1.75rem" },
    "& h4": { fontSize: "1.5rem" },
    "& h2, h3, h4 ": { margin: theme.spacing(1.5, 0) },
    "& p": { margin: theme.spacing(0, 0, 1) },
    '& [contenteditable="true"]:focus ': {
      outline: "none",
      backgroundColor: theme.palette.grey[100],
    },
  },
  blankArea: {
    cursor: "text",
    minHeight: "300px",
  },
  title: {
    fontFamily: "'Satisfy', cursive",
    color: theme.palette.primary.main,
  },
}));

const eq = (left, right) => {
  if (!left || !right) return false;
  if (left.length !== right.length) return false;
  return left.every((x, index) => x === right[index]);
};

const EditablePage = ({ pageInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ordering = useSelector((s) => s?.page?.ordering || [], eq);
  const isLoggedIn = useSelector((s) => !!s.common.token);
  const { id: docId } = useParams();

  useEffect(() => {
    const blocks = pageInfo?.blocks?.reduce(
      (acc, { _id, ...rest }) => ({ ...acc, [_id]: rest }),
      {}
    );
    const ordering = pageInfo?.blocks.map((x) => x?._id);
    dispatch({
      type: actions.SET_BLOCKS,
      payload: { ordering, blocks, docId },
    });
    return () => {
      if (pageInfo?.permission?.write) dispatch(actions.saveDoc());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const blocksToRender = ordering?.map((_id, index) => (
    <Block
      _id={_id}
      key={_id}
      index={index}
      docId={docId}
      disable={!pageInfo?.permission?.write}
    />
  ));

  const { blocks: _, ...info } = pageInfo;

  return (
    <div className={classes.root}>
      {!isLoggedIn && (
        <Typography>
          Powered By <span className={classes.title}>OnBoard</span>
        </Typography>
      )}
      <div>
        <PageHeader
          disable={!pageInfo?.permission?.write}
          title={info?.title}
        />
        <div className={classes.contentRoot}>{blocksToRender}</div>
      </div>
      <div
        className={classes.blankArea}
        onClick={() => dispatch(actions.add(null, "p"))}
      ></div>
    </div>
  );
};

export default EditablePage;
