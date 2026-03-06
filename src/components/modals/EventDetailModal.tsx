import { X, Calendar, Clock, MapPin, Users, Ticket, Heart, Share2, ExternalLink, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [liked, setLiked] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!isOpen || !event) return null;

  const handleRegister = () => {
    window.open(event.registrationLink, '_blank');
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header Image */}
        <div className="relative h-56 sm:h-72">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 mb-2">
              <Badge className="bg-[#2D7A3A] text-white">{event.category}</Badge>
              {event.featured && (
                <Badge className="bg-[#FFD700] text-gray-900">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{event.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Organizer */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2D7A3A] rounded-full flex items-center justify-center text-white font-bold">
                {event.organizer.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{event.organizer}</p>
                <p className="text-sm text-gray-500">Event Organizer</p>
              </div>
            </div>
            <a
              href={`mailto:${event.organizerContact}`}
              className="text-[#2D7A3A] hover:underline text-sm"
            >
              Contact
            </a>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{event.date}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{event.time}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{event.location}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Attendees</p>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{event.attendees} going</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-[#2D7A3A]/10 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ticket Price</p>
                <p className={`text-2xl font-bold ${event.price === 'Free' ? 'text-green-600' : 'text-[#2D7A3A]'}`}>
                  {event.price}
                </p>
              </div>
              <Ticket className="w-10 h-10 text-[#2D7A3A]" />
            </div>
          </div>

          {/* Speakers (if any) */}
          {event.speakers.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Speakers</h3>
              <div className="flex flex-wrap gap-3">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full">
                    <User className="w-4 h-4 text-[#2D7A3A]" />
                    <span className="text-sm font-medium">{speaker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About This Event</h3>
            <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {event.fullDescription}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className={`flex-1 py-6 rounded-xl ${
                registered
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#2D7A3A] hover:bg-[#1B4D24]'
              } text-white`}
              onClick={handleRegister}
              disabled={registered}
            >
              {registered ? (
                <>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Registration Opened
                </>
              ) : (
                <>
                  <Ticket className="w-5 h-5 mr-2" />
                  Get Tickets
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className={`px-6 rounded-xl ${liked ? 'border-red-500 text-red-500' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" className="px-6 rounded-xl">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
