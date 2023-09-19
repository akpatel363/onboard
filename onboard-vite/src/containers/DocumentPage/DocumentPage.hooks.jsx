import { useQuery } from "react-query";
import { gql } from "graphql-request";
import gqlReq from "../../utils/gqlRequest";

const DOCUMENT = gql`
  query DocumentInfo($_id: ID!) {
    info: getDocument(_id: $_id) {
      _id
      title
      blocks
      permission {
        read
        write
      }
    }
  }
`;

export const useDocument = (_id) =>
  useQuery(["document", _id], () => gqlReq(DOCUMENT, { _id }));
