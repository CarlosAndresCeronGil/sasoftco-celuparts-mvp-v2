import { API_URL } from './settings'

export default function getRequests() {
    const apiURL = `${API_URL}/Request`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}
