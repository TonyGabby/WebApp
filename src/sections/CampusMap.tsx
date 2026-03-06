import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Search, Navigation, Layers, LocateFixed, Building2, Coffee, BookOpen, Stethoscope, Utensils, Home, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const mapCategories = [
  { name: 'All', icon: Layers },
  { name: 'Faculties', icon: GraduationCap },
  { name: 'Hostels', icon: Home },
  { name: 'Food', icon: Utensils },
  { name: 'Study', icon: BookOpen },
  { name: 'Health', icon: Stethoscope },
  { name: 'Shops', icon: Coffee },
];

const campusLocations = [
  {
    id: 1,
    name: 'Nnamdi Azikiwe Library',
    category: 'Study',
    icon: BookOpen,
    coordinates: { x: 45, y: 35 },
    description: 'Main university library with 24/7 reading rooms',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: 'Faculty of Engineering',
    category: 'Faculties',
    icon: Building2,
    coordinates: { x: 65, y: 25 },
    description: 'Home to the School of Engineering',
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 3,
    name: 'Bello Hostel',
    category: 'Hostels',
    icon: Home,
    coordinates: { x: 25, y: 55 },
    description: 'Male student hostel accommodation',
    rating: 4.2,
    reviews: 312,
  },
  {
    id: 4,
    name: 'Student Union Building',
    category: 'Faculties',
    icon: Building2,
    coordinates: { x: 50, y: 50 },
    description: 'SUG offices and meeting halls',
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 5,
    name: 'University Health Centre',
    category: 'Health',
    icon: Stethoscope,
    coordinates: { x: 35, y: 40 },
    description: 'Medical services for students and staff',
    rating: 4.3,
    reviews: 98,
  },
  {
    id: 6,
    name: 'School Cafeteria',
    category: 'Food',
    icon: Utensils,
    coordinates: { x: 55, y: 45 },
    description: 'Main campus dining facility',
    rating: 4.0,
    reviews: 445,
  },
  {
    id: 7,
    name: 'ICT Innovation Centre',
    category: 'Study',
    icon: BookOpen,
    coordinates: { x: 70, y: 40 },
    description: 'Technology hub and computer labs',
    rating: 4.7,
    reviews: 167,
  },
  {
    id: 8,
    name: 'Akpabio Hostel',
    category: 'Hostels',
    icon: Home,
    coordinates: { x: 30, y: 60 },
    description: 'Female student hostel accommodation',
    rating: 4.4,
    reviews: 278,
  },
];

const popularRoutes = [
  { from: 'Main Gate', to: 'Library', time: '5 min' },
  { from: 'Library', to: 'Engineering', time: '3 min' },
  { from: 'Hostels', to: 'Cafeteria', time: '4 min' },
];

