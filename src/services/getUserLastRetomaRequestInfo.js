import { API_URL } from "./settings"

export default function getUserLastRetomaRequestInfo({id}) {
    const apiURL = `${API_URL}/UserDto/LastRequestInfo/Retoma/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}