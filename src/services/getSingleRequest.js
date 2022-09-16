import { API_URL } from "./settings";

export default function getSingleRequest({ id }) {
    const apiURL = `${API_URL}/Request/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}