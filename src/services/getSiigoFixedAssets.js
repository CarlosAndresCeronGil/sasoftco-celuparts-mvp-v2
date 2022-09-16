import { API_URL } from "./settings";

export default function getSiigoFixedAssets() {
    const apiURL = `${API_URL}/FixedAssets`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}