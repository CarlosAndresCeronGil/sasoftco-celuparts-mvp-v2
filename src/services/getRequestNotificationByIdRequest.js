import { API_URL } from "./settings";

export default function getRequestNotificationByIdRequest({idRequest}) {
    const apiURL = `${API_URL}/RequestNotification/Request/${idRequest}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
