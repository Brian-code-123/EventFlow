"use client";

import React from "react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface Props {
  user: User;
}

export default function ProfileDashboardClient({ user }: Props) {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Name</label>
          <div className="text-lg">{user?.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Email</label>
          <div className="text-lg">{user?.email}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Role</label>
          <div className="text-lg capitalize">{user?.role}</div>
        </div>
      </div>
    </div>
  );
}
