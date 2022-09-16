import { API_URL } from "./settings";

export default function postRequestStatus(data) {
    const apiURL = `${API_URL}/RequestStatus`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            return data;
        }
        )
        .catch(error => {
            console.log(error);
            return error;
        }
        );
}