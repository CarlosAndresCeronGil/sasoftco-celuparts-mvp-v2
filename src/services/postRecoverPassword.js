import { API_URL } from "./settings";

export default function postRecoverPassword(data) {
    const apiURL = `${API_URL}/Auth/recoverPassword`;

    return fetch(apiURL, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
        },
        body: (data)
    })
        .then(response => response.json())
        .then(data2 => {
            // if(!data2.ok) {
            //     return data2.json().then(response => {throw new Error(response.InnerException.Message)})
            // }
            return data2;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}