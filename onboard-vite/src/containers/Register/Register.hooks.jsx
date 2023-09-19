import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUser } from "../../store/actions";
import gqlRequest from "../../utils/gqlRequest";

const REGISTER = gql`
  mutation Register($payload: RegisterInput!) {
    info: register(payload: $payload) {
      token
      username
      email
      name
    }
  }
`;

const useRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return useMutation((payload) => gqlRequest(REGISTER, { payload }), {
    onSuccess: (data) => {
      const { token, ...rest } = data?.info || {};
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(rest));
      dispatch(setUser(token, rest));
      history.replace("/dashboard");
    },
  });
};

export default useRegister;
