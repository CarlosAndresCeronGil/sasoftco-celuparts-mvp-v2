import { API_URL } from "./settings";

export default function getPartsInfo() {
    const apiURL = `${API_URL}/PartsInfo`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
