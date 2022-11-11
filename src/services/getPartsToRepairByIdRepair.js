import { API_URL } from "./settings";

export default function getPartsToRepairByIdRepair({id}) {
    const apiURL = `${API_URL}/PartsToRepair/byIdRepair/${id}`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
