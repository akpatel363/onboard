import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import gqlReq from "../../utils/gqlRequest";
import { pushToSnackBar } from "../../store/actions/common";

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($payload: ChangePasswordInput!) {
    info: changePassword(payload: $payload)
  }
`;

export const useChangePassword = () => {
  const dispatch = useDispatch();
  return useMutation((payload) => gqlReq(CHANGE_PASSWORD, { payload }), {
    onSuccess: (data) => {
      data?.info &&
        dispatch(pushToSnackBar("Password changed successfully!", "success"));
    },
  });
};
