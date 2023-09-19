import { gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import gqlReq from "../../utils/gqlRequest";

const USER_SUGGESTIONS = gql`
  query UserSuggestions($input: String!) {
    users: suggestUsers(input: $input) {
      _id
      username
    }
  }
`;

export const useUserSuggestions = (input) =>
  useQuery(["suggestUser", input], () => gqlReq(USER_SUGGESTIONS, { input }), {
    enabled: !!input,
    staleTime: 3 * 60 * 1000,
    select: (data) => data?.users || [],
  });

const SHARE_DOCUMENT = gql`
  mutation ShareDocument(
    $docId: ID!
    $userIds: [ID!]!
    $read: Boolean!
    $write: Boolean!
  ) {
    shared: shareDoc(
      docId: $docId
      userIds: $userIds
      read: $read
      write: $write
    )
  }
`;

export const useShareDocument = () => {
  const queryClient = useQueryClient();
  return useMutation((payload) => gqlReq(SHARE_DOCUMENT, { ...payload }), {
    onSuccess: () => queryClient.invalidateQueries(["permittedUsers"]),
  });
};
