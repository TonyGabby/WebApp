import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Play, Star, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { icon: Star, label: '4.9 Rating', sublabel: 'On App Store' },
  { icon: Download, label: '10K+ Downloads', sublabel: 'And growing' },
  { icon: CheckCircle, label: 'Verified by UNN', sublabel: 'Official partner' },
];

const floatingIcons = [
  { emoji: '📚', delay: 0 },
  { emoji: '💼', delay: 0.5 },
  { emoji: '🎉', delay: 1 },
  { emoji: '🗺️', delay: 1.5 },
  { emoji: '💬', delay: 2 },
  { emoji: '🎓', delay: 2.5 },
];

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.cta-button',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.cta-buttons',
            start: 'top 90%',
          },
        }
      );

      gsap.fromTo(
        '.trust-badge',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trust-badges',
            start: 'top 90%',
          },
        }
      );

      // Floating icons animation
      gsap.utils.toArray<HTMLElement>('.floating-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: floatingIcons[i]?.delay || 0,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D7A3A] via-[#1B4D24] to-[#2D7A3A]" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="floating-icon absolute text-4xl opacity-20"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 2) * 50}%`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-content text-center px-2 sm:px-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8">
            <span className="text-xl sm:text-2xl">🚀</span>
            <span className="text-white/90 text-xs sm:text-sm font-medium">Launching March 2024</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Transform Your{' '}
            <span className="text-[#FFD700]">Campus Experience?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-2 sm:px-0">
            Join 10,000+ UNN students already using CampusConnect. 
            Download now and unlock your campus potential.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button
              size="lg"
              className="cta-button bg-white text-gray-900 hover:bg-gray-100 px-5 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
            >
              <Apple className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-gray-500">Download on the</p>
                <p className="font-bold">App Store</p>
              </div>
            </Button>
            <Button
              size="lg"
              className="cta-button bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/30 px-5 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 fill-current group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-white/70">Get it on</p>
                <p className="font-bold">Google Play</p>
              </div>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges flex flex-wrap justify-center gap-4 sm:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="trust-badge flex items-center gap-2 sm:gap-3 text-white/90"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <badge.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">{badge.label}</p>
                  <p className="text-xs sm:text-sm text-white/60">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
