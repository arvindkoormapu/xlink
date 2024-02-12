import axios from "axios";
const ApikeyService = {}

ApikeyService.getApikeys = function (token) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/platform-api-keys`, {
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

ApikeyService.createApikey = function (data, token) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/platform-api-keys`, data, {
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

ApikeyService.updateApikeyActiveState = function (id, activeState) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/platform-api-keys/updateActiveState/${id}/${activeState}`, {}, {
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

ApikeyService.updateApikeySeenState = function (id) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/platform-api-keys/updateSeenState/${id}`, {}, {
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

export default ApikeyService;
