import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, List, Public, Share } from "@material-ui/icons";
import { memo } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";

const useStyles = makeStyles((theme) => ({
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  deleteBtn: {
    color: theme.palette.error.main,
    "&:first-of-type": { marginLeft: "auto" },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  action: { flexGrow: 3 },
}));

const Document = ({ doc, onAction }) => {
  const classes = useStyles();

  let message;

  if (doc?.updatedAt === doc?.createdAt) {
    message = `Created by @${doc?.meta?.createdBy?.username} on ${formatDate(
      doc?.createdAt
    )}`;
  } else {
    message = `Last updated by @${
      doc?.meta?.updatedBy?.username
    } on ${formatDate(doc?.updatedAt)}`;
  }

  const actionWrapper = (type) => {
    return (e) => onAction(e, type, doc);
  };

  return (
    <Grid item lg={4} md={6} sm={6} xs={12}>
      <Card elevation={2} className={classes.card}>
        <CardActionArea
          className={classes.action}
          component={Link}
          title={doc?.title}
          to={`/page/${doc?._id}`}
        >
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              {doc?.title}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {message}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {doc?.permission?.owner ? (
            <>
              <IconButton
                size="small"
                color="primary"
                onClick={actionWrapper("shareInfo")}
              >
                <List />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={actionWrapper("share")}
              >
                <Share />
              </IconButton>
              <IconButton
                size="small"
                className={classes.deleteBtn}
                onClick={actionWrapper("delete")}
              >
                <Delete />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={actionWrapper("shareGlobal")}
              >
                <Public />
              </IconButton>
            </>
          ) : (
            doc?.permission?.meta?.sharedBy && (
              <Typography color="textSecondary" variant="body2">
                Shared by @{doc.permission.meta.sharedBy?.username}
              </Typography>
            )
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(Document);
