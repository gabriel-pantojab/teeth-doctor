import { QuestionModel } from "../models/question";

export const QUESTIONS: QuestionModel[] = [
  {
    question: "¿Cuántas veces al día tienes que cepillarte los dientes?",
    answers: ["3 veces", "1 vez", "No me cepillo"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Si tienes comidas entre los dientes con qué la sacas?",
    answers: ["Aguja", "Un palito", "Hilo dental"],
    indexCorrectAnswer: 2,
    answered: false,
  },
  {
    question: "¿Con qué te cepillas los dientes? ",
    answers: ["Pasta de dientes", "Jabón", "Nada"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Cada cuánto tiempo tienes que ir al dentista?",
    answers: ["Cada 6 meses", "Cada año", "Nunca", "Cuando me duele el diente"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Cuándo te cepillas los dientes?",
    answers: ["Antes de desayunar", "Después de desayunar", "Nunca"],
    indexCorrectAnswer: 1,
    answered: false,
  },
  {
    question: "¿Qué comidas producen caries en los dientes?",
    answers: ["Verduras", "Chocolates dulces", "Frutas"],
    indexCorrectAnswer: 1,
    answered: false,
  },
  {
    question: "¿Qué usas para limpiarte los dientes?",
    answers: [
      "Cepillo y pasta dental",
      "Cepillo pasta, hilo dental y enjuague",
      "Nada",
    ],
    indexCorrectAnswer: 1,
    answered: false,
  },
  {
    question: "¿Cada cuánto tiempo cambiamos el cepillo dental?",
    answers: ["1 vez al año", "Cada 3 meses", "No se cambia"],
    indexCorrectAnswer: 1,
    answered: false,
  },
  {
    question: "¿Cuánto tiempo debe durar el cepillado?",
    answers: ["3 minutos", "5 minutos", "Media hora"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Qué pasa si no te cepillas los dientes?",
    answers: ["Nada", "Se caen", "Se ponen amarillos"],
    indexCorrectAnswer: 2,
    answered: false,
  },
  {
    question: "¿Qué bebida es mejor para cuidar tus dientes?",
    answers: ["Agua", "Refresco", "Café"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Qué herramienta puedes usar para limpiar la lengua?",
    answers: ["Cepillo dental", "Cuchara", "No es necesario limpiarla"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Qué es lo primero que debes hacer después de comer?",
    answers: ["Cepillarte los dientes", "Tomar agua", "Esperar una hora"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Qué cantidad de pasta dental debes usar?",
    answers: ["El tamaño de un guisante", "Llena el cepillo", "No importa"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Qué alimentos ayudan a mantener los dientes fuertes?",
    answers: ["Lácteos", "Refrescos", "Caramelos"],
    indexCorrectAnswer: 0,
    answered: false,
  },
  {
    question: "¿Cómo debes mover el cepillo al cepillarte los dientes?",
    answers: ["De arriba a abajo", "En círculos", "Solo de lado a lado"],
    indexCorrectAnswer: 1,
    answered: false,
  },
];
