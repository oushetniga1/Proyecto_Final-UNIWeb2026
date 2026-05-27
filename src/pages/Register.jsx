import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function Register() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >

      <div className="w-full max-w-md">

        <Card>

          <h1 className="text-5xl font-bold mb-3">
            Crear Cuenta
          </h1>

          <p className="text-slate-400 mb-10">
            Regístrate en UniReport
          </p>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Nombre completo"
              className="
                w-full
                glass
                rounded-2xl
                p-4
                bg-transparent
                outline-none
              "
            />

            <input
              type="email"
              placeholder="Correo"
              className="
                w-full
                glass
                rounded-2xl
                p-4
                bg-transparent
                outline-none
              "
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="
                w-full
                glass
                rounded-2xl
                p-4
                bg-transparent
                outline-none
              "
            />

            <Button className="w-full py-4">
              Registrarse
            </Button>

          </form>

        </Card>

      </div>

    </div>
  );
}