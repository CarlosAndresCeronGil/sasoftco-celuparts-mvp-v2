import { API_URL } from "./settings";

export default function getSingleRequestStatus({id}) {
    const apiURL = `${API_URL}/RequestStatus/${id}`
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
        )
        .catch(error => {
            console.log(error);
        })
}