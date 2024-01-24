import * as types from "../../constants/ApiConstant";
import PlatformService from 'services/PlatformService';

export const getPlatformsAction = () => async (dispatch) => {
	return PlatformService.getPlatforms()
		.then((response) => {
			dispatch({
				type: types.GET_PLATFORMS_SUCCESS,
				platforms: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_PLATFORMS_FAILURE });
			throw error;
		});
};

export const createPlatformAction = (data) => async (dispatch, getState) => {
	const { platformReducer } = getState()
	return PlatformService.createPlatform(data)
		.then((response) => {
			if (response.success) {
				const platforms = [...platformReducer.platforms, response.data]
				dispatch({
					type: types.POST_PLATFORM_SUCCESS,
					platforms
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_PLATFORM_FAILURE });
			throw error;
		});
};

export const updatePlatformAction = (id, data) => async (dispatch) => {
	return PlatformService.updatePlatform(id, data)
		.then((response) => {
			if (response.success) {
				dispatch(getPlatformsAction())
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_PLATFORM_FAILURE });
			throw error;
		});
};

export const deletePlatformAction = (id) => async (dispatch, getState) => {
	const { platformReducer } = getState()
	return PlatformService.deletePlatform(id)
		.then((response) => {
			if (response.success) {
				const platforms = [...platformReducer.platforms]
				const index = platforms.findIndex(item => item.platformid === id)
				platforms.splice(index, 1)
				dispatch({
					type: types.DELETE_PLATFORM_SUCCESS,
					platforms
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_PLATFORM_FAILURE });
			throw error;
		});
};