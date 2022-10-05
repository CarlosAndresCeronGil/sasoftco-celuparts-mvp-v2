import { API_URL } from "./settings";

export default function getBrands() {
    const apiURL = `${API_URL}/Brand`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
