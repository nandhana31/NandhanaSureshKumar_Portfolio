import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nandhana Suresh Kumar | Portfolio',
  description: 'Professional Software Developer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
