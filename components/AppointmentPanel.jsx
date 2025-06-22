// components/AppointmentPanel.tsx
"use client";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

export function AppointmentPanel() {
  return (
    <motion.section
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-96 max-w-full border-r border-gray-200 overflow-y-auto"
    >
      {false ? (
        <div className="p-8 space-y-6">
          <h2 className="text-lg font-semibold leading-snug">
            Please make an appointment at the German mission.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please use the checklist to prepare for the appointment. During the
            appointment, your biometric data (fingerprints and photo) will be
            captured.
          </p>
          <div className="flex items-start gap-2 text-xs text-gray-700">
            <span>⚠️</span>
            <p>You must bring original documents with you.</p>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-2xl shadow-md transition-all">
              MAKE AN APPOINTMENT
            </button>
            <button className="w-full border border-primary-600 text-primary-600 font-medium py-2 rounded-2xl shadow-sm hover:bg-primary-50 transition-all">
              CHECKLIST
            </button>
            <button className="w-full border border-gray-400 text-gray-700 font-medium py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition-all">
              WITHDRAW APPLICATION
            </button>
          </div>

          <hr className="border-dashed" />

          <div>
            <h3 className="text-sm font-medium mb-2">
              Overview of your visa application
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <ArrowRightCircle
                  size={18}
                  className="mt-0.5 text-primary-600"
                />
                <div>
                  <p className="font-medium text-gray-900">Submit documents</p>
                  <p>
                    First, fill out the questionnaire (if applicable) and the
                    application form (VIDEX) completely and upload the required
                    documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 space-y-6">
          <h2 className="text-lg font-semibold leading-snug">
            Start the application by submitting the required documents.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please use the checklist to prepare for the document submission. During the
            preliminary review, your documents will be
            check with the instituions.
          </p>
          <div className="flex items-start gap-2 text-xs text-gray-700">
            <span>⚠️</span>
            <p>You must bring original documents with you.</p>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-2xl shadow-md transition-all">
              Submit Application for Review
            </button>
            <button className="w-full border border-primary-600 text-primary-600 font-medium py-2 rounded-2xl shadow-sm hover:bg-primary-50 transition-all">
              CHECKLIST
            </button>
            <button className="w-full border border-gray-400 text-gray-700 font-medium py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition-all">
              WITHDRAW APPLICATION
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}
