import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ContactPage = () => {
  const [params] = useSearchParams();
  const [info, setInfo] = useState<{ ok?: boolean; service?: string | null; model?: string | null } | null>(null);

  useEffect(() => {
    const service = params.get('service');
    const model = params.get('model');
    const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8080/api';
    fetch(`${API_BASE}/contact?service=${encodeURIComponent(service || '')}&model=${encodeURIComponent(model || '')}`)
      .then(r => r.json())
      .then(setInfo)
      .catch(() => setInfo(null));
  }, [params]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg">Get in touch with our team</p>
        {info?.service === 'construction' && (
          <div className="mt-6 p-4 border rounded-md">
            <div className="font-medium">Construction request</div>
            <div className="text-sm text-muted-foreground">Model: {info?.model || 'N/A'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;