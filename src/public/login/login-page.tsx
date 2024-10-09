export function LoginPage() {
  return (
    <main className="bg-slate-100 w-full h-full flex flex-col items-center">
      <header className="flex justify-center items-center py-4">
        <h1 className="text-2xl font-bold">Teeth Doctor</h1>
      </header>

      <form className="gap-2 flex justify-center items-center flex-col">
        <label htmlFor="username" className="flex flex-col gap-2">
          <span>Usuario</span>

          <input
            id="username"
            type="text"
            className="border-2 outline-none rounded-md p-2"
          />
        </label>

        <div className="w-full flex justify-between">
          <button className="bg-white pt-1 p-2 rounded-md" type="button">
            Registrarse
          </button>

          <button
            className="bg-blue-400 p-2 py-1 rounded-md text-white"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </form>
    </main>
  );
}
