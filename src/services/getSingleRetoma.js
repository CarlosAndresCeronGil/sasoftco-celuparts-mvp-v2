import { API_URL } from "./settings";

export default function getSingleRetoma({id}) {
    const apiURL = `${API_URL}/Retoma/${id}`;

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