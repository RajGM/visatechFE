// =============================================
// Project: German Visa Portal UI (Replica) — *Auth‑aware version*
// Type: code/react (JavaScript only)
//  🔄 This revision updates **components/AppointmentPanel.tsx** so that:
//      • Clicking **“Submit Application for Review”** calls `uploadData(...)`
//      • State flips to *under review* ➜ button disabled + styling changes
//      • Panel text adapts once review starts
// =============================================

/* =================================================================================
 * 0️⃣  Shared utilities / context imports remain unchanged …
 *     (Only the AppointmentPanel component is modified below.)
 =================================================================================*/

// components/AppointmentPanel.tsx
"use client";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@lib/context";
import { uploadFileToFirebase, fetchData, uploadData } from "@lib/firebaseUtil"; // adjust the import path as needed

/**
 * Props (optional):
 *   ─ passportURL, admissionURL → download URLs after initial upload
 *   ─ initialReview             → boolean; if true, panel loads in under‑review state
 */
export function AppointmentPanel({ passportURL, admissionURL, initialReview = false }) {
  const { user } = useContext(UserContext);
  const [underReview, setUnderReview] = useState(initialReview);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null)
  const [disabled, setDisabled] = useState(false);

    useEffect(() => {
      if (!user) return
  
      const load = async () => {
        try {
          const data = await fetchData(user.email)
          console.log('Fetched data:', data)
          setUserData(data)
          if (data) {
            setDisabled(true)
          }
        } catch (err) {
          console.error('Error fetching data:', err)
        } finally {
          setLoading(false)
        }
      }
  
      load()
    }, [user])

  // ── Firestore write ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!user || underReview) return;
    try {
      setLoading(true);
      setError(null);
      await updateData(user.email, 'review'); // Update status to 'review'
      setUnderReview(true);
    } catch (err) {
      console.error("Error submitting for review:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log('User data:', userData)
  console.log('User status:', status)
  console.log('User disabled:', disabled)


  return (
    <motion.section
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-96 max-w-full border-r border-gray-200 overflow-y-auto"
    >
      <div className="p-8 space-y-6">
        <h2 className="text-lg font-semibold leading-snug">
          {underReview
            ? "Your application is under review."
            : "Start the application by submitting the required documents."}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Please use the checklist to prepare for the {underReview ? "appointment" : "document submission"}. During the
          {underReview ? "appointment, your biometric data will be captured." : "preliminary review, your documents will be checked with the institutions."}
        </p>
        <div className="flex items-start gap-2 text-xs text-gray-700">
          <span>⚠️</span>
          <p>You must bring original documents with you.</p>
        </div>

        {/* ── Action buttons ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`w-full rounded-2xl font-medium py-2 shadow-md transition-all
              ${disabled ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-primary-600 text-primary-600 hover:bg-primary-50'}`}
          >
            {underReview ? "Under Review" : loading ? "Submitting…" : "Submit Application for Review"}
          </button>

          <button className="w-full border border-primary-600 text-primary-600 font-medium py-2 rounded-2xl shadow-sm hover:bg-primary-50 transition-all">
            CHECKLIST
          </button>

          <button className="w-full border border-gray-400 text-gray-700 font-medium py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition-all">
            WITHDRAW APPLICATION
          </button>
        </div>

        {error && <p className="text-sm text-red-600 pt-2">{error}</p>}

        {/* ── Overview box ──────────────────────────────────────────────── */}
        <hr className="border-dashed mt-8" />
        <div>
          <h3 className="text-sm font-medium mb-2">Overview of your visa application</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <ArrowRightCircle size={18} className="mt-0.5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Submit documents</p>
                <p>
                  First, fill out the questionnaire (if applicable) and the application form
                  (VIDEX) completely and upload the required documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* =================================================================================
 *  📌  All other files in the project remain unchanged.
 =================================================================================*/
