import axios from "axios";
const TaxesService = {}

TaxesService.getTaxes = function (token) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/taxes`, {
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

TaxesService.createTaxes = function (data, token) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/taxes`, data, {
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

TaxesService.updateTaxes = function (id, data) {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_BASE_URL}/api/taxes/${id}`, data, {
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

export default TaxesService;

