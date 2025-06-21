'use client';
export function FooterNav() {
  return (
    <footer className="mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-sm flex flex-wrap gap-4 justify-center text-gray-600">
        <a href="#" className="hover:text-primary-600">Imprint</a>
        <a href="#" className="hover:text-primary-600">Privacy Policy</a>
        <a href="#" className="hover:text-primary-600">Sitemap</a>
        <a href="#" className="hover:text-primary-600">Privacy Settings</a>
      </div>
    </footer>
  );
}