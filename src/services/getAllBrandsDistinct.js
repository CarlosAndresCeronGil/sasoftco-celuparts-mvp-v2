import { API_URL } from "./settings";

export default function getAllBrandsDistinct() {
    const apiURL = `${API_URL}/Brand/allBrands`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
