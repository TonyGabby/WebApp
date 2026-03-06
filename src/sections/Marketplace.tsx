import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, Heart, ShoppingBag, Star, MapPin, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Textbooks', 'Electronics', 'Fashion', 'Services', 'Hostel Items'];

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

interface MarketplaceProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function Marketplace({ products, onProductClick }: MarketplaceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.marketplace-header',
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
        '.product-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const searchedProducts = searchQuery
    ? filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  return (
    <section
      id="marketplace"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="marketplace-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="px-2 sm:px-0">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2D7A3A]/10 text-[#2D7A3A] rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Campus Marketplace
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Buy & Sell on{' '}
              <span className="text-gradient">Campus</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              From textbooks to gadgets, find everything you need from fellow UNN students. 
              Safe transactions with verified sellers.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#2D7A3A] focus:ring-[#2D7A3A] text-sm sm:text-base dark:bg-gray-800 dark:text-white"
              />
            </div>
            <Button variant="outline" className="px-3 sm:px-4 rounded-xl dark:border-gray-700 dark:text-gray-300">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {categories.map((category) => (
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

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {searchedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="product-card group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.badge && (
                  <Badge className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-xs ${
                    product.badge === 'Hot' ? 'bg-red-500' :
                    product.badge === 'New' ? 'bg-green-500' :
                    'bg-blue-500'
                  } text-white`}>
                    {product.badge}
                  </Badge>
                )}
                <button
                  onClick={(e) => toggleLike(e, product.id)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart
                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors ${
                      likedProducts.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                </button>
                {/* View overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <Eye className="w-5 h-5" />
                    <span className="text-sm font-medium">View Details</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-[#2D7A3A] transition-colors">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFD700] text-[#FFD700]" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <span className="text-sm sm:text-lg font-bold text-[#2D7A3A]">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Location & Seller */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="truncate max-w-[60px] sm:max-w-none">{product.location}</span>
                  </div>
                  <span className="truncate max-w-[50px] sm:max-w-none">{product.seller}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button
            size="lg"
            className="bg-[#2D7A3A] hover:bg-[#1B4D24] text-white px-6 sm:px-8 py-4 sm:py-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
          >
            View All Listings
            <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
