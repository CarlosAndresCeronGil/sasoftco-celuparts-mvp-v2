import { API_URL } from "./settings";

export default function getTabletsBrands() {
    const apiURL = `${API_URL}/Brand/tablets`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
