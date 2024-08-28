import { useSession, signIn } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>No estás autenticado</h1>
        <button onClick={() => signIn()}>Iniciar sesión</button>
      </div>
    );
  }

  return <div>Bienvenido {session.user.email}</div>;
}
