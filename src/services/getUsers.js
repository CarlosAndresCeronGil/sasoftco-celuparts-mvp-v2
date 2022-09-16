import { API_URL } from "./settings"

export default function getUsers() {
    const apiURL = `${API_URL}/UserDto`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}