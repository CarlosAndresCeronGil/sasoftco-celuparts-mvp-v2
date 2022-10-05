import { API_URL } from "./settings";

export default function getTypeOfEquipments() {
    const apiURL = `${API_URL}/TypeOfEquipment`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
