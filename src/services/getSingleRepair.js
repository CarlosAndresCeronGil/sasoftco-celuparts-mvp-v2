import { API_URL } from "./settings";

export default function getSingleRepair({id}) {
    const apiURL = `${API_URL}/Repair/${id}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            return data;
        }
        ).catch(error => {
            console.log(error);
        }
        );
}