import axios from "axios";
const AddonsService = {}

AddonsService.getAddons = function (token) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/addons`, {
                headers: {
                    Authorization: token
                }
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    resolve(response.data);
                }
                reject(response.data);
            })
            .catch((error) => {
                console.log("error", error.response);
                reject(error);
            });
    });
}

AddonsService.createAddons = function (data, token) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/addons`, data, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    resolve(response.data);
                }
                reject(response.data);
            })
            .catch((error) => {
                console.log("errior", error.response);
                reject(error);
            });
    });
}

AddonsService.updateAddons = function (id, data) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/addons/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                reject(response.data);
            })
            .catch((error) => {
                console.log("errior", error.response);
                reject(error);
            });
    });
}

export default AddonsService;

