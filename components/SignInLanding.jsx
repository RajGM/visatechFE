'use client';
import { ArrowLeft, CheckCircle, Eye } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { SignInButton } from "@components/signinButton";
import { SignOutButton } from "@components/signoutButton";

export default function SignInLanding(){
  const benefits=[
    "Online application for administrative services from the Federal Foreign Office",
    "Secure and convenient data transfer",
    "View processing status at any time",
  ];

  return(
    <div className="flex min-h-screen">
      {/* Left benefits column */}
      <aside className="hidden lg:block w-1/3 bg-gray-100 px-16 py-24">
        <button className="flex items-center gap-2 text-sm text-primary-600 mb-12"><ArrowLeft size={16}/> BACK</button>
        <h1 className="text-4xl font-semibold mb-10">Sign‑in</h1>
        <h2 className="text-lg font-medium mb-6">Your benefits</h2>
        <ul className="space-y-8 text-gray-700">
          {benefits.map((b)=> (
            <li key={b} className="flex items-start gap-4">
              <CheckCircle size={20} className="text-primary-600 mt-1"/>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right sign‑in card */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <p className="text-gray-700 leading-relaxed">
            Please sign in with your authorized provider account. After three unsuccessful attempts your access will be blocked for two hours.
          </p>

          {/* Email & password fields replaced with single sign‑in */}
          <SignInButton className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-2xl transition-all"/>

          <p className="text-sm text-center text-gray-700 pt-8">
            You are not registered already? Please choose a&nbsp;
            <a href="#" className="text-primary-600 underline">Service</a>
            &nbsp;first
          </p>
        </div>
      </section>
    </div>
  );
}
