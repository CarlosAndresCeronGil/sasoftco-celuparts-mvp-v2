import { API_URL } from "./settings";

export default function getTechnicians() {
    const apiURL = `${API_URL}/Technician`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
}