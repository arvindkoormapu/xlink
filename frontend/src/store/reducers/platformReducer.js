import * as types from "../../constants/ApiConstant";

const initialState = {
  platforms: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_PLATFORMS_SUCCESS: {
      return {
        ...state,
        platforms: actions.platforms
      };
    }
    case types.POST_PLATFORM_SUCCESS: {
      return {
        ...state,
        platforms: actions.platforms
      };
    }
    case types.DELETE_PLATFORM_SUCCESS: {
      return {
        ...state,
        platforms: actions.platforms
      };
    }
    default:
      return state;
  }
}