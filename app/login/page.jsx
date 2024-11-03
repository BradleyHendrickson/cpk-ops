'use client';

import { useState } from 'react';
import "../globals.css";
import { createClient } from '@/utils/supabase/client';
import ButtonSpinner from '@/components/ButtonSpinner';

export default function Login() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  async function signUpNewUser() {
    setMessage('');
    setSuccessMessage('');
    setLoadingSignUp(true);

    await new Promise(r => setTimeout(r, 100));

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://moonstone-prod.vercel.app/',
      },
    });

    setLoadingSignUp(false);

    if (error) {
      setMessage(error.message);
    } else {
      setSuccessMessage('Check your email to confirm your account');
    }
  }

  async function signInWithEmail() {
    setMessage('');
    setSuccessMessage('');
    setLoadingSignIn(true);

    await new Promise(r => setTimeout(r, 100));

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      setLoadingSignIn(false);
    }

    if (!error && data) {
      window.location.href = '/dashboard';
    }
  }

  const onDismiss = () => setMessage('');

  const loading = loadingSignIn || loadingSignUp;

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmail();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[#f0f0f0] to-[#6b6b6b] grayscale-[70%] z-[-1]"
        style={{
          filter: 'grayscale(70%)',
        }}
      ></div>

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login to CPK-Ops</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {message && !successMessage && (
              <div className="text-red-500 text-sm mt-2">{message}</div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm mt-2">{successMessage}</div>
            )}

            <div className="flex space-x-4 mt-4">
              <ButtonSpinner
                loading={loadingSignUp}
                disabled={loading}
                onClick={signUpNewUser}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </ButtonSpinner>
              <ButtonSpinner
                type="submit"
                loading={loadingSignIn}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Login
              </ButtonSpinner>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-4 text-gray-500">Chatoyant Solutions</div>
    </>
  );
}
