import { useState } from 'react';
import { 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  features: [
    { name: 'Marketplace', href: '#marketplace' },
    { name: 'Career Hub', href: '#jobs' },
    { name: 'Events', href: '#events' },
    { name: 'Campus Map', href: '#map' },
    { name: 'Social Feed', href: '#social' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#1B4D24] to-[#0D2612] text-white relative overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#1B4D24"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2D7A3A] to-[#4CAF50] rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-xl">UNN</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold">CampusConnect</span>
                <p className="text-white/60 text-xs sm:text-sm">Your Campus, Connected.</p>
              </div>
            </div>
            
            <p className="text-white/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base">
              The ultimate digital ecosystem for UNN students. Connecting commerce, 
              careers, community, and campus life in one powerful platform.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CAF50]" />
                <span>University of Nigeria, Nsukka</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CAF50]" />
                <span>+234 800 CAMPUS-CONNECT</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CAF50]" />
                <span className="truncate">hello@campusconnect.unn.edu.ng</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4CAF50] transition-colors group"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Features</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#4CAF50] transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-[#4CAF50] group-hover:w-3 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#4CAF50] transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-[#4CAF50] group-hover:w-3 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#4CAF50] transition-colors inline-flex items-center gap-2 group text-sm"
                  >
                    <span className="w-0 h-0.5 bg-[#4CAF50] group-hover:w-3 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Stay Updated</h4>
              <p className="text-white/60 text-sm">Get the latest news and updates from CampusConnect.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-4 py-2.5 sm:py-3 rounded-xl focus:border-[#4CAF50] focus:ring-[#4CAF50] text-sm"
                />
              </div>
              <Button
                type="submit"
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-all text-sm ${
                  subscribed
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-[#4CAF50] hover:bg-[#2D7A3A]'
                }`}
              >
                {subscribed ? (
                  <>
                    <span className="mr-1 sm:mr-2">✓</span>
                    <span className="hidden sm:inline">Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
            © 2024 CampusConnect. All rights reserved.
          </p>
          <p className="text-white/60 text-xs sm:text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" /> for UNN Students
          </p>
        </div>
      </div>
    </footer>
  );
}
