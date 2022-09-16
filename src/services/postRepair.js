import { API_URL } from "./settings";

export default function postRepair(data) {
    const apiURL = `${API_URL}/Repair`;

    return fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
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