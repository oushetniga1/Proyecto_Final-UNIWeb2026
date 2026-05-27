import { motion } from "framer-motion";

import Button from "../components/common/Button";
import Card from "../components/common/Card";

export default function Login() {
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        <Card>

          <h1 className="text-5xl font-bold mb-3">
            Bienvenido
          </h1>

          <p className="text-slate-400 mb-10">
            Inicia sesión en UniReport
          </p>

          <form className="space-y-6">

            <input
              type="email"
              placeholder="Correo institucional"
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
              Ingresar
            </Button>

          </form>

        </Card>

      </motion.div>

    </div>
  );
}