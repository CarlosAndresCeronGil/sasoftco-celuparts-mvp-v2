import { API_URL } from "./settings";

export default function getRequestNotificationToCourierFirstThree() {
    const apiURL = `${API_URL}/RequestNotification/Courier/FirstThree`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
