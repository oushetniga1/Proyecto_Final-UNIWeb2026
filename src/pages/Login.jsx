import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      navigate('/');

    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 p-10 rounded-3xl border border-white/10"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Iniciar Sesión
        </h1>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-slate-800 border border-white/10"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl font-semibold"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>

        <p className="text-center text-slate-400 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-400">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}