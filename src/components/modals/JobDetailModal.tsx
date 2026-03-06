import { X, MapPin, Clock, DollarSign, Bookmark, Share2, Calendar, Briefcase, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen || !job) return null;

  const handleApply = () => {
    window.open(job.applyLink, '_blank');
    setApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-3xl">
              {job.logo}
            </div>
            <div className="flex-1 pr-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{job.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{job.company}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {job.salary}
                </Badge>
                {job.featured && (
                  <Badge className="bg-[#FFD700] text-gray-900">Featured</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
              <Briefcase className="w-5 h-5 text-[#2D7A3A] mx-auto mb-1" />
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold text-gray-900 dark:text-white">{job.experience}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
              <Calendar className="w-5 h-5 text-[#2D7A3A] mx-auto mb-1" />
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-semibold text-gray-900 dark:text-white">{job.deadline}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
              <CheckCircle className="w-5 h-5 text-[#2D7A3A] mx-auto mb-1" />
              <p className="text-sm text-gray-500">Applicants</p>
              <p className="font-semibold text-gray-900 dark:text-white">{job.applicants}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#2D7A3A]/10 text-[#2D7A3A] font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Job Description</h3>
            <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {job.fullDescription}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className={`flex-1 py-6 rounded-xl ${
                applied
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#2D7A3A] hover:bg-[#1B4D24]'
              } text-white`}
              onClick={handleApply}
              disabled={applied}
            >
              {applied ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Application Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Apply Now
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className={`px-6 rounded-xl ${
                saved ? 'border-[#2D7A3A] text-[#2D7A3A]' : ''
              }`}
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
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
