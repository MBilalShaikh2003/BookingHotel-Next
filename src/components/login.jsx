'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("Current session:", session); // Debug
  console.log("Current status:", status); // Debug

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoggingIn(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error);
        setLoggingIn(false);
        return;
      }

      // If no error, wait for session to update
      console.log("SignIn success, waiting for session update...");
    } catch (err) {
      console.error("SignIn error:", err);
      setError("Failed to sign in. Please try again.");
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      console.log("User authenticated, role:", session?.user?.role); // Debug
      const role = session?.user?.role;

      setLoggingIn(false); // Reset loading state

      if (role === 'admin') {
        console.log("Redirecting to /dashboard...");
        router.push('/dashboard'); // Use push instead of replace for debugging
      } else {
        console.log("Redirecting to /...");
        router.push('/');
      }
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-red-500 text-3xl font-bold mb-6 text-center">BOOK STAY</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 bg-black border border-red-500 rounded text-white placeholder-red-300"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-4 bg-black border border-red-500 rounded text-white placeholder-red-300"
          required
        />

        {error && (
          <div className="mb-4 bg-red-600 text-white text-center py-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loggingIn}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded disabled:opacity-50"
        >
          {loggingIn ? 'Signing In...' : 'Sign In'}
        </button>

        <Link
          href="/signup"
          className="block mt-4 text-red-400 text-center hover:underline"
        >
          Don't Have an Account? Click Here
        </Link>
      </form>
    </div>
  );
}