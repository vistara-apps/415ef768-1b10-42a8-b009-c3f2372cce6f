'use client';

import { Star, Award, Clock, CheckCircle2 } from 'lucide-react';

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

interface ExpertCardProps {
  expert: Expert;
  onSelect: () => void;
}

export function ExpertCard({ expert, onSelect }: ExpertCardProps) {
  return (
    <div className="glass-effect rounded-lg p-6 hover:shadow-card transition-all duration-200 cursor-pointer group"
         onClick={onSelect}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-2xl">
            {expert.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-fg group-hover:text-primary transition-colors">
              {expert.name}
            </h4>
            <p className="text-sm text-fg/60">{expert.basename}</p>
          </div>
        </div>
        {expert.available ? (
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-success/20">
            <CheckCircle2 className="w-3 h-3 text-success" />
            <span className="text-xs text-success">Online</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-fg/10">
            <Clock className="w-3 h-3 text-fg/60" />
            <span className="text-xs text-fg/60">Offline</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-semibold text-fg">{expert.rating}</span>
        </div>
        <div className="text-sm text-fg/60">
          {expert.consultations} consultations
        </div>
        <div className="flex items-center space-x-1">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm text-fg/60">{expert.credentials}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {expert.specializations.map((spec, index) => (
          <span
            key={index}
            className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-fg/10">
        <div>
          <div className="text-2xl font-bold text-primary">
            ${expert.hourlyRate}
          </div>
          <div className="text-xs text-fg/60">per hour</div>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!expert.available}
        >
          {expert.available ? 'Request Consult' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
