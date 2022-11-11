import { API_URL } from "./settings";

export default function getSmartWatchesBrands() {
    const apiURL = `${API_URL}/Brand/smartWatches`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        })
        .catch(error => {
            console.log(error)
        })
}
