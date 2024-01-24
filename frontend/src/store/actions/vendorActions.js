import * as types from "../../constants/ApiConstant";
import VendorService from 'services/VendorService';

export const getVendorsAction = (token) => async (dispatch) => {
	return VendorService.getVendors(token)
		.then((response) => {
			dispatch({
				type: types.GET_VENDORS_SUCCESS,
				vendors: response.data,
			});
		})
		.catch((error) => {
			dispatch({ type: types.GET_VENDORS_FAILURE });
			throw error;
		});
};

export const createVendorAction = (data, token) => async (dispatch, getState) => {
	const { vendorReducer } = getState()
	return VendorService.createVendor(data, token)
		.then((response) => {
			if (response.success) {
				const vendors = [...vendorReducer.vendors, response.data]
				dispatch({
					type: types.POST_VENDOR_SUCCESS,
					vendors
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_VENDOR_FAILURE });
			throw error;
		});
};

export const updateVendorAction = (id, data) => async (dispatch) => {
	return VendorService.updateVendor(id, data)
		.then((response) => {
			if (response.success) {
				dispatch(getVendorsAction())
			}
		})
		.catch((error) => {
			dispatch({ type: types.POST_VENDOR_FAILURE });
			throw error;
		});
};

export const deleteVendorAction = (id) => async (dispatch, getState) => {
	const { vendorReducer } = getState()
	return VendorService.deleteVendor(id)
		.then((response) => {
			if (response.success) {
				const vendors = [...vendorReducer.vendors]
				const index = vendors.findIndex(item => item.vendorid === id)
				vendors.splice(index, 1)
				dispatch({
					type: types.DELETE_VENDOR_SUCCESS,
					vendors
				});
			}
		})
		.catch((error) => {
			dispatch({ type: types.DELETE_VENDOR_FAILURE });
			throw error;
		});
};