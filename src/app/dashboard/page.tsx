'use client';

import { useState } from 'react';
import { CustomButton } from '@/components/ui/button';
import { CustomCard } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'Workouts', value: '47', change: '+12%', color: 'text-orange' },
    { label: 'Pull-up PR', value: '20', change: '+5 reps', color: 'text-emerald-500' },
    { label: 'Skills unlocked', value: '12', change: '+2', color: 'text-blue-500' },
    { label: 'Days streak', value: '90', change: '+7 days', color: 'text-purple-500' },
  ];

  const recentWorkouts = [
    { exercise: 'Pull-ups', sets: 4, reps: '8-10', date: 'Today, 6:30 PM', muscle: 'Upper body' },
    { exercise: 'Push-ups', sets: 3, reps: '15', date: 'Yesterday, 7:00 PM', muscle: 'Upper body' },
    { exercise: 'Squats', sets: 4, reps: '12', date: '2 days ago, 6:00 PM', muscle: 'Lower body' },
    { exercise: 'Plank', sets: 3, reps: '60s', date: '3 days ago, 5:30 PM', muscle: 'Core' },
  ];

  const aiRecommendations = [
    { title: 'Pull-up Volume Day', description: '5 sets x 5 reps at 80% effort', type: 'push' },
    { title: 'Core Progression', description: 'Hollow body hold + L-sit 3 x 20s', type: 'pull' },
    { title: 'Handstand Practice', description: 'Chest-to-wall 5 x 30s holds', type: 'balance' },
  ];

  return (
    <div className="min-h-screen bg-darkbg">
      <div className="max-w-7xl mx-auto section-padding">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="stats-strip grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <LoadingSkeleton
                key={index}
                variant="card"
                className="h-24"
              />
            ))
          ) : (
            stats.map((stat, index) => (
              <CustomCard key={index} className="stat-card">
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.change}</div>
              </CustomCard>
            ))
          )}
        </div>

        {/* Progress Chart */}
        <CustomCard className="mb-8" style={{ borderRadius: '16px' }}>
          <h2 className="text-lg font-semibold mb-4">Pull-up Progress (Last 30 Days)</h2>
          <div className="h-64 bg-navy rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Chart.js visualization would render here</span>
          </div>
        </CustomCard>

        {/* Main Content Grid */}
        <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Recommendations */}
          <div className="lg:col-span-1">
            <CustomCard className="ai-card rounded-lg mb-6">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-lg font-semibold">AI Recommendations</h2>
                <span className="text-xs text-emerald-500">Updated today</span>
              </div>

              <div id="recs-loading" style={{ display: 'none' }}>
                <LoadingSkeleton variant="card" count={2} />
              </div>

              <div id="recs-content">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="rec-card">
                    <div>
                      <div className="font-semibold text-sm mb-1">{rec.title}</div>
                      <div className="text-xs text-slate-400">{rec.description}</div>
                    </div>
                    <CustomButton size="sm">Start</CustomButton>
                  </div>
                ))}
              </div>
            </CustomCard>

            {/* User Profile */}
            <CustomCard className="rounded-lg">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-orange flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  MR
                </div>
                <div className="font-semibold text-lg mb-1">Marcus R.</div>
                <div className="text-sm text-slate-400 mb-4">Intermediate level</div>
                <CustomButton variant="secondary" size="sm" className="w-full">Edit Profile</CustomButton>
              </div>
            </CustomCard>
          </div>

          {/* Recent Workouts */}
          <div className="lg:col-span-2">
            <CustomCard className="rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">Recent Workouts</h2>
              <div className="space-y-3">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-navy rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{workout.exercise}</div>
                      <div className="text-xs text-slate-400">{workout.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{workout.sets} sets x {workout.reps}</div>
                      <div className="text-xs text-slate-400">{workout.muscle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CustomCard>

            {/* Workout Log Form */}
            <CustomCard className="rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Log a Workout</h2>
              <form className="log-form space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Exercise</label>
                    <select className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite">
                      <option>Pull-ups</option>
                      <option>Push-ups</option>
                      <option>Squats</option>
                      <option>Plank</option>
                      <option>Dips</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Sets</label>
                    <input type="number" className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite" defaultValue="3" min="1" max="20" />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Reps</label>
                    <input type="number" className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite" defaultValue="8" min="1" max="200" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Duration (min)</label>
                  <input type="number" className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite" defaultValue="20" min="1" max="240" />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Notes</label>
                  <textarea className="w-full p-2 bg-darkbg border border-slate-800 rounded text-sm text-offwhite h-20" placeholder="Optional notes..."></textarea>
                </div>

                <CustomButton size="sm" className="px-6">Save Workout</CustomButton>
              </form>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}