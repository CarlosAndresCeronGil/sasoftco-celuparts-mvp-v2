import { API_URL } from "./settings";

export default function getSingleRequestNotification({ id }) {
    const apiURL = `${API_URL}/RequestNotification/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}