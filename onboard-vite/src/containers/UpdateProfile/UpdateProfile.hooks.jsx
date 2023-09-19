import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import gqlReq from "../../utils/gqlRequest";
import { setUserProfile } from "../../store/actions/common";

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($payload: UpdateProfileInput!) {
    info: updateProfile(payload: $payload) {
      username
      name
      email
    }
  }
`;

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  return useMutation((payload) => gqlReq(UPDATE_PROFILE, { payload }), {
    onSuccess: (data) => {
      dispatch(setUserProfile(data?.info));
    },
  });
};
