import { API_URL } from "./settings";

export default function getCelupartsInfo() {
    const apiURL = `${API_URL}/CelupartsInfo`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
