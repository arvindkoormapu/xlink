import * as types from "../../constants/ApiConstant";

const initialState = {
  addons: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_ADDONS_SUCCESS: {
      return {
        ...state,
        addons: actions.addons
      };
    }
    case types.POST_ADDONS_SUCCESS: {
      return {
        ...state,
        addons: actions.addons
      };
    }
    default:
      return state;
  }
}