import { API_URL } from "./settings";

export default function putRepairStartDateByIdRequest({ id }) {
    const apiURL = `${API_URL}/Repair/repairStartDate/byIdRequest/${id}`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
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