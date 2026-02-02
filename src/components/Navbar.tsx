'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md border-b border-gray-200' 
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4 max-w-7xl">
        <a 
          href="#home" 
          className="text-xl font-bold transition-colors duration-300 text-gray-900"
        >
          Nandhana
        </a>
        
        <div className="flex space-x-8">
          {navLinks.map(link => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 group ${
                  isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transform origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
