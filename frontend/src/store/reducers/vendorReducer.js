import * as types from "../../constants/ApiConstant";

const initialState = {
  vendors: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_VENDORS_SUCCESS: {
      return {
        ...state,
        vendors: actions.vendors
      };
    }
    case types.POST_VENDOR_SUCCESS: {
      return {
        ...state,
        vendors: actions.vendors
      };
    }
    case types.DELETE_VENDOR_SUCCESS: {
      return {
        ...state,
        vendors: actions.vendors
      };
    }
    default:
      return state;
  }
}