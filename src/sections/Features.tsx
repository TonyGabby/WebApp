import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Briefcase, Calendar, MapPin, MessageCircle, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ShoppingBag,
    title: 'Campus Marketplace',
    description: 'Buy and sell textbooks, gadgets, and more from verified student sellers.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Briefcase,
    title: 'Career Hub',
    description: 'Discover internships, part-time jobs, and freelance opportunities.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Calendar,
    title: 'Event Explorer',
    description: 'Never miss hackathons, workshops, concerts, and campus events.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: MapPin,
    title: 'Campus Navigator',
    description: 'Find your way around UNN with our interactive campus map.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: MessageCircle,
    title: 'Social Connect',
    description: 'Share updates, join discussions, and build your campus network.',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Bell,
    title: 'Announcements',
    description: 'Get real-time notifications about campus news and deadlines.',
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-50',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.features-title',
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D7A3A]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 features-title px-2 sm:px-0">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2D7A3A]/10 text-[#2D7A3A] rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Our Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Everything You Need,{' '}
            <span className="text-gradient">One Platform</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Five powerful features designed specifically for UNN students to make campus life easier.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => {
                // Only apply 3D tilt on larger screens
                if (window.innerWidth >= 768) {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
              }}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-11 h-11 sm:w-14 sm:h-14 ${feature.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-5 h-5 sm:w-7 sm:h-7 text-[#2D7A3A]`} />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#2D7A3A] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-4 sm:mt-6 flex items-center text-[#2D7A3A] font-medium opacity-100 sm:opacity-0 group-hover:opacity-100 transform translate-x-0 sm:translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-xs sm:text-sm">Learn more</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
