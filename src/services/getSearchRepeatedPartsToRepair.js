import { API_URL } from './settings'

export default function getSearchRepeatedPartsToRepair({idRepair, partName = ""} = {}) {
    const apiURL = `${API_URL}/PartsToRepair/searchRepeated?idRepair=${idRepair}&partName=${partName}`;

    return fetch(apiURL)
        // .then(response => response.json())
        .then((response) => {
            // console.log("response desde el fetch", response)
            if(response.status === 404) {
                return response;
            }
            return response.json();
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}
