import { API_URL } from "./settings";

export default function getSiigoAccountGroups() {
    const apiURL = `${API_URL}/AccountGroups`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}