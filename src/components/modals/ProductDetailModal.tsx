import { X, MapPin, Star, Phone, Mail, Calendar, Heart, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  badge: string | null;
  description: string;
  condition: string;
  contact: string;
  phone: string;
  postedDate: string;
  views: number;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [liked, setLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {product.badge && (
            <Badge className={`absolute top-4 left-4 ${
              product.badge === 'Hot' ? 'bg-red-500' :
              product.badge === 'New' ? 'bg-green-500' :
              'bg-blue-500'
            } text-white`}>
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Price */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-[#2D7A3A]">₦{product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full transition-colors ${
                  liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-6">
            <div className="w-12 h-12 bg-[#2D7A3A] rounded-full flex items-center justify-center text-white font-bold">
              {product.seller.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">{product.seller}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{product.views} views</p>
              <p className="text-xs text-gray-400">Posted {product.postedDate}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Condition</p>
              <p className="font-semibold text-gray-900 dark:text-white">{product.condition}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="font-semibold text-gray-900 dark:text-white">{product.category}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{product.location}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Posted</p>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#2D7A3A]" />
                <span className="font-semibold text-gray-900 dark:text-white">{product.postedDate}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Contact Section */}
          {showContact ? (
            <div className="p-4 bg-[#2D7A3A]/10 rounded-xl mb-6">
              <h3 className="font-semibold text-[#2D7A3A] mb-3">Contact Seller</h3>
              <div className="space-y-2">
                <a href={`mailto:${product.contact}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#2D7A3A]">
                  <Mail className="w-4 h-4" />
                  {product.contact}
                </a>
                <a href={`tel:${product.phone}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#2D7A3A]">
                  <Phone className="w-4 h-4" />
                  {product.phone}
                </a>
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-[#2D7A3A] hover:bg-[#1B4D24] text-white py-6 rounded-xl"
              onClick={() => setShowContact(!showContact)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {showContact ? 'Hide Contact' : 'Contact Seller'}
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-xl border-[#2D7A3A] text-[#2D7A3A] hover:bg-[#2D7A3A] hover:text-white"
            >
              Make Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
