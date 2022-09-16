import { API_URL } from "./settings";

export default function getSiigoJournals() {
    const apiURL = `${API_URL}/SiigoJournals`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}