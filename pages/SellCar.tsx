import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SellCar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '', brand: '', model: '', year: new Date().getFullYear(),
    price: 0, mileage: 0, condition: 'used' as 'new' | 'used' | 'certified', 
    transmission: 'automatic' as 'automatic' | 'manual',
    fuel_type: 'petrol' as 'petrol' | 'diesel' | 'electric' | 'hybrid', 
    color: '', description: '', image_url: '',
    location: '', phone: '', email: '', seller_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('cars').insert([form]);
    setLoading(false);
    if (error) { toast.error(t('error')); return; }
    toast.success(t('success'));
    navigate('/cars');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl text-gradient-gold mb-8">{t('sellCarTitle')}</motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder={t('carTitle')} value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="bg-secondary border-border" />
              <Input placeholder={t('brand')} value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} required className="bg-secondary border-border" />
              <Input placeholder={t('model')} value={form.model} onChange={(e) => setForm({...form, model: e.target.value})} required className="bg-secondary border-border" />
              <Input type="number" placeholder={t('year')} value={form.year} onChange={(e) => setForm({...form, year: +e.target.value})} required className="bg-secondary border-border" />
              <Input type="number" placeholder={t('price')} value={form.price || ''} onChange={(e) => setForm({...form, price: +e.target.value})} required className="bg-secondary border-border" />
              <Input type="number" placeholder={t('mileage')} value={form.mileage || ''} onChange={(e) => setForm({...form, mileage: +e.target.value})} className="bg-secondary border-border" />
              <Select value={form.condition} onValueChange={(v) => setForm({...form, condition: v})}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="new">{t('new')}</SelectItem><SelectItem value="used">{t('used')}</SelectItem><SelectItem value="certified">{t('certified')}</SelectItem></SelectContent>
              </Select>
              <Select value={form.fuel_type} onValueChange={(v) => setForm({...form, fuel_type: v})}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="petrol">{t('petrol')}</SelectItem><SelectItem value="diesel">{t('diesel')}</SelectItem><SelectItem value="electric">{t('electric')}</SelectItem><SelectItem value="hybrid">{t('hybrid')}</SelectItem></SelectContent>
              </Select>
              <Input placeholder={t('color')} value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="bg-secondary border-border" />
              <Input placeholder={t('location')} value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="bg-secondary border-border" />
              <Input placeholder={t('uploadImages')} value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} className="bg-secondary border-border" />
              <Input placeholder={t('sellerName')} value={form.seller_name} onChange={(e) => setForm({...form, seller_name: e.target.value})} className="bg-secondary border-border" />
              <Input placeholder={t('phone')} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="bg-secondary border-border" />
              <Input type="email" placeholder={t('email')} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="bg-secondary border-border" />
            </div>
            <Textarea placeholder={t('description')} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="bg-secondary border-border" rows={4} />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold py-6">
              {loading ? t('loading') : t('submitListing')}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellCar;
