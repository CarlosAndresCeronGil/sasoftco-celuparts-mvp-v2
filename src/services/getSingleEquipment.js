import { API_URL } from "./settings";

export default function getSingleEquipment({ id }) {
    const apiURL = `${API_URL}/Equipment/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}