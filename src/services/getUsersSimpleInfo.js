import { API_URL } from "./settings"

export default function getUsersSimpleInfo() {
    const apiURL = `${API_URL}/UserDto/SimpleInfo`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}