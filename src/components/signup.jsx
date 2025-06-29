'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !password || !email) {
      setError("All fields must be filled!");
      return;
    }

    try {
      setError('');

      const userAlready = await fetch("/api/UserExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await userAlready.json();
      if (user) {
        setError("User Already Exists!");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        setError("Registration failed. Please try again.");
        return;
      }

      setForm({ name: '', email: '', password: '' });
      e.target.reset();
      router.push('/login');
    } catch (error) {
      console.error("error occurred", error);
      setError("An unexpected error occurred!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-red-500 text-3xl font-bold mb-6 text-center">BOOK STAY</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-4 bg-black border border-red-500 rounded text-white placeholder-red-300"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 bg-black border border-red-500 rounded text-white placeholder-red-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-6 bg-black border border-red-500 rounded text-white placeholder-red-300"
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
        >
          Sign Up
        </button>
        {error && (
          <div className="mt-4 bg-red-600 text-white text-center py-2 rounded-lg">
            {error}
          </div>
        )}
        <Link
          href="/login"
          className="block mt-4 text-red-400 text-center hover:underline"
        >
          Already Have an Account? Click Here
        </Link>
      </form>
    </div>
  );
}
