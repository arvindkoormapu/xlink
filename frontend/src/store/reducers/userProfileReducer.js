import * as types from "../../constants/ApiConstant";

const initialState = {
  user_profiles: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_USER_PROFILES_SUCCESS: {
      return {
        ...state,
        user_profiles: actions.user_profiles
      };
    }
    case types.DELETE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user_profiles: actions.user_profiles
      };
    }
    default:
      return state;
  }
}