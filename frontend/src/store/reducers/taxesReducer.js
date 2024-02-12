import * as types from "../../constants/ApiConstant";

const initialState = {
  taxes: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_TAXES_SUCCESS: {
      return {
        ...state,
        taxes: actions.taxes
      };
    }
    case types.POST_TAXES_SUCCESS: {
      return {
        ...state,
        taxes: actions.taxes
      };
    }
    default:
      return state;
  }
}