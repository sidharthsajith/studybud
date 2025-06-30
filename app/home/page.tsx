import { PomodoroTimer } from "@/components/productivity/pomodoro-timer";
import { WeekScheduler } from "@/components/productivity/week-scheduler";
import { MotivationalQuote } from "@/components/productivity/motivational-quote";

export default function HomeDashboard() {
  return (
    <div className="container p-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Your study productivity hub</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeekScheduler />
        </div>
        <div className="space-y-6">
          <PomodoroTimer />
          <MotivationalQuote />
        </div>
      </div>
    </div>
  );
}
