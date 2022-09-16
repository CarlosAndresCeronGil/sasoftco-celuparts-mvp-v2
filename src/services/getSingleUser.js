import { API_URL } from "./settings";

export default function getSingleUser({id}) {
    const apiURL = `${API_URL}/UserDto/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}