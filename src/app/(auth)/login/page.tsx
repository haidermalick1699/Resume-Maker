"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    let res = await signIn("credentials", {
      redirect: false,
      email: "demo@resumemaker.com",
      password: "password123",
      callbackUrl,
    });

    if (res?.error) {
      // Fallback
      res = await signIn("credentials", {
        redirect: false,
        email: "demo@resumeforge.com",
        password: "password123",
        callbackUrl,
      });
    }

    if (res?.error) {
      setError("Demo account login failed. Run 'npm run prisma:seed' first.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-lg mx-auto mb-3 shadow-md shadow-blue-500/20">
          RM
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome to Resume Maker</h1>
        <p className="text-xs text-slate-500 mt-1">
          Sign in to create, edit, and export your professional resumes.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.com"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
        </button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-2 text-[11px] text-slate-400 uppercase tracking-wider">
          or quick demo
        </span>
      </div>

      {/* 1-Click Demo Login Button */}
      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-lg border border-slate-200 transition flex items-center justify-center gap-2"
      >
        <span>Try Demo Account (Alex Sterling)</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <p className="text-center text-xs text-slate-500 mt-6">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="text-blue-600 font-semibold hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-xs text-slate-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
