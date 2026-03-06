import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Briefcase, Calendar, MapPin, MessageCircle, Home, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#hero', icon: Home },
  { name: 'Marketplace', href: '#marketplace', icon: ShoppingBag },
  { name: 'Jobs', href: '#jobs', icon: Briefcase },
  { name: 'Events', href: '#events', icon: Calendar },
  { name: 'Map', href: '#map', icon: MapPin },
  { name: 'Social', href: '#social', icon: MessageCircle },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'glass dark:bg-gray-900/85 dark:backdrop-blur-xl py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <img 
              src="/logo.png" 
              alt="CampusConnect" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className={`font-bold text-base sm:text-lg transition-colors ${
              isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              Campus<span className="text-[#2D7A3A]">Connect</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-[#2D7A3A] dark:hover:text-[#4CAF50]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#2D7A3A] transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button */}
            <Button
              className="hidden sm:flex bg-[#2D7A3A] hover:bg-[#1B4D24] text-white px-4 sm:px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass dark:bg-gray-900/95 dark:backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-[#2D7A3A]/10 hover:text-[#2D7A3A] dark:hover:text-[#4CAF50] transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
          <div className="pt-4">
            <Button className="w-full bg-[#2D7A3A] hover:bg-[#1B4D24] text-white py-3 rounded-xl font-medium">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
