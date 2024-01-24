import axios from "axios";
const UserService = {}

UserService.getUserProfiles = function (token) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/user-profile`, {
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

UserService.createUserProfile = function (data) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/user-profile`, data, {
                headers: {
                    "Content-Type": "application/json",
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

UserService.updateUserProfile = function (id, data) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/user-profile/${id}`, data, {
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

UserService.deleteUserProfile = function (id, role) {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${process.env.REACT_APP_API_BASE_URL}/api/user-profile/${id}/${role}`, {
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

export default UserService;

