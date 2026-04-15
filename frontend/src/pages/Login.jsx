import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ShoppingCart } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <section className="rounded-[32px] bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-400 p-10 text-white shadow-2xl ring-1 ring-white/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 shadow-lg">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h1 className="mt-10 text-4xl font-semibold tracking-tight">Welcome back.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-orange-100">
            Sign in to continue ordering from premium restaurants with fast delivery and easy checkout.
          </p>
          <div className="mt-10 grid gap-4 text-sm text-orange-100/90">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Secure checkout</p>
              <p className="mt-2 text-orange-100/90">Your data is encrypted and protected.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Fast support</p>
              <p className="mt-2 text-orange-100/90">Chat with our support team anytime.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-slate-900/95 p-10 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Sign in</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Access your account</h2>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300">
              Secure login
            </span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-3xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <div className="space-y-5">
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-300">Email</span>
                <div className="relative rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-orange-500">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent pl-12 text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-300">Password</span>
                <div className="relative rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 focus-within:border-orange-500">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent pl-12 text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-orange-300 hover:text-orange-200">
              Create one now
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
