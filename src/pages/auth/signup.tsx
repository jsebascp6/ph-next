import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      if (res.ok) {
        setSuccess('Usuario creado exitosamente');
        setTimeout(() => router.push('/auth/signin'), 2000); // Redirigir a la página de inicio de sesión
      } else {
        setError('Error al crear el usuario');
      }
    } catch (error) {
      setError('Hubo un error en el registro');
    }
  };

  return (
    <div>
      <h1>Regístrate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}
