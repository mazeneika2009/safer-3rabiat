import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Fuel, Gauge, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: {
    id: string;
    title: string;
    title_ar?: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage?: number;
    condition: string;
    transmission: string;
    fuel_type: string;
    color?: string;
    color_ar?: string;
    image_url?: string;
    location?: string;
    location_ar?: string;
    is_featured?: boolean;
  };
  index?: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index = 0 }) => {
  const { t, language, isRTL } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG').format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG').format(mileage);
  };

  const getDisplayTitle = () => {
    if (language === 'ar' && car.title_ar) return car.title_ar;
    return car.title;
  };

  const getDisplayLocation = () => {
    if (language === 'ar' && car.location_ar) return car.location_ar;
    return car.location;
  };

  const placeholderImage = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div className="group relative bg-gradient-card rounded-xl overflow-hidden border border-border/50 card-hover transform-3d">
        {/* Featured Badge */}
        {car.is_featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-gold text-primary-foreground font-semibold">
              {isRTL ? 'مميز' : 'Featured'}
            </Badge>
          </div>
        )}

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={car.image_url || placeholderImage}
            alt={getDisplayTitle()}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          
          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-2xl text-gradient-gold">
                {formatPrice(car.price)} {t('currency')}
              </span>
              <Badge variant="outline" className="border-primary/50 text-primary">
                {t(car.condition)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-1">
            {getDisplayTitle()}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Fuel className="w-4 h-4 text-primary" />
              <span>{t(car.fuel_type)}</span>
            </div>
            {car.mileage && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Gauge className="w-4 h-4 text-primary" />
                <span>{formatMileage(car.mileage)} {t('km')}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Car className="w-4 h-4 text-primary" />
              <span>{t(car.transmission)}</span>
            </div>
          </div>

          {/* Location */}
          {car.location && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{getDisplayLocation()}</span>
            </div>
          )}

          {/* Action Button */}
          <Link to={`/car/${car.id}`}>
            <Button className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
