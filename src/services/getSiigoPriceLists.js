import { API_URL } from "./settings";

export default function getSiigoPriceLists() {
    const apiURL = `${API_URL}/PriceList`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}