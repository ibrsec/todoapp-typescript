import Swal from "sweetalert2";
enum SwalIcons {
  SUCCESS = "success",
  ERROR = "error",
}
export const swalSuccess = (msg:string):void => {
    Swal.fire({
        position: "top-end",
        icon: SwalIcons.SUCCESS,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
}
export const swalError = (msg:string):void => {
    Swal.fire({
        position: "top-end",
        icon: SwalIcons.ERROR,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      });
}
export const swalEdit = async(content:string) => {
  const { value: text} = await Swal.fire({
    title: "Enter a new task name",
    input: "text",
    inputValue:content,
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

