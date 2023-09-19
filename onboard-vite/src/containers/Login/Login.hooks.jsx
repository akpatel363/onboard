import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../../store/actions";
import gqlReq from "../../utils/gqlRequest";

const LOGIN = gql`
  mutation Login($payload: LoginInput!) {
    info: login(payload: $payload) {
      token
      username
      email
      name
    }
  }
`;

export const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return useMutation((payload) => gqlReq(LOGIN, { payload }), {
    onSuccess: (data) => {
      const { token, ...rest } = data?.info || {};
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(rest));
      dispatch(setUser(token, rest));
      history.replace("/dashboard");
    },
  });
};
