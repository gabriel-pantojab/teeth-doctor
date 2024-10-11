import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import {
  MAXIMUN_CORRECT_ANSWERS,
  MINIMUN_CORRECT_ANSWERS,
} from "../models/constants";

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

export function endTriviaPopup(correctAnswers: number) {
  let message = "";
  if (correctAnswers > MAXIMUN_CORRECT_ANSWERS) {
    message = `¡Felicidades! Respondiste ${correctAnswers} preguntas correctamente y ganaste una vida extra.`;
  } else {
    if (correctAnswers > MINIMUN_CORRECT_ANSWERS) {
      message = `Respondiste ${correctAnswers} preguntas correctamente. Sigue así.`;
    } else {
      message = `Respondiste ${correctAnswers} preguntas correctamente. Sigue intentando.`;
    }
  }

  return showPopupMessage({
    icon: "success",
    title: "Trivia finalizada",
    text: message,
    confirmButtonText: "Salir",
  });
}
