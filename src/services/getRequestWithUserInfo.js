import { API_URL } from './settings'

export default function getRequestWithUserInfo({ id }) {
    const apiURL = `${API_URL}/Request/UserInfo/${id}`;

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
