import { API_URL } from "./settings";

export default function getSiigoTaxes() {
    const apiURL = `${API_URL}/Taxes`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}