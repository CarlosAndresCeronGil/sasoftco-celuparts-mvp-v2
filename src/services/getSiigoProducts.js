import { API_URL } from "./settings";

export default function getSiigoProducts() {
    const apiURL = `${API_URL}/SiigoProduct`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
