-- ============================================================
-- E0 Finder — Supabase Database Schema + Seed
-- ============================================================

-- Enable earthdistance for geolocation queries (safe if already enabled)
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- ============================================================
-- 1. STATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.stations (
  id                 TEXT PRIMARY KEY,
  name               TEXT NOT NULL,
  brand              TEXT NOT NULL,
  brand_logo         TEXT NOT NULL DEFAULT '',
  fuel_grade         TEXT NOT NULL,
  is_e0_confirmed    BOOLEAN NOT NULL DEFAULT TRUE,
  is_coco            BOOLEAN NOT NULL DEFAULT FALSE,
  address            TEXT NOT NULL,
  area               TEXT NOT NULL DEFAULT '',
  city               TEXT NOT NULL,
  state              TEXT NOT NULL,
  pincode            TEXT NOT NULL DEFAULT '',
  latitude           DOUBLE PRECISION NOT NULL,
  longitude          DOUBLE PRECISION NOT NULL,
  price              NUMERIC(6, 2) NOT NULL DEFAULT 145.00,
  density            TEXT NOT NULL DEFAULT '734.0 kg/m³ @ 15°C',
  last_verified      TEXT NOT NULL DEFAULT 'Today',
  verified_by        TEXT NOT NULL DEFAULT 'E0 Finder Team',
  rating             NUMERIC(3, 1) NOT NULL DEFAULT 4.9,
  review_count       INTEGER NOT NULL DEFAULT 0,
  is_open_24_hours   BOOLEAN NOT NULL DEFAULT TRUE,
  timing             TEXT NOT NULL DEFAULT 'Open 24 Hours',
  phone              TEXT NOT NULL DEFAULT '',
  amenities          TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stations_city ON public.stations (city);
CREATE INDEX IF NOT EXISTS idx_stations_brand ON public.stations (brand);
CREATE INDEX IF NOT EXISTS idx_stations_fuel_grade ON public.stations (fuel_grade);
CREATE INDEX IF NOT EXISTS idx_stations_is_active ON public.stations (is_active);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS stations_updated_at ON public.stations;
CREATE TRIGGER stations_updated_at
  BEFORE UPDATE ON public.stations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 2. COMMUNITY REPORTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.community_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_name    TEXT NOT NULL,
  city            TEXT NOT NULL,
  fuel_grade      TEXT NOT NULL DEFAULT 'XP100 (0% Ethanol)',
  density         TEXT NOT NULL DEFAULT '',
  notes           TEXT NOT NULL DEFAULT '',
  latitude        DOUBLE PRECISION,
  longitude       DOUBLE PRECISION,
  submitter_ip    TEXT,
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_city ON public.community_reports (city);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.community_reports (created_at DESC);

-- ============================================================
-- 3. ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stations_public_read" ON public.stations;
DROP POLICY IF EXISTS "stations_admin_all" ON public.stations;
DROP POLICY IF EXISTS "reports_public_insert" ON public.community_reports;
DROP POLICY IF EXISTS "reports_admin_select" ON public.community_reports;

CREATE POLICY "stations_public_read"
  ON public.stations FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "stations_admin_all"
  ON public.stations FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "reports_public_insert"
  ON public.community_reports FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "reports_admin_select"
  ON public.community_reports FOR SELECT
  USING (auth.role() = 'service_role');

-- ============================================================
-- 4. SEED — All E0 Finder Stations
-- ============================================================
INSERT INTO public.stations (
  id, name, brand, brand_logo, fuel_grade, is_e0_confirmed, is_coco,
  address, area, city, state, pincode, latitude, longitude,
  price, density, last_verified, verified_by,
  rating, review_count, is_open_24_hours, timing, phone, amenities
) VALUES

-- BENGALURU
('iocl-coco-koramangala-blr','IndianOil COCO Auto Care Koramangala','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'No. 19/A, Block 6, 80 Feet Road, Koramangala, Bengaluru','Koramangala 6th Block',
 'Bengaluru','Karnataka','560095',12.9348,77.6205,
 145.0,'734.8 kg/m³ @ 15°C','Today','IndianOil ONE App & Form-8 Density Log',
 4.9,310,TRUE,'Open 24 Hours','+91 80 2553 4411',
 ARRAY['XP100 Dedicated Bay','Digital Nitrogen & Air','UPI / NFC / Cards','Clean Restrooms','EV Fast Charging']),

('iocl-coco-hebbal-blr','IndianOil COCO Auto Care Centre Hebbal','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Bellary Road, Near Hebbal Flyover, Bengaluru','Hebbal',
 'Bengaluru','Karnataka','560024',13.0358,77.5970,
 145.0,'735.0 kg/m³ @ 15°C','Today','E0 Finder Community Audit',
 4.8,220,TRUE,'Open 24 Hours','+91 80 2364 1122',
 ARRAY['XP100 Dispenser','UPI / Card','Restrooms']),

('iocl-coco-whitefield-blr','IndianOil COCO Whitefield Main Road','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Whitefield Main Road, Near ITPL Gate, Bengaluru','Whitefield',
 'Bengaluru','Karnataka','560066',12.9698,77.7499,
 145.0,'734.7 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.7,185,FALSE,'06:00 AM – 11:00 PM','',
 ARRAY['XP100 Dispenser','UPI / Card']),

('hpcl-acc-old-airport-blr','HPCL Auto Care Centre Old Airport Road','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,TRUE,
 'Old Airport Road, Kodihalli, Bengaluru','Indiranagar / Domlur',
 'Bengaluru','Karnataka','560017',12.9614,77.6473,
 146.0,'735.2 kg/m³ @ 15°C','Today','HPCL Dealer Portal Confirmed',
 4.8,180,TRUE,'Open 24 Hours','+91 80 4112 3344',
 ARRAY['poWer100 Bay','Digital Tyre Inflation','UPI / Cards']),

('hpcl-acc-jp-nagar-blr','HPCL Auto Care JP Nagar 7th Phase','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,FALSE,
 '7th Phase, JP Nagar, Bengaluru','JP Nagar',
 'Bengaluru','Karnataka','560078',12.9063,77.5857,
 146.0,'735.1 kg/m³ @ 15°C','Today','Community Density Test',
 4.7,140,TRUE,'Open 24 Hours','',
 ARRAY['poWer100 Dispenser','UPI / Card']),

('bpcl-speed97-indiranagar-blr','BPCL Speed 97 Indiranagar 100ft Road','BPCL',
 '/assets/oil_company_logo/Bharat_Petroleum_logo.svg','Speed 97 (0% Ethanol)',TRUE,FALSE,
 '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru','Indiranagar',
 'Bengaluru','Karnataka','560038',12.9784,77.6408,
 139.0,'734.5 kg/m³ @ 15°C','Today','BPCL SmartDrive + Community',
 4.6,120,TRUE,'Open 24 Hours','',
 ARRAY['Speed 97 Unblended','UPI / Card']),

-- DELHI NCR
('iocl-coco-chanakyapuri-del','IndianOil COCO Auto Care Chanakyapuri','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Neeti Marg, Chanakyapuri, New Delhi','Chanakyapuri',
 'Delhi NCR','Delhi','110021',28.5980,77.1893,
 145.0,'735.5 kg/m³ @ 15°C','Today','IndianOil Form-8 & E0 Finder Audit',
 4.9,280,TRUE,'Open 24 Hours','+91 11 2301 4455',
 ARRAY['XP100 Dispenser','EV Fast Charging','UPI / NFC / Cards','Restrooms']),

('iocl-coco-vasant-kunj-del','IndianOil COCO Vasant Kunj Sector C','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Sector C Pocket 6, Vasant Kunj, New Delhi','Vasant Kunj',
 'Delhi NCR','Delhi','110070',28.5245,77.1579,
 145.0,'735.3 kg/m³ @ 15°C','Today','E0 Finder Community Audit',
 4.8,210,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dedicated Bay','UPI / NFC / Cards']),

('hpcl-acc-golf-course-gurugram','HPCL Auto Care Golf Course Road Gurgaon','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,TRUE,
 'Golf Course Extension Road, Sector 65, Gurgaon','Gurgaon Sector 56',
 'Delhi NCR','Haryana','122011',28.4082,77.0966,
 147.0,'735.1 kg/m³ @ 15°C','Today','HPCL Community Audit',
 4.8,190,FALSE,'06:00 AM – 11:00 PM','+91 124 456 7890',
 ARRAY['poWer100 Dispenser','Cafe','UPI / Cards']),

('iocl-coco-noida-sec18','IndianOil COCO Noida Sector 18','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Atta Market Area, Sector 18, Noida','Noida Sector 18',
 'Delhi NCR','Uttar Pradesh','201301',28.5709,77.3210,
 144.5,'734.9 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.7,160,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Card','Air Inflation']),

-- MUMBAI
('bpcl-coco-bandra-mum','BPCL Company Outlet Bandra Reclamation','BPCL',
 '/assets/oil_company_logo/Bharat_Petroleum_logo.svg','Speed 97 (0% Ethanol)',TRUE,TRUE,
 'Bandra Reclamation, Near Sea Link Entry, Bandra West, Mumbai','Bandra West',
 'Mumbai','Maharashtra','400050',19.0445,72.8205,
 139.0,'733.9 kg/m³ @ 15°C','Today','BPCL SmartDrive Verified',
 4.7,240,TRUE,'Open 24 Hours','+91 22 2640 5566',
 ARRAY['Speed 97 Unblended','UPI / Cards','CNG Available']),

('iocl-jubilee-worli-mum','IndianOil Jubilee Bunk Worli','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,FALSE,
 'Dr. Annie Besant Road, Worli, Mumbai','Worli',
 'Mumbai','Maharashtra','400018',18.9941,72.8179,
 146.0,'734.5 kg/m³ @ 15°C','Today','E0 Finder Community Audit',
 4.7,165,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Card']),

('hpcl-acc-powai-mum','HPCL Auto Care Powai Hiranandani','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,TRUE,
 'Hiranandani Gardens, Powai, Mumbai','Powai',
 'Mumbai','Maharashtra','400076',19.1176,72.9060,
 146.5,'734.8 kg/m³ @ 15°C','Today','HPCL Dealer Portal',
 4.8,195,TRUE,'Open 24 Hours','+91 22 2570 1234',
 ARRAY['poWer100 Bay','UPI / Cards','Restrooms']),

-- PUNE
('iocl-coco-sbroad-pune','IndianOil COCO Outlet Senapati Bapat Road','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Senapati Bapat Road, Near ICC Tech Park, Pune','SB Road / Shivajinagar',
 'Pune','Maharashtra','411016',18.5310,73.8401,
 146.0,'734.6 kg/m³ @ 15°C','Today','IndianOil Form-8 Log',
 4.8,142,FALSE,'06:00 AM – 11:00 PM','+91 20 2553 7788',
 ARRAY['XP100 Dedicated Bay','UPI / Cards','Air & Nitrogen']),

('bpcl-speed97-aundh-pune','BPCL Speed 97 Aundh ITI Road','BPCL',
 '/assets/oil_company_logo/Bharat_Petroleum_logo.svg','Speed 97 (0% Ethanol)',TRUE,FALSE,
 'ITI Road, Aundh, Pune','Aundh',
 'Pune','Maharashtra','411007',18.5590,73.8077,
 138.0,'733.7 kg/m³ @ 15°C','Today','Community Verification',
 4.6,108,TRUE,'Open 24 Hours','',
 ARRAY['Speed 97 Unblended','UPI / Card']),

-- HYDERABAD
('iocl-coco-jubilee-hills-hyd','IndianOil COCO Jubilee Hills Road 36','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Road No. 36, Jubilee Hills, Hyderabad','Jubilee Hills',
 'Hyderabad','Telangana','500033',17.4316,78.4071,
 145.0,'734.9 kg/m³ @ 15°C','Today','E0 Finder & IndianOil App',
 4.9,198,TRUE,'Open 24 Hours','+91 40 2354 1234',
 ARRAY['XP100 Dispenser','EV Charging','UPI / Cards','Restrooms']),

('hpcl-power100-banjara-hyd','HPCL poWer100 Banjara Hills Road 12','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,TRUE,
 'Road No. 12, Banjara Hills, Hyderabad','Banjara Hills',
 'Hyderabad','Telangana','500034',17.4156,78.4347,
 147.0,'735.0 kg/m³ @ 15°C','Today','HPCL Dealer Portal + Community',
 4.8,155,TRUE,'Open 24 Hours','',
 ARRAY['poWer100 Bay','UPI / Cards']),

-- CHENNAI
('iocl-coco-ecr-chennai','IndianOil COCO ECR Kottivakkam','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'East Coast Road (ECR), Kottivakkam, Chennai','ECR / Thiruvanmiyur',
 'Chennai','Tamil Nadu','600041',12.9432,80.2567,
 144.0,'734.3 kg/m³ @ 15°C','Today','Community Density Test & Form-8',
 4.8,155,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Card']),

('hpcl-power100-anna-nagar-chn','HPCL poWer100 Anna Nagar 2nd Avenue','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,FALSE,
 '2nd Avenue, Anna Nagar, Chennai','Anna Nagar',
 'Chennai','Tamil Nadu','600040',13.0836,80.2101,
 146.0,'734.6 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.7,118,TRUE,'Open 24 Hours','',
 ARRAY['poWer100 Dispenser','UPI / Card']),

-- KOLKATA
('iocl-coco-em-bypass-kol','IndianOil COCO EM Bypass Ruby Crossing','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'EM Bypass, Near Ruby General Hospital, Kolkata','EM Bypass / Kasba',
 'Kolkata','West Bengal','700107',22.5115,88.3991,
 145.0,'734.4 kg/m³ @ 15°C','Today','E0 Finder Community',
 4.7,132,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Card']),

-- CHANDIGARH
('iocl-coco-madhya-marg-chd','IndianOil COCO Madhya Marg Sector 28','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Madhya Marg, Sector 28, Chandigarh','Sector 28',
 'Chandigarh','Punjab / Haryana','160028',30.7333,76.7794,
 144.0,'735.3 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.9,175,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Cards']),

-- JAIPUR
('iocl-coco-tonk-road-jpr','IndianOil COCO Tonk Road Jaipur','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Tonk Road, Near Durgapura, Jaipur','Durgapura',
 'Jaipur','Rajasthan','302018',26.8516,75.8022,
 146.5,'735.4 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.7,128,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','UPI / Card']),

-- KOCHI
('hpcl-power100-mg-road-kochi','HPCL poWer100 MG Road Ernakulam','HPCL',
 '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg','poWer100 (0% Ethanol)',TRUE,FALSE,
 'MG Road, Ernakulam, Kochi','MG Road',
 'Kochi','Kerala','682016',9.9816,76.2999,
 145.5,'734.2 kg/m³ @ 15°C','Today','Community + HPCL Portal',
 4.7,112,TRUE,'Open 24 Hours','',
 ARRAY['poWer100 Bay','UPI / Card']),

-- AHMEDABAD
('iocl-coco-sg-highway-ahm','IndianOil COCO SG Highway Ahmedabad','IndianOil',
 '/assets/oil_company_logo/Indian_Oil_Logo.svg','XP100 (0% Ethanol)',TRUE,TRUE,
 'Sarkhej-Gandhinagar Highway, Bodakdev, Ahmedabad','Bodakdev',
 'Ahmedabad','Gujarat','380054',23.0469,72.5150,
 144.5,'734.7 kg/m³ @ 15°C','Today','E0 Finder Audit',
 4.8,148,TRUE,'Open 24 Hours','',
 ARRAY['XP100 Dispenser','EV Charging','UPI / Card']),

-- GOA
('bpcl-speed97-panaji-goa','BPCL Speed 97 Panaji NH66','BPCL',
 '/assets/oil_company_logo/Bharat_Petroleum_logo.svg','Speed 97 (0% Ethanol)',TRUE,FALSE,
 'NH 66, Near Panaji Bus Stand, Goa','Panaji',
 'Goa','Goa','403001',15.4909,73.8278,
 138.0,'733.6 kg/m³ @ 15°C','Today','Community Density Test',
 4.6,89,TRUE,'Open 24 Hours','',
 ARRAY['Speed 97 Unblended','UPI / Card'])

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  density = EXCLUDED.density,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = NOW();

-- ============================================================
-- Verify
-- ============================================================
SELECT COUNT(*) AS total_stations, array_agg(DISTINCT city ORDER BY city) AS cities
FROM public.stations WHERE is_active = TRUE;
