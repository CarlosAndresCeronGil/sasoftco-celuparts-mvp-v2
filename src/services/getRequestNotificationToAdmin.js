import { API_URL } from "./settings";

export default function getRequestNotificationToAdmin() {
    const apiURL = `${API_URL}/RequestNotification/Admin`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
