import { API_URL } from "./settings";

export default function getEquipments() {
    const apiURL = `${API_URL}/Equipment`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
}
