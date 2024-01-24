import * as types from "../../constants/ApiConstant";
import UserProfileService from 'services/UserProfileService';

export const getUserProfilesAction = (token) => async (dispatch) => {
	return UserProfileService.getUserProfiles(token)
		.then((response) => {
            console.log(response)
			dispatch({
				type: types.GET_USER_PROFILES_SUCCESS,
				user_profiles: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_USER_PROFILES_FAILURE });
			throw error;
		});
};

export const updateUserProfilesAction = (id, data, token) => async (dispatch) => {
	return UserProfileService.updateUserProfile(id, data)
		.then((response) => {
			if (response.success) {
				dispatch(getUserProfilesAction(token))
			}
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_USER_PROFILE_FAILURE });
			throw error;
		});
};

export const deleteUserProfilesAction = (id, role) => async (dispatch, getState) => {
	const { userProfileReducer } = getState()
	return UserProfileService.deleteUserProfile(id, role)
		.then((response) => {
			if (response.success) {
				const user_profiles = [...userProfileReducer.user_profiles]
				const index = user_profiles.findIndex(item => item.userprofileid === id)
				user_profiles.splice(index, 1)
				dispatch({
					type: types.DELETE_USER_PROFILE_SUCCESS,
					user_profiles
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_USER_PROFILE_FAILURE });
			throw error;
		});
};