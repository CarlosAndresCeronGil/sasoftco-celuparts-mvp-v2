import { API_URL } from "./settings";

export default function getRequestNotificationToTechnicianFirstThree() {
    const apiURL = `${API_URL}/RequestNotification/Technician/FirstThree`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
