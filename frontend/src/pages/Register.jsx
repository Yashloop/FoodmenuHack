import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, UserPlus } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const result = await register(formData);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <section className="rounded-[32px] bg-slate-900/90 p-10 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500/15 text-orange-200 shadow-lg">
            <UserPlus className="h-8 w-8" />
          </div>
          <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white">
            Create an account
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
            Join FoodMenu and start ordering from the best restaurants in your
            area with a premium experience.
          </p>
          <div className="mt-10 grid gap-4 text-sm text-slate-300">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="font-semibold">Instant access</p>
              <p className="mt-2 text-slate-400">
                Sign up and start browsing menus immediately.
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="font-semibold">Safe & secure</p>
              <p className="mt-2 text-slate-400">
                We protect your information with strong encryption.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] bg-white p-10 shadow-2xl ring-1 ring-slate-900/10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Register
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                Start your account
              </h2>
            </div>
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
              New user
            </span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-3xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-3xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <div className="space-y-5">
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-600">
                  Full name
                </span>
                <div className="relative rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-orange-500">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-600">
                  Email
                </span>
                <div className="relative rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-orange-500">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-3 block text-sm font-medium text-slate-600">
                  Password
                </span>
                <div className="relative rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-orange-500">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full bg-transparent pl-12 text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-600 hover:text-orange-500"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
