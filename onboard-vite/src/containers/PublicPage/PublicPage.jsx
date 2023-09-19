import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import EditablePage from "../EditablePage/EditablePage";
import ErrorPage from "../../components/ErrorPage";
import { usePublicDocument } from "./PublicPage.hooks";
import { memo } from "react";
import LoaderFAB from "../../components/LoaderFAB";
import { CloudDownload } from "@material-ui/icons";

const DocumentPage = () => {
  const { uid } = useParams();
  const { isFetching, data, error, isError } = usePublicDocument(uid);
  if (isFetching)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={30} />
      </div>
    );

  if (isError) {
    return <ErrorPage message={error?.response?.errors?.[0]?.message} />;
  }

  return (
    <>
      <EditablePage pageInfo={data?.info} />
      <LoaderFAB
        color="primary"
        variant="extended"
        onClick={() => window?.print()}
      >
        <CloudDownload style={{ marginRight: 8 }} /> Download
      </LoaderFAB>
    </>
  );
};

export default memo(DocumentPage);
