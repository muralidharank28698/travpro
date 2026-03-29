-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Custom Types / ENUMs
CREATE TYPE user_role AS ENUM ('customer', 'driver', 'admin');
CREATE TYPE vehicle_type AS ENUM ('Hatchback', 'Sedan', 'SUV', 'Tempo Traveller', 'Luxury Car', 'Bus');
CREATE TYPE booking_status AS ENUM ('Pending', 'Confirmed', 'Completed', 'Cancelled');
CREATE TYPE service_type AS ENUM ('Car Rental', 'Tour Package', 'Airport Transfer', 'Driver Hire');

-- 2. Users Table (Public Profile synced with auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(15),
  role user_role DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type vehicle_type NOT NULL,
  capacity INT NOT NULL,
  price_per_day DECIMAL(10, 2),
  location VARCHAR(100) DEFAULT 'Puducherry',
  is_available BOOLEAN DEFAULT true,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  rating DECIMAL(2, 1) DEFAULT 4.5,
  total_trips INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL, -- Nullable for 'Driver Hire' where vehicle isn't needed
  service_type service_type DEFAULT 'Car Rental',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  pickup_location TEXT NOT NULL,
  drop_location TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status booking_status DEFAULT 'Pending',
  special_requests TEXT,
  flight_number VARCHAR(50), -- Used for Airport Transfers
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users Policies
CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON public.users FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Vehicles Policies
CREATE POLICY "Anyone can view vehicles" 
  ON public.vehicles FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert vehicles" 
  ON public.vehicles FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update vehicles" 
  ON public.vehicles FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete vehicles" 
  ON public.vehicles FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Bookings Policies
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bookings" 
  ON public.bookings FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update all bookings" 
  ON public.bookings FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- 6. Trigger to automatically create a public.users profile when a new auth.users signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists to make script idempotent
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Mock Data Seeding for Vehicles
INSERT INTO public.vehicles (name, type, capacity, price_per_day, location, is_available, images, description, rating, total_trips) VALUES 
('Toyota Fortuner', 'SUV', 7, 8500, 'Puducherry', true, ARRAY['https://images.unsplash.com/photo-1627814881267-0c7f1a30fbf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'Premium SUV perfect for outstation family trips in comfort.', 4.9, 142),
('Honda City', 'Sedan', 5, 4500, 'Puducherry', false, ARRAY['https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'Comfortable sedan for corporate and family city travels.', 4.8, 321),
('Suzuki Innova Crysta', 'SUV', 7, 6500, 'Puducherry', true, ARRAY['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'The ultimate reliable people carrier for long distance tours.', 4.9, 532),
('Hyundai Creta', 'SUV', 5, 5000, 'Puducherry', true, ARRAY['https://images.unsplash.com/photo-1616422285623-14ff4e44d5c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'Compact luxury SUV offering a perfect balance of comfort and agility.', 4.7, 245),
('Suzuki Swift Dzire', 'Sedan', 5, 3000, 'Puducherry', true, ARRAY['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'Economical and reliable sedan for city commutes and short runs.', 4.6, 890),
('Force Tempo Traveller', 'Tempo Traveller', 14, 12000, 'Puducherry', true, ARRAY['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], 'Spacious air-conditioned minibus ideal for group tours and corporate events.', 4.8, 128)
ON CONFLICT DO NOTHING;
