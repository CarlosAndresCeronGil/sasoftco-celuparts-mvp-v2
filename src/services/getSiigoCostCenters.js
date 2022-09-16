import { API_URL } from "./settings";

export default function getSiigoCostCenters() {
    const apiURL = `${API_URL}/CostCenters`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}