import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  cars: { en: 'All Cars', ar: 'جميع السيارات' },
  sell: { en: 'Sell Car', ar: 'بيع سيارة' },
  buy: { en: 'Buy', ar: 'شراء' },
  
  // Hero Section
  heroTitle: { en: 'Safer El3arbiat', ar: 'سفير العربيات' },
  heroSubtitle: { en: 'Your Premium Car Marketplace', ar: 'سوقك المميز للسيارات' },
  heroDescription: { en: 'Buy and sell cars with confidence. The most trusted automotive marketplace in the region.', ar: 'اشترِ وبع السيارات بثقة. أكثر سوق سيارات موثوق في المنطقة.' },
  browseCars: { en: 'Browse Cars', ar: 'تصفح السيارات' },
  sellYourCar: { en: 'Sell Your Car', ar: 'بع سيارتك' },
  
  // Features
  trustedDealers: { en: 'Trusted Dealers', ar: 'تجار موثوقون' },
  trustedDealersDesc: { en: 'Verified sellers with quality guarantee', ar: 'بائعون معتمدون مع ضمان الجودة' },
  bestPrices: { en: 'Best Prices', ar: 'أفضل الأسعار' },
  bestPricesDesc: { en: 'Competitive prices in the market', ar: 'أسعار تنافسية في السوق' },
  secureDeals: { en: 'Secure Deals', ar: 'صفقات آمنة' },
  secureDealsDesc: { en: 'Safe and transparent transactions', ar: 'معاملات آمنة وشفافة' },
  
  // Car Listings
  allCars: { en: 'All Cars', ar: 'جميع السيارات' },
  featuredCars: { en: 'Featured Cars', ar: 'سيارات مميزة' },
  filterBy: { en: 'Filter By', ar: 'تصفية حسب' },
  sortBy: { en: 'Sort By', ar: 'ترتيب حسب' },
  price: { en: 'Price', ar: 'السعر' },
  year: { en: 'Year', ar: 'السنة' },
  mileage: { en: 'Mileage', ar: 'المسافة المقطوعة' },
  brand: { en: 'Brand', ar: 'الماركة' },
  model: { en: 'Model', ar: 'الموديل' },
  condition: { en: 'Condition', ar: 'الحالة' },
  transmission: { en: 'Transmission', ar: 'ناقل الحركة' },
  fuelType: { en: 'Fuel Type', ar: 'نوع الوقود' },
  color: { en: 'Color', ar: 'اللون' },
  location: { en: 'Location', ar: 'الموقع' },
  viewDetails: { en: 'View Details', ar: 'عرض التفاصيل' },
  
  // Condition types
  new: { en: 'New', ar: 'جديد' },
  used: { en: 'Used', ar: 'مستعمل' },
  certified: { en: 'Certified', ar: 'معتمد' },
  
  // Transmission types
  automatic: { en: 'Automatic', ar: 'أوتوماتيك' },
  manual: { en: 'Manual', ar: 'يدوي' },
  
  // Fuel types
  petrol: { en: 'Petrol', ar: 'بنزين' },
  diesel: { en: 'Diesel', ar: 'ديزل' },
  electric: { en: 'Electric', ar: 'كهربائي' },
  hybrid: { en: 'Hybrid', ar: 'هجين' },
  
  // Sell Car Form
  sellCarTitle: { en: 'Sell Your Car', ar: 'بع سيارتك' },
  sellCarSubtitle: { en: 'List your car and reach thousands of buyers', ar: 'أدرج سيارتك وتواصل مع آلاف المشترين' },
  carTitle: { en: 'Car Title', ar: 'عنوان السيارة' },
  description: { en: 'Description', ar: 'الوصف' },
  phone: { en: 'Phone', ar: 'الهاتف' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
  sellerName: { en: 'Seller Name', ar: 'اسم البائع' },
  uploadImages: { en: 'Image URL', ar: 'رابط الصورة' },
  submitListing: { en: 'Submit Listing', ar: 'إرسال الإعلان' },
  
  // Car Details
  specifications: { en: 'Specifications', ar: 'المواصفات' },
  contactSeller: { en: 'Contact Seller', ar: 'تواصل مع البائع' },
  buyNow: { en: 'Buy Now', ar: 'اشترِ الآن' },
  interestedInCar: { en: "I'm interested in this car", ar: 'أنا مهتم بهذه السيارة' },
  
  // Buy Form
  buyCarTitle: { en: 'Complete Your Purchase', ar: 'أكمل عملية الشراء' },
  yourName: { en: 'Your Name', ar: 'اسمك' },
  yourEmail: { en: 'Your Email', ar: 'بريدك الإلكتروني' },
  yourPhone: { en: 'Your Phone', ar: 'هاتفك' },
  message: { en: 'Message', ar: 'رسالة' },
  sendInquiry: { en: 'Send Inquiry', ar: 'إرسال الاستفسار' },
  
  // Common
  loading: { en: 'Loading...', ar: 'جاري التحميل...' },
  noResults: { en: 'No cars found', ar: 'لم يتم العثور على سيارات' },
  success: { en: 'Success!', ar: 'تم بنجاح!' },
  error: { en: 'Error occurred', ar: 'حدث خطأ' },
  currency: { en: 'EGP', ar: 'ج.م' },
  km: { en: 'km', ar: 'كم' },
  
  // Footer
  footerText: { en: '© 2024 Safer El3arbiat. All rights reserved.', ar: '© 2024 سفير العربيات. جميع الحقوق محفوظة.' },
  aboutUs: { en: 'About Us', ar: 'من نحن' },
  contactUs: { en: 'Contact Us', ar: 'اتصل بنا' },
  privacyPolicy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  terms: { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
