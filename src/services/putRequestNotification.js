import { API_URL } from "./settings";

export default function putRequestNotification(data) {
    const apiURL = `${API_URL}/RequestNotification`;

    return fetch(apiURL, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}