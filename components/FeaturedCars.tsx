import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import CarCard from './CarCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FeaturedCars: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const { data: cars, isLoading } = useQuery({
    queryKey: ['featured-cars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_sold', false)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">
              <span className="text-gradient-gold">{t('featuredCars')}</span>
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'اكتشف أفضل السيارات المميزة لدينا' : 'Discover our handpicked premium vehicles'}
            </p>
          </div>
          <Link to="/cars">
            <Button variant="outline" className="mt-4 md:mt-0 border-primary/50 text-primary hover:bg-primary/10">
              {t('allCars')}
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </motion.div>

        {/* Cars Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg mb-4">{t('noResults')}</p>
            <Link to="/sell">
              <Button className="bg-gradient-gold text-primary-foreground">
                {t('sellYourCar')}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
