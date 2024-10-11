import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export function showPopupMessage({
  icon,
  title,
  confirmButtonText,
  text,
  ...props
}: SweetAlertOptions): Promise<SweetAlertResult> {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonText,
    ...props,
  });
}
