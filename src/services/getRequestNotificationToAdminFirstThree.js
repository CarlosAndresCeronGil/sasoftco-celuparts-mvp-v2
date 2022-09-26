import { API_URL } from "./settings";

export default function getRequestNotificationToAdminFirstThree() {
    const apiURL = `${API_URL}/RequestNotification/Admin/FirstThree`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
