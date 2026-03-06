import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Chidi Okafor',
    role: 'Computer Science',
    year: 'Final Year',
    avatar: '/avatar-1.jpg',
    content: 'CampusConnect helped me sell my old textbooks and find a part-time dev job. Absolute game-changer! The marketplace feature is so easy to use, and I\'ve made great connections through the platform.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Amara Nwosu',
    role: 'Business Administration',
    year: '300 Level',
    avatar: '/avatar-2.jpg',
    content: 'I found my internship through the Career Hub. The process was seamless and the opportunity was perfect for my career goals. I highly recommend every student to use this platform.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emeka Ibrahim',
    role: 'Electrical Engineering',
    year: '400 Level',
    avatar: '/avatar-3.jpg',
    content: 'The campus map saved me during my first year. I never got lost finding my way to lectures! Now I use it to help freshers navigate the campus. It\'s an essential tool for every UNN student.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ngozi Adeyemi',
    role: 'Pharmacy',
    year: '500 Level',
    avatar: '/avatar-4.jpg',
    content: 'Made amazing friends through the social feed. It\'s like having the whole campus in your pocket. The events section keeps me updated on everything happening around UNN.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
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
        '.testimonial-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-card',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2D7A3A]/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-10 sm:mb-16 px-2 sm:px-0">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFD700]/20 text-[#FFA000] rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Quote className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Students{' '}
            <span className="text-gradient">Say</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Real stories from the UNN community about their experience with CampusConnect.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="testimonial-card relative bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-5 sm:p-8 lg:p-12 overflow-hidden">
            {/* Quote decoration */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-12 h-12 sm:w-20 sm:h-20 bg-[#2D7A3A]/10 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 sm:w-10 sm:h-10 text-[#2D7A3A]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 sm:mb-8 transition-opacity duration-500">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-[#2D7A3A]/20"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 bg-[#2D7A3A] rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] sm:text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].year}
                  </p>
                </div>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#2D7A3A]/5 to-transparent pointer-events-none" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:bg-[#2D7A3A] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 sm:w-8 bg-[#2D7A3A]'
                      : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:bg-[#2D7A3A] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
