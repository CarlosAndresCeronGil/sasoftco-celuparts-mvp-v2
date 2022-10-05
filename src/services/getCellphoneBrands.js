import { API_URL } from "./settings";

export default function getCellphoneBrands() {
    const apiURL = `${API_URL}/Brand/cellphones`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
