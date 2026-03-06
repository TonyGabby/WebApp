import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, UserPlus, Compass, MessageCircle, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Download the App',
    description: 'Get CampusConnect from App Store or Play Store. It\'s free and takes less than a minute to install.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up with your UNN student email and verify your account. Add your profile picture and bio.',
    color: 'from-green-500 to-green-600',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Explore Features',
    description: 'Discover marketplace, jobs, events, campus map, and social feed. Everything you need in one place.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '04',
    icon: MessageCircle,
    title: 'Connect & Engage',
    description: 'Start buying, selling, networking, and exploring. Join thousands of UNN students on CampusConnect.',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.how-header',
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

      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      // Steps animation
      gsap.fromTo(
        '.step-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.steps-container',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D7A3A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="how-header text-center mb-10 sm:mb-16 px-2 sm:px-0">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get Started in{' '}
            <span className="text-gradient">Minutes</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Four simple steps to unlock your complete campus experience with CampusConnect.
          </p>
        </div>

        {/* Steps */}
        <div className="steps-container relative">
          {/* Connection Line (Desktop) */}
          <svg
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 0 10 Q 150 10, 300 10 T 600 10 T 900 10 T 1200 10"
              fill="none"
              stroke="#2D7A3A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card relative"
              >
                {/* Connector dot */}
                <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2D7A3A] rounded-full border-4 border-white shadow-lg z-10" />

                <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 group">
                  {/* Number badge */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-bold text-sm sm:text-base">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#2D7A3A]/10 transition-colors">
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#2D7A3A]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#2D7A3A] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-10 sm:mt-16 text-center px-2 sm:px-0">
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Ready to get started?</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button className="flex items-center gap-2 sm:gap-3 bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-gray-400">Download on the</p>
                <p className="font-semibold text-sm sm:text-base">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-2 sm:gap-3 bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-gray-400">Get it on</p>
                <p className="font-semibold text-sm sm:text-base">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
