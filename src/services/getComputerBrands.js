import { API_URL } from "./settings";

export default function getComputerBrands() {
    const apiURL = `${API_URL}/Brand/computers`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
