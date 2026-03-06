import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Clock, DollarSign, Bookmark, Share2, Filter, TrendingUp, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const jobTypes = ['All', 'Internship', 'Part-time', 'Freelance', 'Full-time'];

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  fullDescription: string;
  skills: string[];
  applicants: number;
  featured: boolean;
  deadline: string;
  experience: string;
  applyLink: string;
}

interface JobsProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const stats = [
  { icon: Briefcase, label: 'Active Jobs', value: '500+' },
  { icon: Users, label: 'Companies', value: '120+' },
  { icon: TrendingUp, label: 'Success Rate', value: '85%' },
];

export default function Jobs({ jobs, onJobClick }: JobsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState('All');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.jobs-header',
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
        '.job-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.jobs-list',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.stats-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const filteredJobs = activeType === 'All'
    ? jobs
    : jobs.filter(j => j.type === activeType);

  return (
    <section
      id="jobs"
      ref={sectionRef}
      className="py-24 bg-[#FAFAFA] dark:bg-gray-950 relative overflow-hidden transition-colors"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#2D7A3A]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="jobs-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="px-2 sm:px-0">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Career Hub
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Launch Your{' '}
              <span className="text-gradient">Career</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Discover internships, part-time jobs, and freelance opportunities 
              tailored specifically for UNN students.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-section flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stats-card bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg text-center flex-shrink-0"
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2D7A3A] mx-auto mb-1 sm:mb-2" />
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Types Filter */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeType === type
                  ? 'bg-[#2D7A3A] text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
          <Button variant="outline" className="rounded-full ml-auto text-xs sm:text-sm dark:border-gray-700 dark:text-gray-300">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-2 jobs-list space-y-3 sm:space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onJobClick(job)}
                className={`job-card bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl cursor-pointer ${
                  job.featured ? 'border-[#FFD700] shadow-md sm:shadow-lg' : 'border-gray-100 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Company Logo */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    {job.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white hover:text-[#2D7A3A] transition-colors cursor-pointer truncate">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{job.company}</p>
                      </div>
                      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => toggleSave(e, job.id)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Bookmark
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              savedJobs.includes(job.id)
                                ? 'fill-[#2D7A3A] text-[#2D7A3A]'
                                : 'text-gray-400 dark:text-gray-500'
                            }`}
                          />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden sm:block"
                        >
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs dark:bg-gray-700 dark:text-gray-300">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="truncate max-w-[80px] sm:max-w-none">{job.location}</span>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs dark:bg-gray-700 dark:text-gray-300">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {job.type}
                      </Badge>
                      <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-xs dark:bg-gray-700 dark:text-gray-300">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </Badge>
                    </div>

                    {/* Description - hidden on mobile */}
                    <p className="hidden sm:block text-gray-600 dark:text-gray-400 mt-3 text-sm line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {job.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#2D7A3A]/10 text-[#2D7A3A] text-[10px] sm:text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 2 && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs font-medium rounded-full">
                          +{job.skills.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{job.posted}</span>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
                          {job.applicants} applicants
                        </span>
                        <Button
                          size="sm"
                          className="bg-[#2D7A3A] hover:bg-[#1B4D24] text-white rounded-lg text-xs sm:text-sm px-3 sm:px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJobClick(job);
                          }}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                <Button variant="outline" className="w-full justify-start rounded-xl text-xs sm:text-sm dark:border-gray-700 dark:text-gray-300">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                  Post a Job
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl text-xs sm:text-sm dark:border-gray-700 dark:text-gray-300">
                  <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                  Saved Jobs ({savedJobs.length})
                </Button>
              </div>
            </div>

            {/* Career Tips */}
            <div className="bg-gradient-unn rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
              <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Career Tip 💡</h3>
              <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                Update your profile to increase your chances of getting hired by 70%!
              </p>
              <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs sm:text-sm">
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
