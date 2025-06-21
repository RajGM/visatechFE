import { auth, googleAuthProvider, signInWithPopup } from '@lib/firebase';

export function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button
      className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
      onClick={signInWithGoogle}
    >
      <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

      <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
        Sign in with Google
      </span>
    </button>
  );
}
