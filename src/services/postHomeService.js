/* eslint-disable */
import { API_URL } from "./settings";

export default function postHomeService(data) {

    const apiURL = `${API_URL}/HomeService`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data2 => {
            return data2;
        })
        .catch(error => {
            console.log(error);
            return error;
        }
        );
}