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