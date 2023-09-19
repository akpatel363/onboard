import { gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { pushToSnackBar } from "../../store/actions";
import gqlReq from "../../utils/gqlRequest";

const PERMITTED_USERS = gql`
  query PermittedUsers($docId: ID!) {
    permissionEntities: getPermittedUsers(docId: $docId) {
      _id
      entityName
      permissions
    }
  }
`;

export const usePermittedUsers = (docId) =>
  useQuery(
    ["permittedUsers", docId],
    () => gqlReq(PERMITTED_USERS, { docId }),
    {
      enabled: !!docId,
      staleTime: 5 * 60 * 1000,
      select: (data) => data?.permissionEntities || [],
    }
  );

const REVOKE_PERMISSION = gql`
  mutation RevokePermission($permissionId: ID!) {
    revokePermission(permissionId: $permissionId)
  }
`;

export const useRevokePermission = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation(
    (permissionId) => gqlReq(REVOKE_PERMISSION, { permissionId }),
    {
      onError: (err) => {
        const message = err?.response?.errors?.[0]?.message;
        dispatch(pushToSnackBar(message || "Something went wrong!", "error"));
      },
      onSuccess: () => queryClient.invalidateQueries(["permittedUsers"]),
    }
  );
};
