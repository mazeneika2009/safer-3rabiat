import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Fuel, Gauge, Car, MapPin, Phone, Mail, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const { t, language, isRTL } = useLanguage();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const formatPrice = (price: number) => new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG').format(price);
  const placeholderImage = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80';

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-primary">{t('loading')}</p></div>;
  if (!car) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">{t('noResults')}</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative rounded-xl overflow-hidden">
              <img src={car.image_url || placeholderImage} alt={car.title} className="w-full h-96 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = placeholderImage; }} />
              <Badge className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground">{t(car.condition)}</Badge>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h1 className="font-display font-bold text-3xl text-foreground">{language === 'ar' && car.title_ar ? car.title_ar : car.title}</h1>
              <p className="font-display text-4xl text-gradient-gold font-bold">{formatPrice(car.price)} {t('currency')}</p>

              <div className="grid grid-cols-2 gap-4 bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /><span>{car.year}</span></div>
                <div className="flex items-center gap-3"><Fuel className="w-5 h-5 text-primary" /><span>{t(car.fuel_type)}</span></div>
                <div className="flex items-center gap-3"><Gauge className="w-5 h-5 text-primary" /><span>{car.mileage?.toLocaleString()} {t('km')}</span></div>
                <div className="flex items-center gap-3"><Car className="w-5 h-5 text-primary" /><span>{t(car.transmission)}</span></div>
                {car.location && <div className="flex items-center gap-3 col-span-2"><MapPin className="w-5 h-5 text-primary" /><span>{language === 'ar' && car.location_ar ? car.location_ar : car.location}</span></div>}
              </div>

              {car.description && <div className="bg-card p-6 rounded-xl border border-border"><h3 className="font-semibold mb-2">{t('description')}</h3><p className="text-muted-foreground">{language === 'ar' && car.description_ar ? car.description_ar : car.description}</p></div>}

              {(car.seller_name || car.phone || car.email) && (
                <div className="bg-card p-6 rounded-xl border border-border space-y-3">
                  <h3 className="font-semibold">{t('contactSeller')}</h3>
                  {car.seller_name && <div className="flex items-center gap-3"><User className="w-5 h-5 text-primary" /><span>{car.seller_name}</span></div>}
                  {car.phone && <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /><span dir="ltr">{car.phone}</span></div>}
                  {car.email && <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /><span>{car.email}</span></div>}
                </div>
              )}

              <Link to={`/buy/${car.id}`}><Button className="w-full bg-gradient-gold text-primary-foreground font-semibold py-6 text-lg">{t('buyNow')}</Button></Link>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetails;
