import { API_URL } from "./settings";

export default function getTechnicianByEmail({email}) {
    const apiURL = `${API_URL}/Technician/ByEmail/${email}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
