'use client';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@lib/context"; // assumes you have exported UserContext
import { TopNav } from "@components/TopNav";
import { SideNav } from "@components/SideNav";
import { AppointmentPanel } from "@components/AppointmentPanel";
import { StatusCard } from "@components/StatusCard";
import { FooterNav } from "@components/FooterNav";
import SignInLanding from "@components/SignInLanding";
import { X, CheckCircle } from "lucide-react";

import { uploadFileToFirebase, fetchData, uploadData } from "@lib/firebaseUtil"; // adjust the import path as needed

function UploadDocumentsModal({ open, onClose, user }) {

  const [passportFile, setPassportFile] = useState(null)
  const [admissionFile, setAdmissionFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!open) return null

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    if (!passportFile || !admissionFile) {
      setError('Please select both files.')
      return
    }

    try {
      setLoading(true)


      /* ⬇️  PARALLEL UPLOAD  ⬇️ */
      const [passportURL, admissionURL] = await Promise.all([
        uploadFileToFirebase(passportFile, `users/${user.email}/${passportFile.name}`),
        uploadFileToFirebase(admissionFile, `users/${user.email}/${admissionFile.name}`),
      ])

      // Persist URLs in Firestore
      console.log('Uploaded files:', { passportURL, admissionURL })

      const data = uploadData({
        emailId: user.email,
        passportURL,
        admissionURL,
        passportStatus: 'uploaded',
        admissionStatus: 'uploaded',
        status: 'uploaded'
      })

      //status:'uploaded' 'review' 'noreach' 'approved' 'rejected'

      /* TODO:
         • Save the download URLs in Firestore or local state here.
         • notify user / toast etc.
      */
      console.log({ passportURL, admissionURL })
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-card w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary-600"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-6">Upload required documents</h3>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="passport" className="block text-sm font-medium text-gray-700">
              Passport scan (PDF)
            </label>
            <input
              id="passport"
              type="file"
              accept="application/pdf"
              onChange={e => setPassportFile(e.target.files[0])}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:border-0 file:bg-primary-600 file:text-white file:py-2 file:px-4 hover:file:bg-primary-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="admission" className="block text-sm font-medium text-gray-700">
              University admission letter (PDF)
            </label>
            <input
              id="admission"
              type="file"
              accept="application/pdf"
              onChange={e => setAdmissionFile(e.target.files[0])}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:border-0 file:bg-primary-600 file:text-white file:py-2 file:px-4 hover:file:bg-primary-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-2xl transition-all disabled:opacity-50"
          >
            {loading ? 'Uploading…' : 'Save uploads'}
          </button>
        </form>
      </div>
    </div>
  )

}

export default function Home() {
  const { user } = useContext(UserContext);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  // Fetch user‑specific data once authenticated
  useEffect(() => {
    if (!user) return

    const load = async () => {
      try {
        const data = await fetchData(user.email)
        console.log('Fetched data:', data)
        setUserData(data)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [user])

  // ── Public sign‑in splash ────────────────────────────────────────────────
  if (!user) return <SignInLanding />

  // ── Loading state while Firestore fetch completes ───────────────────────
  if (loading) return <div className="flex h-screen items-center justify-center">Loading…</div>

  const status = userData?.status || '' // expected values: 'uploaded', 'under_review', etc.
  const disabled = false; //( (status !== 'uploaded' && status !== undefined)? true: false)

  // ── Authenticated dashboard (original UI) ─────────────────────────────────
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <main className="flex flex-1 overflow-hidden">
        <SideNav />
        <AppointmentPanel />
        <section className="flex-1 overflow-x-auto overflow-y-hidden py-10 px-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-8 max-w-4xl">
            Visa to study with conditional/unconditional admission to a university or with unconditional admission to a preparatory college
          </h2>
          <div className="flex gap-6">
            <StatusCard title="Your entry form" subtitle="Requirements fulfilled" completed actionLabel="VIEW FORM" />
            <StatusCard title="Your application (VIDEX)" completedSections="6 / 6" completed actionLabel="VIEW APPLICATION" />
            {/* Documents card — opens modal on click */}

            {/* Replicated card so only the button opens modal */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-card p-6 w-64 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={18} className="text-primary-600" />
                <h4 className="font-semibold leading-tight">Your documents</h4>
              </div>
              <p className="text-sm text-gray-600 flex-1 mb-4">Document pdf</p>
              <button
                onClick={() => !disabled && setShowUploadModal(true)}
                disabled={disabled}
                className={`border rounded-2xl font-medium py-2 mt-auto transition-all
                  ${disabled ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-primary-600 text-primary-600 hover:bg-primary-50'}`}
              >
                {disabled ? 'Uploaded' : 'Upload documents'}
              </button>
            </div>

          </div>
        </section>
      </main>
      <FooterNav />
      {/* Modal mount */}
      <UploadDocumentsModal open={showUploadModal} onClose={() => setShowUploadModal(false)} user={user} />
    </div>
  );
}
