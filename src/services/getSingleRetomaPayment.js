import { API_URL } from "./settings";

export default function getSingleRetomaPayment({ id }) {
    const apiURL = `${API_URL}/RetomaPayment/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}