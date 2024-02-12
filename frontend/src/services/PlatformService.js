import axios from "axios";
const PlatformService = {}

PlatformService.getPlatforms = function (token) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/platform`, {
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

PlatformService.createPlatform = function (data, token) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/platform`, data, {
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

PlatformService.updatePlatform = function (id, data) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/platform/${id}`, data, {
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

PlatformService.deletePlatform = function (id) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${process.env.REACT_APP_API_BASE_URL}/api/platform/${id}`, {
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

export default PlatformService;

