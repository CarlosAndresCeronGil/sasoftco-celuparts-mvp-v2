import { API_URL } from "./settings";

export default function getVerifyImei({id}) {
    const apiURL = `${API_URL}/Equipment/VerifyImei/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}
