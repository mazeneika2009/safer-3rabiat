import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const BuyCar: React.FC = () => {
  const { id } = useParams();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ buyer_name: '', buyer_email: '', buyer_phone: '', message: '' });

  const { data: car } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('inquiries').insert([{ ...form, car_id: id }]);
    setLoading(false);
    if (error) { toast.error(t('error')); return; }
    toast.success(t('success'));
    navigate('/cars');
  };

  const formatPrice = (price: number) => new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG').format(price);
  const placeholderImage = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl text-gradient-gold mb-8">{t('buyCarTitle')}</motion.h1>

          {car && (
            <div className="bg-card p-6 rounded-xl border border-border mb-8 flex gap-6 flex-col md:flex-row">
              <img src={car.image_url || placeholderImage} alt={car.title} className="w-full md:w-48 h-32 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).src = placeholderImage; }} />
              <div>
                <h2 className="text-xl font-semibold">{car.title}</h2>
                <p className="text-2xl text-gradient-gold font-bold mt-2">{formatPrice(car.price)} {t('currency')}</p>
                <p className="text-muted-foreground mt-1">{car.brand} {car.model} - {car.year}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border border-border">
            <Input placeholder={t('yourName')} value={form.buyer_name} onChange={(e) => setForm({...form, buyer_name: e.target.value})} required className="bg-secondary border-border" />
            <Input type="email" placeholder={t('yourEmail')} value={form.buyer_email} onChange={(e) => setForm({...form, buyer_email: e.target.value})} required className="bg-secondary border-border" />
            <Input placeholder={t('yourPhone')} value={form.buyer_phone} onChange={(e) => setForm({...form, buyer_phone: e.target.value})} className="bg-secondary border-border" />
            <Textarea placeholder={t('message')} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="bg-secondary border-border" rows={4} />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold py-6">
              {loading ? t('loading') : t('sendInquiry')}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyCar;
