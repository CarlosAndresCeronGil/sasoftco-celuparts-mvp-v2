import { API_URL } from "./settings";

export default function getSiigoUsers() {
    const apiURL = `${API_URL}/Users`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}