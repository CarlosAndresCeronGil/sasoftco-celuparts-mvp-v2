import { API_URL } from './settings';

export default function getEquipmentInvoice({ id }) {
  const apiURL = `${API_URL}/Equipment/downloadFile/${id}`;
  return (
    fetch(apiURL)
      // .then((response) => response.blob())
      // .then(blob => {
      //     const file = window.URL.createObjectURL(blob);
      //     window.location.assign(file)
      // })
      // .catch(error => {
      //     console.log(error)
      // })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura.${blob.type.slice(blob.type.indexOf('/') + 1)}`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
  );
}
