import { useQuery } from "react-query";
import { gql } from "graphql-request";
import gqlReq from "../../utils/gqlRequest";

const DOCUMENT = gql`
  query DocumentInfo($uid: ID!) {
    info: getDocumentFromLink(uid: $uid) {
      _id
      title
      blocks
    }
  }
`;

export const usePublicDocument = (uid) =>
  useQuery(["publicDocument", uid], () => gqlReq(DOCUMENT, { uid }));
