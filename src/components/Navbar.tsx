export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-xl font-bold">Nandhana</a>
        <div className="flex space-x-6">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
