import { gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import gqlReq from "../../utils/gqlRequest";

const GLOBAL_LINKS = gql`
  query GlobalLinks($docId: ID!) {
    links: getGlobalLinks(docId: $docId) {
      _id
      uid
      dueDate
    }
  }
`;

export const useGlobalLinks = (docId) =>
  useQuery(["globalLinks", docId], () => gqlReq(GLOBAL_LINKS, { docId }), {
    enabled: !!docId,
    staleTime: 3 * 60 * 1000,
    select: (data) => data?.links || [],
  });

const CREATE_GLOBAL_LINK = gql`
  mutation CreateGlobalLink($docId: ID!, $dueDate: Date) {
    createGlobalLink(docId: $docId, dueDate: $dueDate)
  }
`;

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation((payload) => gqlReq(CREATE_GLOBAL_LINK, payload), {
    onSuccess: (_, { docId }) =>
      queryClient.invalidateQueries(["globalLinks", docId]),
  });
};

const DELETE_GLOBAL_LINK = gql`
  mutation DeleteGlobalLink($linkId: ID!) {
    deleteGlobalLink(linkId: $linkId)
  }
`;

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation((linkId) => gqlReq(DELETE_GLOBAL_LINK, { linkId }), {
    onSuccess: () => queryClient.invalidateQueries(["globalLinks"]),
  });
};
