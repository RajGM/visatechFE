'use client';
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function StatusCard({ title, subtitle, completed, completedSections, actionLabel }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-card p-6 w-64 shrink-0"
    >
      <div className="flex items-center gap-2 mb-4">
        {completed && <CheckCircle size={18} className="text-primary-600" />}
        <h4 className="font-semibold leading-tight">{title}</h4>
      </div>
      {subtitle && <p className="text-sm text-gray-600 flex-1 mb-4">{subtitle}</p>}

      {completedSections && (
        <p className="text-sm text-gray-500 mb-4">Completed sections <strong>{completedSections}</strong></p>
      )}

      <button className="border border-primary-600 text-primary-600 rounded-2xl font-medium py-2 mt-auto hover:bg-primary-50 transition-all">
        {actionLabel}
      </button>
    </motion.div>
  );
}
