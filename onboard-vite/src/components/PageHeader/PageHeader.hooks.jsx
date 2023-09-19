import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import gqlRequest from "../../utils/gqlRequest";

const UPDATE_TITLE = gql`
  mutation UpdateTitle($_id: ID!, $title: String!) {
    info: updateTitle(_id: $_id, title: $title)
  }
`;

export const useUpdateTitle = () => {
  const { id } = useParams();
  return useMutation((title) => gqlRequest(UPDATE_TITLE, { title, _id: id }));
};
