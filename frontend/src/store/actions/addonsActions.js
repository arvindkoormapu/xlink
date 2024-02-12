import * as types from "../../constants/ApiConstant";
import AddonsService from 'services/AddonsService';

export const getAddonsAction = (token) => async (dispatch) => {
	return AddonsService.getAddons(token)
		.then((response) => {
			dispatch({
				type: types.GET_ADDONS_SUCCESS,
				addons: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_ADDONS_FAILURE });
			throw error;
		});
};

export const createAddonsAction = (data, token) => async (dispatch, getState) => {
	const { addonsReducer } = getState()
	return AddonsService.createAddons(data, token)
		.then((response) => {
			if (response.success) {
				const addons = [...addonsReducer.addons, response.data]
				dispatch({
					type: types.POST_ADDONS_SUCCESS,
					addons
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_ADDONS_FAILURE });
			throw error;
		});
};

export const updateAddonsAction = (id, data, token) => async (dispatch) => {
	return AddonsService.updateAddons(id, data)
		.then((response) => {
			if (response.success) {
				dispatch(getAddonsAction(token))
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_ADDONS_FAILURE });
			throw error;
		});
};