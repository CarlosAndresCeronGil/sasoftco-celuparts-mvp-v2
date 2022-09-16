import { API_URL } from "./settings";

export default function getRepairs() {
    const apiURL = `${API_URL}/Repair`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
