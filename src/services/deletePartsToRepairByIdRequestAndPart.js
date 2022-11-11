import { API_URL } from "./settings";

export default function deletePartsToRepairByIdRequestAndPart({ idRepair, partName }) {
    const apiURL = `${API_URL}/PartsToRepair/byIdRequestAndPart?idRepair=${idRepair}&partName=${partName}`;

    return fetch(apiURL, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data2 => {
            return data2;
        }
        )
        .catch(error => {
            console.log(error);
            return error;
        }
        );
}