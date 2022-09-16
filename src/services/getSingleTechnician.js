import { API_URL } from "./settings";

export default function getSingleTechnician({id}) {
    const apiURL = `${API_URL}/Technician/${id}`
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
        )
        .catch(error => {
            console.log(error);
        })
}