"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function FAQForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.from("community_faqs").insert({
        name: form.name,
        email: form.email,
        question: form.question,
        status: "pending",
      });

      if (error) throw error;
      
      setSuccess(true);
      setForm({ name: "", email: "", question: "" });
    } catch (error: any) {
      console.error("Error submitting question:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5F15]/20 text-[#FF5F15]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">Question Submitted!</h3>
        <p className="mt-3 text-white/60">
          Thanks for reaching out. Our team will review your question and post an answer to the community board shortly!
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 text-sm font-medium text-[#FF5F15] hover:text-[#FF7335]"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-[#0a0f0d] p-8 sm:p-12">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white">Ask the team</h3>
        <p className="mt-2 text-white/60">
          Have a question about how Beagine works? Ask below and we'll post the answer here for everyone.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
          <input
            id="name"
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF5F15] focus:outline-none focus:ring-1 focus:ring-[#FF5F15]"
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">Email (Private)</label>
          <input
            id="email"
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF5F15] focus:outline-none focus:ring-1 focus:ring-[#FF5F15]"
            placeholder="jane@example.com"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="question" className="text-sm font-medium text-white/80">Your Question</label>
          <textarea
            id="question"
            required
            rows={4}
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF5F15] focus:outline-none focus:ring-1 focus:ring-[#FF5F15]"
            placeholder="How exactly do I verify my trade skills?"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="mt-4 text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full bg-[#FF5F15] px-8 text-base font-semibold text-black transition-colors hover:bg-[#FF7335] disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Submitting..." : "Submit Question"}
      </button>
    </form>
  );
}
