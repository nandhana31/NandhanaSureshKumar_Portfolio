export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            © {new Date().getFullYear()} Nandhana Suresh Kumar
          </p>
        </div>
      </footer>
    );
  }
  