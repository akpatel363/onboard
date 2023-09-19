import * as gqlReq from "graphql-request";

const url = import.meta.env.URL || "http://localhost:3001/gql";

const gqlRequest = (doc, variables) => {
  const token = localStorage.getItem("token");
  return gqlReq.request(url, doc, variables, { Authorization: token });
};

export default gqlRequest;
