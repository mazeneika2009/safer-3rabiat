
-- Create enum for car condition
CREATE TYPE public.car_condition AS ENUM ('new', 'used', 'certified');

-- Create enum for transmission type
CREATE TYPE public.transmission_type AS ENUM ('automatic', 'manual');

-- Create enum for fuel type
CREATE TYPE public.fuel_type AS ENUM ('petrol', 'diesel', 'electric', 'hybrid');

-- Create cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  mileage INTEGER,
  condition car_condition NOT NULL DEFAULT 'used',
  transmission transmission_type NOT NULL DEFAULT 'automatic',
  fuel_type fuel_type NOT NULL DEFAULT 'petrol',
  color TEXT,
  color_ar TEXT,
  description TEXT,
  description_ar TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  location TEXT,
  location_ar TEXT,
  phone TEXT,
  email TEXT,
  seller_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view cars)
CREATE POLICY "Anyone can view cars" 
ON public.cars 
FOR SELECT 
USING (true);

-- Create policy for anyone to insert cars (for selling)
CREATE POLICY "Anyone can add cars" 
ON public.cars 
FOR INSERT 
WITH CHECK (true);

-- Create inquiries table for buy requests
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiries
CREATE POLICY "Anyone can submit inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cars_updated_at
BEFORE UPDATE ON public.cars
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
