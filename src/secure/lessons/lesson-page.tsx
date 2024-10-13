import { Lesson } from "./components/lesson";

export function LessonPage() {
  return (
    <section className="p-4">
      <section className="flex flex-col gap-4">
        <Lesson
          title="Como lavarse los dientes"
          video="/assets/videos/lesson-1.mp4"
        />

        <Lesson
          title="1. Primero limpiaremos las caras vestibulares de los dientes."
          image="https://res.cloudinary.com/dq6tbuvti/image/upload/e_gen_restore//v1728846755/step1_xvqu50.png"
        />

        <Lesson
          title="2. Coge el cepillo y colócalo formando un ángulo de 45 grados respecto a la encía. Realiza movimientos circulares desde la encía al diente."
          image="https://res.cloudinary.com/dq6tbuvti/image/upload/e_gen_restore/v1728847243/step2_rngkcz.png"
        />

        <Lesson
          title="3. Continuamos con la cara interna de los dientes. Se coloca el cepillo de la misma forma, repitiendo el movimiento."
          image="https://res.cloudinary.com/dq6tbuvti/image/upload/e_gen_restore/v1728857019/step3_osqvje.png"
        />

        <Lesson
          title="4. Por último cepilla la cara de los dientes por la que masticamos (oclusal), realizando movimiento de barrido."
          image="https://res.cloudinary.com/dq6tbuvti/image/upload/e_gen_restore/v1728857182/step4_ujna3q.png"
        />
      </section>
    </section>
  );
}
