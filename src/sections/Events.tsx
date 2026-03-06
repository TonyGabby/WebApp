import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock, Users, Heart, Share2, ChevronRight, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const eventCategories = ['All', 'Hackathons', 'Workshops', 'Concerts', 'Sports', 'Academic'];

interface Event {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  price: string;
  featured: boolean;
  organizer: string;
  organizerContact: string;
  registrationLink: string;
  speakers: string[];
}

interface EventsProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const upcomingEvents = [
  { date: '15', month: 'MAR', title: 'DevFest Hackathon', type: 'Tech' },
  { date: '18', month: 'MAR', title: 'Faculty Debate', type: 'Academic' },
  { date: '22', month: 'MAR', title: 'Sports Festival', type: 'Sports' },
  { date: '25', month: 'MAR', title: 'Lion\'s Night', type: 'Entertainment' },
];

export default function Events({ events, onEventClick }: EventsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.events-header',
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
        '.event-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.calendar-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.calendar-section',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="events-header text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Event Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Discover Campus{' '}
            <span className="text-gradient">Life</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            From hackathons to concerts, never miss what matters to you. 
            Explore events happening around UNN campus.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {eventCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#2D7A3A] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Events Grid */}
          <div className="lg:col-span-2 events-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`event-card group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl sm:hover:shadow-2xl cursor-pointer ${
                  event.featured ? 'border-[#FFD700] shadow-md sm:shadow-lg sm:col-span-2' : 'border-gray-100 dark:border-gray-700'
                }`}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2">
                    <Badge className="bg-[#2D7A3A] text-white text-xs">
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-[#FFD700] text-gray-900 text-xs">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2">
                    <button
                      onClick={(e) => toggleLike(e, event.id)}
                      className="w-7 h-7 sm:w-9 sm:h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors ${
                          likedEvents.includes(event.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="hidden sm:flex w-9 h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-[#FFD700] transition-colors line-clamp-1 sm:line-clamp-none">
                      {event.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">{event.organizer}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5">
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D7A3A]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D7A3A]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D7A3A]" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{event.attendees}</span>
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold ${
                        event.price === 'Free' ? 'text-green-600' : 'text-[#2D7A3A]'
                      }`}>
                        {event.price}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#2D7A3A] hover:bg-[#1B4D24] text-white rounded-lg text-xs sm:text-sm px-2.5 sm:px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Calendar & Upcoming */}
          <div className="calendar-section space-y-4 sm:space-y-6">
            {/* Mini Calendar */}
            <div className="calendar-card bg-gradient-unn rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                This Month
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="p-1.5 sm:p-2 text-white/60 font-medium">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                  const isEvent = [10, 15, 17, 18, 22, 25].includes(date);
                  const isToday = date === 5;
                  return (
                    <div
                      key={date}
                      className={`p-1.5 sm:p-2 rounded-lg text-xs sm:text-sm cursor-pointer transition-colors ${
                        isToday
                          ? 'bg-white text-[#2D7A3A] font-bold'
                          : isEvent
                          ? 'bg-[#FFD700] text-gray-900 font-medium'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="calendar-card bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Upcoming Events</h3>
              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map((evt, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                  >
                    <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#2D7A3A]/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-[#2D7A3A] transition-colors">
                      <span className="text-sm sm:text-lg font-bold text-[#2D7A3A] group-hover:text-white">{evt.date}</span>
                      <span className="text-[10px] sm:text-xs text-[#2D7A3A] group-hover:text-white/80">{evt.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#2D7A3A] transition-colors text-sm sm:text-base truncate">
                        {evt.title}
                      </h4>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{evt.type}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#2D7A3A] transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Host Event CTA */}
            <div className="calendar-card bg-[#FFD700]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#FFD700]/30">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Host an Event?</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Promote your event to thousands of UNN students.
              </p>
              <Button className="w-full bg-[#FFD700] hover:bg-[#FFA000] text-gray-900 rounded-xl text-xs sm:text-sm">
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
