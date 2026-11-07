"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  CreditCard,
  FileText,
  DollarSign,
  ShieldCheck,
  Search,
  Sparkles,
  Loader2,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalResumes: number;
  paidSubscriptions: number;
  estimatedMrr: number;
}

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  plan: string;
  resumeCount: number;
  createdAt: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlan = async (userId: string, currentPlan: string) => {
    setActionLoading(userId);
    const newPlan = currentPlan === "FREE" ? "PRO_MONTHLY" : "FREE";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, plan: newPlan }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, plan: newPlan } : u))
        );
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
        <span className="text-xs text-slate-400">Loading operations portal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Overview & Metrics</h2>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics on user adoption, revenue, and database activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Accounts</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.totalUsers || 0}</div>
          <div className="text-[11px] text-emerald-400 mt-1">Registered users</div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Subscribers</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.paidSubscriptions || 0}</div>
          <div className="text-[11px] text-slate-400 mt-1">Pro plan members</div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Estimated MRR</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">${stats?.estimatedMrr || 0}</div>
          <div className="text-[11px] text-slate-400 mt-1">Monthly Recurring Revenue</div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Resumes Built</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.totalResumes || 0}</div>
          <div className="text-[11px] text-purple-400 mt-1">Across 11 templates</div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-base text-white">User Accounts</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage accounts, toggle subscriptions, and audit created resumes.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user or email..."
              className="w-full text-xs bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Plan</th>
                <th className="pb-3 font-semibold">Resumes</th>
                <th className="pb-3 font-semibold">Joined</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredUsers.map((u) => {
                const isUserPro = u.plan === "PRO_MONTHLY" || u.plan === "PRO_ANNUAL";

                return (
                  <tr key={u.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3">
                      <div className="font-semibold text-white">{u.name || "Unnamed"}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUserPro
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{u.resumeCount}</td>
                    <td className="py-3 text-slate-400 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleTogglePlan(u.id, u.plan)}
                        disabled={actionLoading === u.id}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition disabled:opacity-50 ${
                          isUserPro
                            ? "bg-slate-800 hover:bg-slate-700 text-amber-300"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                      >
                        {actionLoading === u.id ? (
                          <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                        ) : isUserPro ? (
                          "Downgrade to Free"
                        ) : (
                          "Gift Pro Plan"
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

