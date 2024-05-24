import Swal from "sweetalert2";

export const swalSuccess = (msg:string):void => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
}
export const swalError = (msg:string):void => {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
}
export const swalEdit = async() => {
  const { value: text } = await Swal.fire({
    title: "Enter a new task name",
    input: "text",
    inputLabel: "Enter Task Name",
    inputPlaceholder: "Enter Here",
    inputAttributes: {
      maxlength: "60",
      autocapitalize: "off",
      autocorrect: "off"
    }
  });
  if (text) {
    // console.log(text);
    return text
  }
}

