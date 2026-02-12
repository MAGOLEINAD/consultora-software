'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ContactFormProps {
  translations: {
    title: string;
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    interestLabel: string;
    interestNote: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const searchParams = useSearchParams();
  const interest = searchParams?.get('interest') || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple mailto fallback
    const subject = `Contact from ${formData.name} - ${formData.company}`;
    const interestLine = interest ? `Interest: ${interest}\n` : '';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n${interestLine}\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:contact@consultora-software.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    setStatus('success');

    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <Card className="border border-neutral-200 shadow-lg bg-white/90 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-neutral-900">
          {translations.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {interest && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-neutral-700">
              <div className="font-semibold text-neutral-900">
                {translations.interestLabel}: {interest}
              </div>
              <div className="text-xs text-neutral-600 mt-1">
                {translations.interestNote}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {translations.name}
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {translations.email}
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              {translations.company}
            </label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {translations.message}
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
            />
          </div>

          {status === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              {translations.success}
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              {translations.error}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            {translations.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
