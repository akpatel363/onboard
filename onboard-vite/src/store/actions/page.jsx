import { gql } from "graphql-request";
import { pushToSnackBar } from "./common";
import gqlReq from "../../utils/gqlRequest";

export const ADD_BLOCK = "page/ADD_BLOCK";
export const SET_BLOCKS = "page/SET_BLOCKS";
export const REMOVE_BLOCK = "page/REMOVE_BLOCK";
export const SET_ACTIVE = "page/SET_ACTIVE";
export const CHANGE_TYPE = "page/CHANGE_TYPE";
export const SET_SAVED = "page/SET_SAVED";
export const LOSE_FOCUS = "page/LOSE_FOCUS";
export const ON_BLUR = "page/ON_BLUR";

export const remove = (_id) => ({
  type: REMOVE_BLOCK,
  payload: { _id },
});

export const add = (_id, type = "p") => ({
  type: ADD_BLOCK,
  payload: { _id, type },
});

export const setActive = (_id, move) => ({
  type: SET_ACTIVE,
  payload: { _id, move },
});

export const loseFocus = () => ({
  type: LOSE_FOCUS,
});

export const changeType = (_id, newType) => ({
  type: CHANGE_TYPE,
  payload: { _id, newType },
});

export const onBlur = (block) => ({
  type: ON_BLUR,
  payload: block,
});

const SAVE_DOC = gql`
  mutation SaveDoc($payload: SaveDocInput!) {
    info: saveDoc(payload: $payload)
  }
`;

export const saveDoc =
  (cb = undefined) =>
  async (dispatch, getState) => {
    try {
      const {
        ordering = [],
        blocks: rawBlocks,
        docId,
        isEdited,
      } = getState()?.page;
      if (!isEdited) return;
      const blocks = ordering.map((o) => {
        const { type, content, ...rest } = rawBlocks?.[o] || {};
        return { t: type, c: content, ...rest };
      });
      if (!blocks.length) return;

      const res = await gqlReq(SAVE_DOC, { payload: { docId, blocks } });
      cb && cb(res);
    } catch (err) {
      (cb && cb(null, err)) ||
        dispatch(
          pushToSnackBar(
            err?.response?.errors?.[0]?.message ||
              "Error while saving the document."
          )
        );
    }
  };
