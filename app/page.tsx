'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { 
  Video, 
  Shield, 
  Award, 
  BookOpen, 
  Search,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ExpertCard } from './components/ExpertCard';
import { ConsultationRequestModal } from './components/ConsultationRequestModal';

interface Expert {
  id: string;
  name: string;
  basename: string;
  avatar: string;
  specializations: string[];
  rating: number;
  consultations: number;
  hourlyRate: number;
  credentials: number;
  available: boolean;
}

const mockExperts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    basename: 'sarah.base.eth',
    avatar: '👩‍🔬',
    specializations: ['Industrial Robotics', 'CNC Machinery', 'Automation'],
    rating: 4.9,
    consultations: 247,
    hourlyRate: 150,
    credentials: 5,
    available: true,
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    basename: 'mike.base.eth',
    avatar: '👨‍🔧',
    specializations: ['HVAC Systems', 'Refrigeration', 'Climate Control'],
    rating: 4.8,
    consultations: 189,
    hourlyRate: 120,
    credentials: 4,
    available: true,
  },
  {
    id: '3',
    name: 'Dr. James Park',
    basename: 'james.base.eth',
    avatar: '👨‍💼',
    specializations: ['Medical Equipment', 'Diagnostic Imaging', 'Lab Systems'],
    rating: 5.0,
    consultations: 312,
    hourlyRate: 200,
    credentials: 7,
    available: false,
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredExperts = mockExperts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specializations.some(spec => 
      spec.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-fg">Expert-On-Demand</h1>
                <p className="text-xs text-fg/60">Diagnostics</p>
              </div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-fg mb-4">
              Instant Expert Support
            </h2>
            <p className="text-xl text-fg/80 mb-8 max-w-2xl mx-auto">
              Connect with verified specialists for real-time equipment diagnostics.
              Powered by onchain reputation and Farcaster identity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-fg">Verified Experts</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-fg">Onchain Credentials</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-fg">Real-time Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">748</div>
            <div className="text-sm text-fg/60">Consultations Completed</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-fg/60">Average Expert Rating</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">16</div>
            <div className="text-sm text-fg/60">Verified Experts</div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fg/40" />
          <input
            type="text"
            placeholder="Search by expertise or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-fg placeholder-fg/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </section>

      {/* Experts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-fg">Available Experts</h3>
          <div className="flex items-center space-x-2 text-sm text-fg/60">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>{filteredExperts.filter(e => e.available).length} online now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onSelect={() => setSelectedExpert(expert)}
            />
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-fg/60">No experts found matching your search.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-semibold text-fg mb-8 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-fg mb-2">Find an Expert</h4>
            <p className="text-fg/60">
              Browse verified specialists by expertise, rating, and availability
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-fg mb-2">Start Consultation</h4>
            <p className="text-fg/60">
              Share images, videos, and get real-time visual guidance
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-fg mb-2">Build Reputation</h4>
            <p className="text-fg/60">
              Rate experts and earn onchain credentials for your expertise
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Base CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-effect rounded-lg p-8 text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-fg mb-2">
            Shared Knowledge Base
          </h3>
          <p className="text-fg/60 mb-6 max-w-2xl mx-auto">
            Access community-contributed troubleshooting guides and repair protocols
          </p>
          <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-accent transition-colors duration-200">
            <span>Explore Knowledge Base</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Consultation Request Modal */}
      {selectedExpert && (
        <ConsultationRequestModal
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </div>
  );
}
