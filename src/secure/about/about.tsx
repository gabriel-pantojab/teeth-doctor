export default function About() {
  return (
    <main className="flex justify-center items-center h-full p-4">
      <article className="p-4 bg-white rounded-md shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Odontología - UMSS</h2>

        <section>
          <p>
            <span className="font-bold">Tutora: </span>Vásquez Capriles Blanca
            Gladys
          </p>

          <p className="font-bold">Estudiantes:</p>
          <ul className="list-disc list-inside pl-2">
            <li>López Pedro Carla Andrea</li>
            <li>Villarroel Arebalo Nayeli</li>
          </ul>
        </section>

        <section>
          <p className="font-bold">Desarrollador: </p>Gabriel Pantoja Bustamante
          👨‍💻
        </section>
      </article>
    </main>
  );
}
