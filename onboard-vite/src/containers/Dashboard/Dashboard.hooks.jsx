import { gql } from "graphql-request";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { pushToSnackBar } from "../../store/actions/common";
import gqlReq from "../../utils/gqlRequest";

const DOCUMENTS = gql`
  query Documents($payload: Int!) {
    info: getDocuments(page: $payload) {
      nextPage
      canFetchMore
      documents {
        _id
        title
        blocks
        createdAt
        updatedAt
        meta
        permission {
          owner
          meta
        }
      }
    }
  }
`;

export const useDocuments = () =>
  useInfiniteQuery(
    ["documentDetails"],
    ({ pageParam = 1 }) => gqlReq(DOCUMENTS, { payload: pageParam }),
    {
      getNextPageParam: (data) =>
        data?.info?.canFetchMore ? data?.info?.nextPage : undefined,
      refetchInterval: 5 * 60 * 1000,
    }
  );

const CREATE_DOCUMENT = gql`
  mutation CreateDocument {
    createDocument {
      _id
      title
    }
  }
`;

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation(() => gqlReq(CREATE_DOCUMENT), {
    onSuccess: () => {
      queryClient.invalidateQueries(["documentDetails"]);
    },
  });
};

const DELETE_DOCUMENT = gql`
  mutation CreateDocument($_id: ID!) {
    deleteDoc(_id: $_id)
  }
`;

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation((_id) => gqlReq(DELETE_DOCUMENT, { _id }), {
    onSuccess: () => {
      dispatch(pushToSnackBar("Document deleted.", "success"));
      queryClient.invalidateQueries(["documentDetails"]);
    },
  });
};
