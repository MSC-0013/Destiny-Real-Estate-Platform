import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8080/api';

const ConstructionChatbotPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    projectName: '',
    location: '',
    budgetInInr: '',
    startDate: '',
    endDate: '',
    requirements: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const model = params.get('model');

  useEffect(() => {
    if (model) {
      setForm(prev => ({ ...prev, projectName: `${prev.projectName || ''}`.trim() || `Construction for ${model}` }));
    }
  }, [model]);

  const next = () => setStep(s => Math.min(s + 1, 5));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    try {
      const resp = await api.post('/construction/contracts', {
        userId: 'guest',
        projectName: form.projectName,
        location: form.location,
        budgetInInr: Number(form.budgetInInr || 0),
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        requirements: { notes: form.requirements, model }
      });
      if (resp.status === 201) navigate('/admin-dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Construction Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div>
                <p className="mb-2">What would you like to build?</p>
                <Input value={form.projectName} onChange={e => setForm({ ...form, projectName: e.target.value })} placeholder="e.g., 3BHK Villa in Bandra" />
              </div>
            )}
            {step === 1 && (
              <div>
                <p className="mb-2">Where is the location?</p>
                <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Area" />
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="mb-2">What is your budget (₹)?</p>
                <Input type="number" value={form.budgetInInr} onChange={e => setForm({ ...form, budgetInInr: e.target.value })} placeholder="e.g., 15000000" />
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">Start date</p>
                  <Input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div>
                  <p className="mb-2">End date</p>
                  <Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <p className="mb-2">Any specific requirements?</p>
                <Textarea rows={4} value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="Materials, styles, constraints, etc." />
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={back} disabled={step === 0}>Back</Button>
              {step < 4 ? (
                <Button onClick={next}>Next</Button>
              ) : (
                <Button onClick={submit} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit for Approval'}</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConstructionChatbotPage;


