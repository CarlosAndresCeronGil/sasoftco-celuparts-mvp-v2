import { API_URL } from "./settings";

export default function getRequestNotification() {
    const apiURL = `${API_URL}/RequestNotification`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
