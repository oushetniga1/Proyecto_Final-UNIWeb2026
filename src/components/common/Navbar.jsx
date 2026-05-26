import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <h1>NAVBAR FUNCIONA</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}