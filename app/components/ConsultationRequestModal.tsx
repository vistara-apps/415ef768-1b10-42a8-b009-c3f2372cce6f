'use client';

import { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  basename: string;
  avatar: string;
  hourlyRate: number;
}

interface ConsultationRequestModalProps {
  expert: Expert;
  onClose: () => void;
}

export function ConsultationRequestModal({ expert, onClose }: ConsultationRequestModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [problemDescription, setProblemDescription] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-fg/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
              {expert.avatar}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-fg">Request Consultation</h3>
              <p className="text-sm text-fg/60">{expert.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-fg/10 transition-colors"
          >
            <X className="w-5 h-5 text-fg/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Problem Description *
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the equipment issue in detail..."
                  className="w-full px-4 py-3 rounded-lg glass-effect text-fg placeholder-fg/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                        urgency === level
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-fg/10 text-fg/60 hover:border-fg/30'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Attach Images/Videos
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center space-x-2 px-4 py-8 rounded-lg border-2 border-dashed border-fg/20 hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    <Upload className="w-5 h-5 text-fg/60" />
                    <span className="text-sm text-fg/60">
                      Click to upload or drag and drop
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-fg/60">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-2 p-4 rounded-lg bg-primary/10">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-fg/80">
                  <p className="font-medium mb-1">Estimated Cost</p>
                  <p>
                    ${expert.hourlyRate}/hour • Minimum 15 minutes (${(expert.hourlyRate / 4).toFixed(2)})
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!problemDescription.trim()}
                className="w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h4 className="text-lg font-semibold text-fg mb-2">Processing Payment</h4>
              <p className="text-fg/60">Please confirm the transaction in your wallet...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h4 className="text-lg font-semibold text-fg mb-2">Consultation Requested!</h4>
              <p className="text-fg/60 mb-6">
                {expert.name} has been notified and will respond shortly.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-accent transition-colors duration-200"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
