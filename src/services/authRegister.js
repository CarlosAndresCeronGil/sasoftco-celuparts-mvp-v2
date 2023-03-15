import Swal from "sweetalert2";
import { API_URL } from "./settings";

export default function authRegister(data) {
  const apiURL = `${API_URL}/Auth/register`;

  return (
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      // .then(response => response.json())
      .then(data2 => {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Exito!',
        //     text: 'Registro exitoso!',
        // })
        if (!data2.ok) {
          // return data2.text().then(text => { throw new Error(text) })
          return data2.json().then(response => {
            throw new Error(response.InnerException.Message);
          });
        }
        return data2;
      })
      .catch(error => {
        console.log("ERROR DENTRO DE AUTH", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que algo falló!"
        });
        return error;
      })
  );
}
