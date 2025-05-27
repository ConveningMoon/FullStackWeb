'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api/auth';

interface RegisterFormState {
  email: string;
  username: string;
  password: string;
  password2: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormState>({
    email: '',
    username: '',
    password: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null); // Reset messages before requesting to server
    try {
      const data = await registerUser(
        formData.email,
        formData.username,
        formData.password,
        formData.password2
      );
      // Save the token to local storage and redirect to the dashboard
      localStorage.setItem('token', data.token);
      router.push('/login');
    } catch (error: any) {
      console.error('Registration Error:', error.message || error);
      setMessage(error.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400">Register</h2>
        </div>

        {message && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-cyan-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-cyan-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-cyan-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              required
              value={formData.password2}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Already have an account?{' '}
            <a className="text-cyan-400 underline" href="/login">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}