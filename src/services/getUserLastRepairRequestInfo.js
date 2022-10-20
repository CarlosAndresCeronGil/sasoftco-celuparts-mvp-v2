import { API_URL } from "./settings"

export default function getUserLastRepairRequestInfo({id}) {
    const apiURL = `${API_URL}/UserDto/LastRequestInfo/Repair/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}