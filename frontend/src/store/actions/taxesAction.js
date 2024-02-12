import * as types from "../../constants/ApiConstant";
import TaxesService from 'services/TaxesService';

export const getTaxesAction = (token) => async (dispatch) => {
	return TaxesService.getTaxes(token)
		.then((response) => {
			dispatch({
				type: types.GET_TAXES_SUCCESS,
				taxes: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_TAXES_FAILURE });
			throw error;
		});
};

export const createTaxesAction = (data, token) => async (dispatch, getState) => {
	const { taxesReducer } = getState()
	return TaxesService.createTaxes(data, token)
		.then((response) => {
			if (response.success) {
				const taxes = [...taxesReducer.taxes, response.data]
				dispatch({
					type: types.POST_TAXES_SUCCESS,
					taxes
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_TAXES_FAILURE });
			throw error;
		});
};

export const updateTaxesAction = (id, data, token) => async (dispatch) => {
	return TaxesService.updateTaxes(id, data)
		.then((response) => {
			if (response.success) {
				dispatch(getTaxesAction(token))
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_TAXES_FAILURE });
			throw error;
		});
};