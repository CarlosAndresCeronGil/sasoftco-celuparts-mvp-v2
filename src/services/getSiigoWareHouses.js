import { API_URL } from "./settings";

export default function getSiigoWareHouses() {
    const apiURL = `${API_URL}/WareHouses`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}