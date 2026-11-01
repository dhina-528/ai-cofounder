"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Task, TaskCategory, TaskPriority } from "@/types/task";
import { getPriorityBadgeColor } from "@/lib/utils";
import { useStartup } from "@/context/StartupContext";
import {
  CheckSquare,
  Square,
  Sparkles,
  Plus,
  Clock,
  Filter,
  CheckCircle2,
} from "lucide-react";

interface TaskListProps {
  initialTasks?: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  const { tasks: contextTasks, toggleTaskStatus, addTask } = useStartup();
  const tasks = contextTasks && contextTasks.length > 0 ? contextTasks : initialTasks || [];
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>("product");
  const [isAdding, setIsAdding] = useState(false);

  const toggleTask = (taskId: string) => {
    toggleTaskStatus(taskId);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      status: "todo",
      priority: "high",
      category: newTaskCategory,
      dueDate: "This Week",
      estimatedHours: 1.0,
      aiCoFounderTip: "Deconstruct into a 25-minute testable sprint to preserve momentum.",
    });

    setNewTaskTitle("");
    setIsAdding(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === "all") return true;
    return t.category === filterCategory;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-4">
      {/* Header with Stats & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Sprint Execution Tasks</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {completedCount}/{tasks.length} Done
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Interactive daily founder tasks with direct AI co-founder execution guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-navy-900 border border-slate-800 rounded-lg p-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-2"
            >
              <option value="all" className="bg-navy-950 text-slate-200">All Categories</option>
              <option value="validation" className="bg-navy-950 text-slate-200">Validation</option>
              <option value="product" className="bg-navy-950 text-slate-200">Product</option>
              <option value="marketing" className="bg-navy-950 text-slate-200">Marketing</option>
              <option value="tech" className="bg-navy-950 text-slate-200">Tech</option>
            </select>
          </div>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Quick Add Task Form */}
      {isAdding && (
        <form
          onSubmit={handleAddTask}
          className="p-4 rounded-xl bg-navy-900 border border-brand-cyan/30 space-y-3 transition-all"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="What needs to be shipped or validated next? (e.g. Schedule 3 customer calls)"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              autoFocus
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value as TaskCategory)}
                className="px-3 py-2 text-xs rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-brand-cyan"
              >
                <option value="validation">Validation</option>
                <option value="product">Product</option>
                <option value="marketing">Marketing</option>
                <option value="tech">Tech</option>
                <option value="fundraising">Fundraising</option>
              </select>
              <Button type="submit" size="sm" variant="primary">
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Task List Items */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 rounded-xl border border-dashed border-slate-800">
            No tasks found in this category.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === "completed";

            return (
              <GlassCard
                key={task.id}
                className={`p-4 transition-all ${
                  isDone
                    ? "bg-navy-950/40 border-slate-800/60 opacity-60"
                    : "bg-navy-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Interactive Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-brand-cyan transition-colors focus:outline-none"
                      aria-label={isDone ? "Mark task as incomplete" : "Mark task as complete"}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 hover:text-brand-cyan" />
                      )}
                    </button>

                    {/* Task Title & Details */}
                    <div className="space-y-1">
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          isDone ? "line-through text-slate-500" : "text-white"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-[11px] text-slate-400">
                          {task.description}
                        </p>
                      )}

                      {/* AI Co-Founder Tip */}
                      {task.aiCoFounderTip && !isDone && (
                        <div className="mt-2 text-[11px] text-cyan-300 bg-brand-cyan/5 border border-brand-cyan/20 p-2 rounded-lg flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-brand-cyan">Co-Founder Tip: </span>
                            <span>{task.aiCoFounderTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges & Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getPriorityBadgeColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                      {task.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
};
