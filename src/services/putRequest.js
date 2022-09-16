import { API_URL } from "./settings";

export default function putRequest(data) {
    const apiURL = `${API_URL}/Request`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}