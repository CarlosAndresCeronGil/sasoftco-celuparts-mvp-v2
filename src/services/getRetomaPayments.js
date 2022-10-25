import { API_URL } from './settings'

export default function getRetomaPayments() {
    const apiURL = `${API_URL}/RetomaPayment`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}