export default function CampusMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState<typeof campusLocations[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.map-header',
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
        '.map-container',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.map-container',
            start: 'top 85%',
          },
        }
      );

      // Animate map pins
      gsap.fromTo(
        '.map-pin',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.map-area',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredLocations = activeCategory === 'All'
    ? campusLocations
    : campusLocations.filter(l => l.category === activeCategory);

  const searchedLocations = searchQuery
    ? campusLocations.filter(l => 
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredLocations;

  return (
    <section
      id="map"
      ref={sectionRef}
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="map-header text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Campus Navigator
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Navigate UNN Like a{' '}
            <span className="text-gradient">Pro</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Interactive map with real-time directions to every building, hostel, 
            and facility on the Nsukka campus.
          </p>
        </div>

        {/* Map Container */}
        <div className="map-container bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Map Toolbar */}
          <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[140px] sm:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2 rounded-xl border-gray-200 focus:border-[#2D7A3A] focus:ring-[#2D7A3A] text-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
              {mapCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.name
                      ? 'bg-[#2D7A3A] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="icon" className="rounded-xl w-8 h-8 sm:w-10 sm:h-10">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl w-8 h-8 sm:w-10 sm:h-10">
                <LocateFixed className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4">
            {/* Map Area */}
            <div className="lg:col-span-3 relative h-[350px] sm:h-[400px] lg:h-[600px] bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden map-area">
              {/* Campus Map Background */}
              <div className="absolute inset-0">
                {/* Roads */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Main roads */}
                  <path d="M0 50 L100 50" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M50 0 L50 100" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M0 25 L100 25" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                  <path d="M0 75 L100 75" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                  <path d="M25 0 L25 100" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                  <path d="M75 0 L75 100" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
                </svg>

                {/* Green spaces */}
                <div className="absolute top-[10%] left-[10%] w-[20%] h-[15%] bg-green-200/50 rounded-2xl" />
                <div className="absolute top-[60%] right-[15%] w-[25%] h-[20%] bg-green-200/50 rounded-2xl" />
                <div className="absolute bottom-[15%] left-[20%] w-[15%] h-[15%] bg-green-200/50 rounded-2xl" />

                {/* Buildings */}
                <div className="absolute top-[30%] left-[40%] w-[12%] h-[10%] bg-gray-300/70 rounded-lg" />
                <div className="absolute top-[20%] left-[60%] w-[15%] h-[12%] bg-gray-300/70 rounded-lg" />
                <div className="absolute top-[50%] left-[20%] w-[10%] h-[15%] bg-gray-300/70 rounded-lg" />
              </div>

              {/* Location Pins */}
              {searchedLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`map-pin absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedLocation?.id === location.id ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                >
                  <div className={`relative ${
                    selectedLocation?.id === location.id 
                      ? 'animate-bounce' 
                      : ''
                  }`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                      selectedLocation?.id === location.id
                        ? 'bg-[#2D7A3A] text-white'
                        : 'bg-white text-[#2D7A3A] hover:bg-[#2D7A3A] hover:text-white'
                    }`}>
                      <location.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current text-inherit" 
                      style={{ color: selectedLocation?.id === location.id ? '#2D7A3A' : 'white' }} />
                  </div>
                </button>
              ))}

              {/* Current Location Indicator */}
              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8">
                <div className="relative">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 border-white relative" />
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="bg-white shadow-lg hover:bg-gray-50 w-8 h-8 sm:w-10 sm:h-10">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 bg-white border-t lg:border-t-0 lg:border-l border-gray-100 p-3 sm:p-4 overflow-y-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[600px]">
              {selectedLocation ? (
                <div className="space-y-3 sm:space-y-4">
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs sm:text-sm text-gray-500 hover:text-[#2D7A3A] transition-colors"
                  >
                    ← Back to list
                  </button>
                  
                  <div className="bg-gradient-unn rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                      <selectedLocation.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">{selectedLocation.name}</h3>
                    <p className="text-white/80 text-xs sm:text-sm">{selectedLocation.description}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 text-xs sm:text-sm">Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[#FFD700]">★</span>
                        <span className="font-semibold text-sm">{selectedLocation.rating}</span>
                        <span className="text-gray-400 text-xs">({selectedLocation.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 text-xs sm:text-sm">Category</span>
                      <span className="font-medium text-sm">{selectedLocation.category}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#2D7A3A] hover:bg-[#1B4D24] text-white rounded-xl text-xs sm:text-sm">
                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Get Directions
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Popular Locations</h3>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    {searchedLocations.slice(0, 6).map((location) => (
                      <button
                        key={location.id}
                        onClick={() => setSelectedLocation(location)}
                        className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2D7A3A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <location.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D7A3A]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate text-xs sm:text-sm">{location.name}</h4>
                          <p className="text-[10px] sm:text-sm text-gray-500">{location.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Popular Routes</h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {popularRoutes.map((route, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-[#2D7A3A]" />
                            <span className="text-xs sm:text-sm">{route.from} → {route.to}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">{route.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
