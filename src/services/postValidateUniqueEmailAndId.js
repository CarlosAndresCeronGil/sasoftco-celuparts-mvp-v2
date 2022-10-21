import { API_URL } from "./settings";

export default function postValidateUniqueEmailAndId(data) {
    const apiURL = `${API_URL}/Auth/validateUniqueEmailAndId`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
        body: (data)
    })
        .then(res => res.json())
        .then(data2 => {
            return data2;
        }
        )
        .catch(error => {
            console.log(error);
            return error;
        }
        );
}