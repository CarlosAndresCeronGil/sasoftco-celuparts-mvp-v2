
import { API_URL } from "./settings";

export default function putPartsToRepair(data) {
    const apiURL = `${API_URL}/PartsToRepair`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data2 => {
            return data2
        })
        .catch(error => {
            console.log(error)
            return error
        }
        );

}