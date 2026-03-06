import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particle animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-100, 100)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
          });
        });
      }

      // Title animation - word by word
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 50, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle typewriter effect
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 }
        );
      }

      // Buttons animation
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 1.5,
          }
        );
      }

      // Phone mockup animation
      if (phoneRef.current) {
        gsap.fromTo(
          phoneRef.current,
          { opacity: 0, x: 100, rotateY: 25 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.8,
          }
        );

        // Floating animation
        gsap.to(phoneRef.current, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-unn"
    >
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4CAF50]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-screen">
          {/* Content */}
          <div className="text-center lg:text-left pt-16 sm:pt-20 lg:pt-0 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 animate-fadeInUp">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700]" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">Proudly UNN - Launching Soon</span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6"
              style={{ perspective: '1000px' }}
            >
              <span className="word inline-block">Your</span>{' '}
              <span className="word inline-block">Campus</span>{' '}
              <span className="word inline-block">Life,</span>
              <br className="hidden sm:block" />
              <span className="word inline-block text-[#FFD700]">Simplified</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 px-2 sm:px-0"
            >
              The all-in-one platform for UNN students. Buy & sell, find jobs, 
              discover events, navigate campus, and connect with your community.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-[#2D7A3A] hover:bg-gray-100 px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group w-full sm:w-auto"
              >
                Explore Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 group w-full sm:w-auto"
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/avatar-${i}.jpg`}
                      alt=""
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#2D7A3A] object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm">10,000+ Students</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#FFD700] text-sm sm:text-base">★★★★★</span>
                <span className="text-xs sm:text-sm">4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div
            ref={phoneRef}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            style={{ perspective: '1000px' }}
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#4CAF50]/40 rounded-3xl blur-3xl scale-110" />
              
              {/* Phone image */}
              <img
                src="/hero-phone.jpg"
                alt="CampusConnect App"
                className="relative z-10 w-full rounded-2xl sm:rounded-3xl shadow-2xl"
              />

              {/* Floating elements - hidden on small mobile */}
              <div className="hidden sm:block absolute -top-4 -left-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl animate-float">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-base sm:text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">Item Sold!</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Textbooks - ₦5,000</p>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-base sm:text-lg">💼</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">New Job!</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Web Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FAFAFA"
          />
        </svg>
      </div>
    </section>
  );
}
