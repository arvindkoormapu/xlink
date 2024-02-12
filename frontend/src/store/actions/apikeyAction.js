import * as types from "../../constants/ApiConstant";
import ApikeyService from 'services/ApikeyService';

export const getApikeysAction = (token) => async (dispatch) => {
	return ApikeyService.getApikeys(token)
		.then((response) => {
			dispatch({
				type: types.GET_APIKEY_SUCCESS,
				apikeys: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_APIKEY_FAILURE });
			throw error;
		});
};

export const createApikeyAction = (data, token) => async (dispatch, getState) => {
	const { apikeysReducer } = getState()
	return ApikeyService.createApikey(data, token)
		.then((response) => {
			if (response.success) {
				const apikeys = [...apikeysReducer.apikeys, response.data]
				dispatch({
					type: types.POST_APIKEY_SUCCESS,
					apikeys
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_APIKEY_FAILURE });
			throw error;
		});
};

export const updateApikeyActiveStateAction = (id, activeState, token) => async (dispatch) => {
	return ApikeyService.updateApikeyActiveState(id, activeState)
		.then((response) => {
			if (response.success) {
				dispatch(getApikeysAction(token))
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_APIKEY_FAILURE });
			throw error;
		});
};

export const updateApikeySeenStateAction = (id, token) => async (dispatch) => {
	return ApikeyService.updateApikeySeenState(id)
		.then((response) => {
			if (response.success) {
				dispatch(getApikeysAction(token))
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_APIKEY_FAILURE });
			throw error;
		});
};

