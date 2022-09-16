import { API_URL } from "./settings"

export default function getRequestStatus() {
    const apiURL = `${API_URL}/RequestStatus`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
