import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Heart, Share2, MoreHorizontal, Image as ImageIcon, Send, TrendingUp, Users, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const trendingTopics = [
  { tag: '#UNNDevFest', posts: '2.4k' },
  { tag: '#LionsNight', posts: '1.8k' },
  { tag: '#CampusLife', posts: '956' },
  { tag: '#UNN2024', posts: '834' },
  { tag: '#StudentLife', posts: '623' },
];

const suggestedUsers = [
  { name: 'UNN SUG', handle: '@unn_sug', avatar: '/avatar-1.jpg', followers: '12.5k' },
  { name: 'Campus News', handle: '@campus_news', avatar: '/avatar-2.jpg', followers: '8.2k' },
  { name: 'Tech Hub UNN', handle: '@techhub_unn', avatar: '/avatar-3.jpg', followers: '5.1k' },
];

const posts = [
  {
    id: 1,
    author: {
      name: 'Chidi Okafor',
      handle: '@chidi_dev',
      avatar: '/avatar-1.jpg',
      verified: true,
    },
    content: 'Just finished my final year project defense! 🎓 Huge thanks to my supervisor and everyone who supported me. Next stop: Convocation! #UNN2024 #Graduating',
    image: null,
    likes: 234,
    comments: 45,
    shares: 12,
    time: '2 hours ago',
    liked: false,
  },
  {
    id: 2,
    author: {
      name: 'Amara Nwosu',
      handle: '@amara_biz',
      avatar: '/avatar-2.jpg',
      verified: false,
    },
    content: 'The DevFest hackathon was incredible! Met so many talented developers and learned a lot. Can\'t wait for next year\'s event! 💻✨ #UNNDevFest #Tech',
    image: '/event-hackathon.jpg',
    likes: 567,
    comments: 89,
    shares: 34,
    time: '5 hours ago',
    liked: true,
  },
  {
    id: 3,
    author: {
      name: 'Emeka Ibrahim',
      handle: '@emeka_engineer',
      avatar: '/avatar-3.jpg',
      verified: false,
    },
    content: 'Selling my engineering textbooks! All in great condition. DM if interested. 📚 #Textbooks #UNN',
    image: '/product-textbooks.jpg',
    likes: 89,
    comments: 23,
    shares: 8,
    time: '8 hours ago',
    liked: false,
  },
  {
    id: 4,
    author: {
      name: 'Ngozi Adeyemi',
      handle: '@ngozi_pharma',
      avatar: '/avatar-4.jpg',
      verified: true,
    },
    content: 'Who\'s ready for Lion\'s Night? 🎵🎤 The lineup looks amazing this year! #LionsNight #UNN',
    image: '/event-concert.jpg',
    likes: 892,
    comments: 156,
    shares: 78,
    time: '1 day ago',
    liked: true,
  },
];

export default function SocialFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([2, 4]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-header',
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
        '.post-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.posts-container',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <section
      id="social"
      ref={sectionRef}
      className="py-24 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="social-header text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Social Connect
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your Campus{' '}
            <span className="text-gradient">Community</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Connect with fellow students, share updates, and stay in the loop 
            with everything happening on campus.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <nav className="space-y-2">
                {[
                  { icon: MessageCircle, label: 'Feed', active: true },
                  { icon: TrendingUp, label: 'Trending', active: false },
                  { icon: Users, label: 'Communities', active: false },
                  { icon: Hash, label: 'Topics', active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      item.active
                        ? 'bg-[#2D7A3A] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2D7A3A]" />
                Trending on Campus
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <span className="text-[#2D7A3A] font-medium">{topic.tag}</span>
                    <span className="text-sm text-gray-500">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 posts-container space-y-4 sm:space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex gap-3 sm:gap-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src="/avatar-1.jpg" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="What's happening on campus?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border-0 bg-gray-100 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 focus:ring-2 focus:ring-[#2D7A3A] text-sm"
                  />
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <div className="flex gap-1 sm:gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 text-xs sm:text-sm px-2 sm:px-3">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Photo</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 text-xs sm:text-sm px-2 sm:px-3">
                        <Hash className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Topic</span>
                      </Button>
                    </div>
                    <Button 
                      className="bg-[#2D7A3A] hover:bg-[#1B4D24] text-white rounded-xl text-xs sm:text-sm px-3 sm:px-4"
                      disabled={!newPost.trim()}
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="post-card bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{post.author.name}</h4>
                        {post.author.verified && (
                          <span className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs">✓</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">{post.author.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-500">{post.time}</span>
                    <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 mb-3 sm:mb-4 whitespace-pre-wrap text-sm sm:text-base">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full max-h-60 sm:max-h-80 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
                      likedPosts.includes(post.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        likedPosts.includes(post.id) ? 'fill-current' : ''
                      }`}
                    />
                    <span className="font-medium text-xs sm:text-sm">
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </span>
                  </button>

                  <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-xs sm:text-sm">{post.comments}</span>
                  </button>

                  <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Who to Follow */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Who to Follow</h3>
              <div className="space-y-4">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.handle}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-[#2D7A3A] border-[#2D7A3A] hover:bg-[#2D7A3A] hover:text-white"
                    >
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Stats */}
            <div className="bg-gradient-unn rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Campus Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Active Users</span>
                  <span className="font-bold">2,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Posts Today</span>
                  <span className="font-bold">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">New Members</span>
                  <span className="font-bold">+124</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
