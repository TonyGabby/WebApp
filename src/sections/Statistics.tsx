import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShoppingBag, Briefcase, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Active Students' },
  { icon: ShoppingBag, value: 5000, suffix: '+', label: 'Items Sold' },
  { icon: Briefcase, value: 1000, suffix: '+', label: 'Jobs Posted' },
  { icon: Calendar, value: 500, suffix: '+', label: 'Events Hosted' },
];

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-content',
        { opacity: 0, y: 40 },
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
        '.stat-item',
        { opacity: 0, y: 30, rotateZ: -5 },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-unn relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="stats-content text-center lg:text-left px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Making an Impact on{' '}
              <span className="text-[#FFD700]">Campus</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
              Join thousands of UNN students already using CampusConnect to buy, sell, 
              find jobs, discover events, and connect with their community.
            </p>
            <button className="bg-white text-[#2D7A3A] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors hover:scale-105 transform duration-300 text-sm sm:text-base">
              Join the Community
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/80 text-xs sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
