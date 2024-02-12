import * as types from "../../constants/ApiConstant";

const initialState = {
  apikeys: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_APIKEY_SUCCESS: {
      return {
        ...state,
        apikeys: actions.apikeys
      };
    }
    case types.POST_APIKEY_SUCCESS: {
      return {
        ...state,
        apikeys: actions.apikeys
      };
    }
    case types.DELETE_APIKEY_SUCCESS: {
      return {
        ...state,
        apikeys: actions.apikeys
      };
    }
    default:
      return state;
  }
}