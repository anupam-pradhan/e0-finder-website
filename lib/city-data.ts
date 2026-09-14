export interface CityData {
  slug: string
  name: string
  state: string
  metaTitle: string
  metaDescription: string
  popularAreas: string[]
  verifiedPumpsCount: number
  avgEthanolBlend: string
  avgDensity: string
  highwayCorridors: string[]
  featuredStations: {
    brand: string
    fuelGrade: string
    location: string
    area: string
    verifiedDate: string
  }[]
  cityGuide: string
  faqs: {
    q: string
    a: string
  }[]
}

export const citiesData: CityData[] = [
  {
    slug: 'bangalore',
    name: 'Bengaluru',
    state: 'Karnataka',
    metaTitle: 'E0 Petrol Pumps in Bangalore - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Bangalore. Search XP100, poWer100 and ethanol-free station reports near Hebbal, Indiranagar, Koramangala, Whitefield and ORR.',
    popularAreas: ['Indiranagar', 'Koramangala', 'Whitefield', 'Bellary Road (Airport Highway)', 'Outer Ring Road (ORR)', 'Electronic City', 'Jayanagar', 'Yelahanka'],
    verifiedPumpsCount: 42,
    avgEthanolBlend: '19.4%',
    avgDensity: '742 kg/m³',
    highwayCorridors: ['Bengaluru - Mysuru Expressway (NH275)', 'Bengaluru - Hyderabad Highway (NH44)', 'Bengaluru - Chennai Expressway', 'Tumkur Road (NH48)'],
    featuredStations: [
      {
        brand: 'IndianOil (COCO)',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Bellary Road, Near Hebbal Flyover',
        area: 'Hebbal / Bellary Road',
        verifiedDate: 'August 16, 2026',
      },
      {
        brand: 'HPCL Auto Care Centre',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Old Airport Road, Kodihalli',
        area: 'Indiranagar / Domlur',
        verifiedDate: 'August 15, 2026',
      },
      {
        brand: 'IndianOil Jubilee Outlet',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Hosur Road, Near Silk Board',
        area: 'BTM / Silk Board',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Bengaluru has India's highest concentration of premium superbikes and classic Royal Enfield enthusiast clubs. With standard petrol and XP95 across Karnataka blended with up to 20% ethanol, finding pure 0% ethanol fuel is essential for weekend breakfast rides to Nandi Hills and Kolar CCD.

Flagship Company-Owned Company-Operated (COCO) bunks on Bellary Road and Old Airport Road maintain dedicated 100-octane dispensers with verified 0% ethanol batches.
    `,
    faqs: [
      {
        q: 'Where can I find 0% ethanol petrol in Bengaluru?',
        a: 'Verified 0% ethanol petrol (XP100) is available at flagship IOCL COCO outlets on Bellary Road (Hebbal), Old Airport Road, Hosur Road, and Outer Ring Road. Use the E0 Finder app to get live stock and turn-by-turn directions.',
      },
      {
        q: 'Is XP95 sold in Bengaluru ethanol-free?',
        a: 'No. IndianOil XP95 and HPCL Power 95 in Bengaluru contain up to 20% ethanol (E20). The only pure E0 petrol available in Karnataka is 100-octane fuel (XP100 / poWer100).',
      },
    ],
  },
  {
    slug: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi & Haryana',
    metaTitle: 'E0 Petrol Pumps in Delhi NCR - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Delhi NCR, Gurgaon and Noida. Search XP100 and poWer100 station reports near Chanakyapuri, Golf Course Road and DND.',
    popularAreas: ['Connaught Place', 'Chanakyapuri', 'Golf Course Road (Gurgaon)', 'Cyber Hub', 'Noida Expressway', 'DND Flyway', 'South Extension', 'Dwarka Expressway'],
    verifiedPumpsCount: 64,
    avgEthanolBlend: '20.0%',
    avgDensity: '748 kg/m³',
    highwayCorridors: ['Delhi - Mumbai Expressway (NE4)', 'Delhi - Jaipur Highway (NH48)', 'Yamuna Expressway', 'Eastern Peripheral Expressway'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Auto Care',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Neeti Marg, Chanakyapuri',
        area: 'Chanakyapuri / Central Delhi',
        verifiedDate: 'August 16, 2026',
      },
      {
        brand: 'HPCL Auto Centre',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Golf Course Extension Road',
        area: 'Gurgaon Sector 56',
        verifiedDate: 'August 15, 2026',
      },
      {
        brand: 'IndianOil Flagship Outpost',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Sector 16A, Near DND Toll',
        area: 'Noida Film City',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Delhi NCR experiences extreme weather—scorching 45°C summers and freezing 4°C winter mornings. Ethanol-blended E20 fuel suffers severe vapor lock during Delhi summers and cold-start misfires during winter fog. Pure E0 petrol eliminates both issues completely for performance car and motorcycle owners.
    `,
    faqs: [
      {
        q: 'Which petrol stations in Delhi NCR dispense genuine 0% ethanol petrol?',
        a: 'Key outlets include IOCL Chanakyapuri, HPCL Golf Course Road Gurgaon, and IOCL Sector 16A Noida. The E0 Finder app provides live verification status and navigation.',
      },
      {
        q: 'Why should I avoid E20 fuel for track days at BIC Greater Noida?',
        a: 'E20 fuel has 6–8% lower energy density and runs lean under sudden throttle snap. Pure E0 fuel (XP100) ensures maximum wheel horsepower and consistent cylinder head temperatures on track.',
      },
    ],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Mumbai - XP100 and E0 Map',
    metaDescription: 'Find E0 petrol pumps in Mumbai, Bandra, Worli and Navi Mumbai. Search XP100, poWer100 and ethanol-free station reports before city or expressway drives.',
    popularAreas: ['Bandra West', 'Worli Sea Face', 'BKC (Bandra Kurla Complex)', 'Juhu', 'Powai', 'Palm Beach Road (Navi Mumbai)', 'Thane West', 'South Mumbai (Nariman Point)'],
    verifiedPumpsCount: 58,
    avgEthanolBlend: '19.8%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Mumbai - Pune Expressway', 'Mumbai - Nashik Highway (NH160)', 'Mumbai - Ahmedabad Highway (NH48)', 'Eastern Freeway'],
    featuredStations: [
      {
        brand: 'BPCL Company COCO',
        fuelGrade: 'Speed 97 / XP100',
        location: 'Bandra Reclamation, Near Sea Link Entry',
        area: 'Bandra West',
        verifiedDate: 'August 16, 2026',
      },
      {
        brand: 'IndianOil Jubilee Bunk',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Dr. Annie Besant Road, Worli',
        area: 'Worli / South Mumbai',
        verifiedDate: 'August 15, 2026',
      },
      {
        brand: 'HPCL Millennium Outlet',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Palm Beach Road, Sector 19',
        area: 'Vashi / Navi Mumbai',
        verifiedDate: 'August 13, 2026',
      },
      {
        brand: 'IndianOil COCO BKC',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Bandra-Kurla Complex, G-Block',
        area: 'BKC / Kurla',
        verifiedDate: 'August 24, 2026',
      },
    ],
    cityGuide: `
Mumbai's coastal monsoon climate presents the most severe **fuel phase separation** risk profile in western India. Between June and October, ambient relative humidity across South Mumbai, Bandra, and Navi Mumbai routinely exceeds 85% to 92%. 

When vehicles running standard E20 petrol sit in underground basement parking or sea-facing garages along Marine Drive, Carter Road, or Worli Sea Face, moisture is drawn through the fuel tank breather within 20 to 25 days. The resulting water-alcohol slug settles at the bottom of the fuel tank directly around electric fuel pump pickups.

For Mumbai's thriving supercar and sports bike community heading out for early morning Sunday drives to Lonavala via the Mumbai-Pune Expressway, or breakfast rides towards Charoti on the Ahmedabad Highway (NH48), filling up with verified unblended 0% ethanol petrol is essential. Pure E0 petrol eliminates hesitation, prevents fuel pump cavitation, and maintains factory boost targets on high-compression turbo engines.
    `,
    faqs: [
      {
        q: 'Where can I buy ethanol-free petrol in Mumbai before the Mumbai-Pune Expressway?',
        a: 'The BPCL Bandra Reclamation outlet right before the Rajiv Gandhi Sea Link and the HPCL Millennium bunk on Palm Beach Road in Vashi offer verified 100-octane E0 petrol. Check E0 Finder before refueling for live morning stock telemetry.',
      },
      {
        q: 'How does Mumbai humidity affect parked sports cars and superbikes?',
        a: 'When relative humidity exceeds 80%, the 20% ethanol in regular petrol saturates with water vapour within 3 to 4 weeks, triggering phase separation that leaves acidic water pooling at the tank floor. Storing vehicles with pure E0 petrol provides 6 to 12 months of corrosion-free stability.',
      },
      {
        q: 'Is Shell V-Power in Mumbai ethanol-free?',
        a: 'No. Shell V-Power dispensed across Mumbai and Thane contains between 15% and 20% ethanol blended with proprietary DYNAFLEX cleaning additives. For verified 0% ethanol, you must use 100-octane fuels like XP100 or poWer100.',
      },
      {
        q: 'Which fuel stations in South Mumbai dispense XP100?',
        a: 'IndianOil Jubilee Bunk on Dr. Annie Besant Road in Worli is the premier verified XP100 distributor serving South Mumbai, Nariman Point, and Lower Parel motorists.',
      },
    ],
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Pune - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Pune near Baner, Koregaon Park, Kothrud and Hinjewadi. Search XP100, poWer100 and ethanol-free reports for rides and drives.',
    popularAreas: ['Baner', 'Koregaon Park', 'Kothrud', 'Viman Nagar', 'Hinjewadi IT Park', 'Senapati Bapat Road', 'Aundh', 'Wakad'],
    verifiedPumpsCount: 28,
    avgEthanolBlend: '19.8%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Pune - Mumbai Expressway', 'Pune - Bengaluru Highway (NH48)', 'Pune - Solapur Highway (NH65)', 'Pune - Nashik Highway'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Outlet',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Senapati Bapat Road, Near ICC Tech Park',
        area: 'SB Road / Shivajinagar',
        verifiedDate: 'August 16, 2026',
      },
      {
        brand: 'HPCL Auto Care',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Baner-Pashan Link Road',
        area: 'Baner / Aundh',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Pune has a thriving automotive engineering and vintage restoration community (Yamaha RD350, RX100, Yezdi Roadking, and classic Bullet 350s). The E0 Finder app maps all verified 100-octane E0 bunks in Pune to keep classic carburettors free from white/green zinc crust.
    `,
    faqs: [
      {
        q: 'Which petrol bunks in Pune sell 100% ethanol-free petrol?',
        a: 'IOCL on Senapati Bapat Road and HPCL on Baner-Pashan Link Road regularly dispense verified XP100/poWer100 unblended fuel. Check live reports on E0 Finder.',
      },
    ],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    metaTitle: 'E0 Petrol Pumps in Hyderabad - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Hyderabad near Gachibowli, Jubilee Hills, Banjara Hills and HITEC City. Search XP100 and poWer100 fuel reports.',
    popularAreas: ['Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'HITEC City', 'Kondapur', 'Madhapur', 'Secunderabad', 'Financial District'],
    verifiedPumpsCount: 38,
    avgEthanolBlend: '19.2%',
    avgDensity: '743 kg/m³',
    highwayCorridors: ['Hyderabad - Bengaluru Highway (NH44)', 'Hyderabad - Vijayawada Highway (NH65)', 'Nehru Outer Ring Road (ORR)'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Jubilee',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Road No. 36, Jubilee Hills',
        area: 'Jubilee Hills',
        verifiedDate: 'August 15, 2026',
      },
      {
        brand: 'HPCL Auto Care',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Gachibowli Main Road, Near Bio-Diversity Park',
        area: 'Gachibowli / HITEC City',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Hyderabad's high-speed Nehru Outer Ring Road (ORR) and NH44 highway corridor are popular for weekend rides. Fueling with verified 0% ethanol petrol ensures crisp throttle response and maximum fuel range.
    `,
    faqs: [
      {
        q: 'Where can I find XP100 in Hyderabad?',
        a: 'IOCL Road No. 36 Jubilee Hills and HPCL Gachibowli are top verified stations in Hyderabad on E0 Finder.',
      },
    ],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    metaTitle: 'E0 Petrol Pumps in Chennai - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Chennai near ECR, OMR, Anna Nagar and Guindy. Search XP100, poWer100 and ethanol-free fuel reports for city and highway rides.',
    popularAreas: ['East Coast Road (ECR)', 'Old Mahabalipuram Road (OMR)', 'Anna Nagar', 'Guindy', 'Adyar', 'T. Nagar', 'Velachery', 'Nungambakkam'],
    verifiedPumpsCount: 36,
    avgEthanolBlend: '18.9%',
    avgDensity: '740 kg/m³',
    highwayCorridors: ['East Coast Road (ECR to Pondicherry)', 'Chennai - Bengaluru Highway (NH48)', 'Grand Southern Trunk Road (GST Road NH32)'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Outpost',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'East Coast Road (ECR), Kottivakkam',
        area: 'ECR / Thiruvanmiyur',
        verifiedDate: 'August 15, 2026',
      },
      {
        brand: 'HPCL Auto Care Centre',
        fuelGrade: 'poWer100 (0% Ethanol)',
        location: 'Anna Salai, Near Nandanam Signal',
        area: 'Nandanam / Guindy',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Chennai's famous East Coast Road (ECR) to Mahabalipuram and Pondicherry is South India's premier weekend biking route. Coastal humidity makes ethanol-blended E20 prone to water condensation. E0 Finder helps you fill pure E0 petrol before hitting ECR.
    `,
    faqs: [
      {
        q: 'Where can I get pure E0 petrol on ECR Chennai?',
        a: 'The IndianOil COCO at Kottivakkam on ECR dispenses verified XP100 0% ethanol fuel. Use E0 Finder for live status.',
      },
    ],
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    metaTitle: 'E0 Petrol Pumps in Kolkata - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Kolkata, Salt Lake, New Town, Park Street and EM Bypass. Search XP100 and ethanol-free fuel reports near you.',
    popularAreas: ['Park Street', 'Salt Lake Sector V', 'New Town / Rajarhat', 'EM Bypass', 'Alipore', 'Ballygunge', 'Howrah', 'Gariahat'],
    verifiedPumpsCount: 24,
    avgEthanolBlend: '18.5%',
    avgDensity: '738 kg/m³',
    highwayCorridors: ['Kolkata - Durgapur Expressway (NH19)', 'Kolkata - Digha Highway (NH116B)', 'Kona Expressway'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Station',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'EM Bypass, Near Ruby Hospital',
        area: 'EM Bypass / Kasba',
        verifiedDate: 'August 14, 2026',
      },
      {
        brand: 'BPCL Company Owned Outlet',
        fuelGrade: 'Speed 97 / XP100',
        location: 'Major Arterial Road, Action Area II',
        area: 'New Town / Rajarhat',
        verifiedDate: 'August 22, 2026',
      },
      {
        brand: 'IndianOil Auto Care Centre',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Diamond Harbour Road, Near Alipore Zoo',
        area: 'Alipore / South Kolkata',
        verifiedDate: 'August 25, 2026',
      },
    ],
    cityGuide: `
Kolkata has India's most celebrated community of vintage, classic, and heritage automobile collectors, anchored by organizations like the Automobile Association of Eastern India (AAEI). Classic British roadsters, vintage Ambassadors, Fiat 1100s, and classic Royal Enfield motorcycles are particularly susceptible to ethanol damage.

The tropical humidity of West Bengal, combined with prolonged seasonal parking between classic car rallies and monsoon downpours, causes rapid water absorption in E20 petrol. In older metal fuel tanks with lead-tin solder seams, this moisture accelerates galvanic corrosion and gums up delicate carburetor float needles and jets. 

For modern performance vehicle owners heading out towards Shantiniketan via the Durgapur Expressway (NH19) or towards Digha on NH116B, E0 Finder maps verified pure 0% ethanol pumps along EM Bypass, New Town, and Kona Expressway.
    `,
    faqs: [
      {
        q: 'Where is 0% ethanol fuel available in Kolkata?',
        a: 'The IndianOil COCO outlet on EM Bypass near Ruby General Hospital and the BPCL Major Arterial Road station in New Town are Kolkata’s primary verified 100-octane E0 petrol stations.',
      },
      {
        q: 'Can classic and vintage cars in Kolkata safely run on E20 petrol?',
        a: 'No. Vehicles manufactured before 2010 use nitrile rubber fuel lines, brass float valves, and untreated mild steel tanks that degrade rapidly when exposed to ethanol. Owners should strictly use unblended E0 petrol.',
      },
      {
        q: 'Where can I fuel pure petrol before taking the Kolkata-Durgapur Expressway (NH19)?',
        a: 'Motorists should fuel up at IOCL EM Bypass or BPCL New Town before joining Kona Expressway and the Dankuni toll plaza onto NH19.',
      },
      {
        q: 'How does Kolkata monsoon humidity affect fuel in stored motorcycles?',
        a: 'With monsoon relative humidity frequently reaching 90%, ethanol blends absorb water from tank air within 3 weeks, creating a corrosive bottom layer that destroys electric fuel pumps and clogs fuel injectors.',
      },
    ],
  },
  {
    slug: 'chandigarh',
    name: 'Chandigarh',
    state: 'Punjab / Haryana',
    metaTitle: 'E0 Petrol Pumps in Chandigarh - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Chandigarh, Mohali and Panchkula. Search XP100 and poWer100 station reports before Shimla, Manali or Ladakh routes.',
    popularAreas: ['Sector 17', 'Sector 35', 'Sector 9 (Madhya Marg)', 'Mohali Phase 7', 'Panchkula Sector 5', 'Zirakpur Highway', 'IT Park Chandigarh'],
    verifiedPumpsCount: 31,
    avgEthanolBlend: '20.0%',
    avgDensity: '747 kg/m³',
    highwayCorridors: ['Himalayan Expressway (Chandigarh - Shimla NH5)', 'Chandigarh - Manali Highway (NH21)', 'Ambala - Chandigarh Highway (NH152)'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Outlet',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Madhya Marg, Sector 28',
        area: 'Sector 28 / Madhya Marg',
        verifiedDate: 'August 16, 2026',
      },
    ],
    cityGuide: `
Chandigarh is the gateway for riders heading to Spiti, Ladakh, and Himachal Pradesh. High-altitude cold weather causes ethanol-blended fuels to misfire and freeze fuel lines. Filling with pure E0 petrol in Chandigarh ensures smooth climbing at 10,000+ feet.
    `,
    faqs: [
      {
        q: 'Should I fill E0 petrol in Chandigarh before riding to Ladakh/Spiti?',
        a: 'Yes! High-altitude freezing temperatures cause ethanol water drops to freeze inside carb jets and injector lines. Pure E0 petrol (XP100) prevents high-altitude stalling.',
      },
    ],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    metaTitle: 'E0 Petrol Pumps in Jaipur - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Jaipur near Tonk Road, Ajmer Road and JLN Marg. Search XP100 and ethanol-free fuel reports for classic cars and highway drives.',
    popularAreas: ['Tonk Road', 'C-Scheme', 'Vaishali Nagar', 'JLN Marg', 'Malviya Nagar', 'Ajmer Road', 'Raja Park', 'Mansarovar'],
    verifiedPumpsCount: 29,
    avgEthanolBlend: '19.6%',
    avgDensity: '746 kg/m³',
    highwayCorridors: ['Delhi - Mumbai Expressway (via Dausa / Jaipur)', 'Jaipur - Delhi Highway (NH48)', 'Jaipur - Ajmer Expressway'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Outpost',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'JLN Marg, Near Jawahar Kala Kendra',
        area: 'JLN Marg / Malviya Nagar',
        verifiedDate: 'August 15, 2026',
      },
    ],
    cityGuide: `
Jaipur is home to royal vintage car collections and classic motorcycle rallies. High summer desert temperatures (up to 46°C) cause blended ethanol fuel to boil inside carb bowls (vapor lock). Pure E0 petrol eliminates fuel boiling and vapor lock.
    `,
    faqs: [
      {
        q: 'Where can I find 0% ethanol fuel in Jaipur?',
        a: 'IOCL COCO JLN Marg provides verified 100-octane E0 petrol. View live GPS map on E0 Finder.',
      },
    ],
  },
  {
    slug: 'kochi',
    name: 'Kochi',
    state: 'Kerala',
    metaTitle: 'E0 Petrol Pumps in Kochi - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Kochi near Marine Drive, MG Road, Kakkanad and Edappally. Search XP100 and ethanol-free fuel reports for coastal Kerala.',
    popularAreas: ['Marine Drive', 'Kakkanad InfoPark', 'MG Road', 'Edappally', 'Panampilly Nagar', 'Fort Kochi', 'Kaloor', 'Aluva'],
    verifiedPumpsCount: 25,
    avgEthanolBlend: '18.7%',
    avgDensity: '739 kg/m³',
    highwayCorridors: ['Kochi - Coimbatore Highway (NH544)', 'Kochi - Trivandrum Highway (NH66)', 'Container Terminal Road'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Centre',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'Kaloor - Kadavanthra Road',
        area: 'Kaloor / Kadavanthra',
        verifiedDate: 'August 14, 2026',
      },
      {
        brand: 'BPCL Marine Drive Fuel Hub',
        fuelGrade: 'Speed 97 / XP100',
        location: 'Shanmugham Road, Near High Court Junction',
        area: 'Marine Drive / High Court',
        verifiedDate: 'August 23, 2026',
      },
      {
        brand: 'IndianOil Highway Service Station',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'NH544 Bypass, Near Edappally Toll',
        area: 'Edappally / Bypass',
        verifiedDate: 'August 26, 2026',
      },
    ],
    cityGuide: `
Kochi and the broader coastal belt of Kerala experience over 3,000mm of annual rainfall accompanied by extreme relative humidity ranging from 85% to 95%. In this maritime environment, ethanol-blended petrol (E20) poses an existential threat to both automotive and marine petrol engines.

Ethanol's intense hygroscopic nature means it greedily pulls airborne humidity directly into fuel tanks through breather vents. Within 18 to 25 days of storage, phase separation occurs: the water-saturated ethanol falls out of suspension and pools at the bottom of the fuel tank. 

For leisure boat owners in the backwaters, superbikers riding the Container Terminal Road, and motorists embarking on long Western Ghats highway runs via NH544 or coastal drives on NH66, filling up with verified unblended 0% ethanol petrol is essential to prevent fuel tank rust, clogged high-pressure fuel injectors, and mid-journey breakdown.
    `,
    faqs: [
      {
        q: 'Why is E0 petrol particularly crucial in coastal Kochi and Kerala?',
        a: 'With average atmospheric humidity exceeding 85%, ethanol blends absorb water from the air rapidly, leading to phase separation within 3 weeks. Pure E0 petrol is 100% hydrophobic, preventing water accumulation and corrosion.',
      },
      {
        q: 'Where can I find verified 0% ethanol petrol in Kochi?',
        a: 'Top verified stations include the IndianOil COCO on Kaloor-Kadavanthra Road, BPCL on Shanmugham Road near Marine Drive, and IOCL on the NH544 Edappally bypass. View live reports on E0 Finder.',
      },
      {
        q: 'Can marine outboard boat engines in Kochi run on regular E20 petrol?',
        a: 'No. Outboard motor manufacturers (Yamaha, Mercury, Suzuki Marine) strictly warn against high ethanol blends because moisture in humid sea air immediately separates the fuel, seizing carburetors and fuel pumps.',
      },
      {
        q: 'Where should motorists refuel E0 before driving to Munnar or Wayanad?',
        a: 'Refuel at IndianOil COCO Kaloor or Edappally before exiting the city onto the hill highway routes, where high-octane E0 petrol is unavailable.',
      },
    ],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    metaTitle: 'E0 Petrol Pumps in Ahmedabad - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Ahmedabad near SG Highway, Satellite, Sindhu Bhavan Road and Bodakdev. Search XP100 and ethanol-free station reports.',
    popularAreas: ['SG Highway', 'Sindhu Bhavan Road (SBR)', 'Satellite', 'Bodakdev', 'Prahlad Nagar', 'Vastrapur', 'Bopal', 'Gandhinagar Highway'],
    verifiedPumpsCount: 32,
    avgEthanolBlend: '19.5%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Ahmedabad - Vadodara Expressway (NE1)', 'Ahmedabad - Mumbai Highway (NH48)', 'Ahmedabad - Rajkot Highway'],
    featuredStations: [
      {
        brand: 'IndianOil COCO Station',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'SG Highway, Near Iscon Cross Road',
        area: 'SG Highway / Bodakdev',
        verifiedDate: 'August 16, 2026',
      },
    ],
    cityGuide: `
Ahmedabad has a booming supercar and high-performance bike community centered around SG Highway and Sindhu Bhavan Road. The E0 Finder app gives drivers instant access to verified XP100 pumps before heading onto the Ahmedabad-Vadodara Expressway.
    `,
    faqs: [
      {
        q: 'Where can I find XP100 on SG Highway Ahmedabad?',
        a: 'The IndianOil COCO near Iscon Cross Road on SG Highway is a top verified station on E0 Finder.',
      },
    ],
  },
  {
    slug: 'goa',
    name: 'Goa',
    state: 'Goa',
    metaTitle: 'E0 Petrol Pumps in Goa - XP100 and E0 Map',
    metaDescription: 'Find E0 petrol pumps in Goa near Panaji, Margao, Calangute and Porvorim. Search XP100 and ethanol-free fuel reports for rentals and road trips.',
    popularAreas: ['Panaji', 'Margao', 'Calangute / Baga', 'Porvorim', 'Vasco da Gama', 'Candolim', 'Mapusa', 'Assagao'],
    verifiedPumpsCount: 15,
    avgEthanolBlend: '18.5%',
    avgDensity: '738 kg/m³',
    highwayCorridors: ['Mumbai - Goa Highway (NH66)', 'Goa - Belagavi Highway (NH4A)', 'Atal Setu / Mandovi Bridge Corridor'],
    featuredStations: [
      {
        brand: 'IndianOil Jubilee Bunk',
        fuelGrade: 'XP100 (0% Ethanol)',
        location: 'NH66 Highway, Near Porvorim',
        area: 'Porvorim / North Goa',
        verifiedDate: 'August 14, 2026',
      },
    ],
    cityGuide: `
Vehicles and rental bikes in Goa often sit parked for weeks between tourist seasons. In coastal humidity, E20 petrol degrades into corrosive water-alcohol sludge within 30 days. Filling with verified E0 petrol prevents tank rust and clogged pilot jets.
    `,
    faqs: [
      {
        q: 'Where can I find ethanol-free petrol in Goa?',
        a: 'Verified pumps operate in Porvorim on NH66 and Margao. Check live community reports on the E0 Finder app.',
      },
    ],
  },
  {
    slug: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    metaTitle: 'E0 Petrol Pumps in Lucknow - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Lucknow near Hazratganj, Gomti Nagar, Alambagh and Aliganj. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Aliganj', 'Indira Nagar', 'Vikas Nagar', 'Mahanagar', 'Sahara City'],
    verifiedPumpsCount: 22,
    avgEthanolBlend: '20.0%',
    avgDensity: '746 kg/m³',
    highwayCorridors: ['Lucknow - Agra Expressway', 'Lucknow - Varanasi Highway (NH232)', 'Lucknow - Kanpur Expressway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Faizabad Road, Near Chinhat', area: 'Gomti Nagar Extension', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Lucknow sits on the Agra-Lucknow Expressway corridor. High summer temperatures (45°C+) cause E20 fuel to vaporise in carburettor bowls. E0 petrol eliminates vapor lock on long expressway drives.',
    faqs: [
      { q: 'Where can I find E0 petrol in Lucknow?', a: 'IOCL COCO on Faizabad Road near Chinhat has verified XP100 0% ethanol fuel. Use E0 Finder for live stock updates.' },
    ],
  },
  {
    slug: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    metaTitle: 'E0 Petrol Pumps in Indore - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Indore near AB Road, Vijay Nagar and MR-10. XP100 and poWer100 ethanol-free fuel reports.',
    popularAreas: ['AB Road', 'Vijay Nagar', 'MR-10', 'Palasia', 'Bhawarkuan', 'Sapna Sangeeta Road', 'Bypass Road'],
    verifiedPumpsCount: 18,
    avgEthanolBlend: '19.8%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Indore - Bhopal Highway (NH46)', 'Indore - Ujjain Highway', 'Indore - Ahmedabad Highway (NH47)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'AB Road, Near Treasure Island Mall', area: 'AB Road / Palasia', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Indore is India\'s cleanest city and a growing hub for vintage motorcycle rallies. E0 Finder maps verified unblended pumps on AB Road and the bypass for riders heading to Mhow and Maheshwar.',
    faqs: [
      { q: 'Is XP100 available in Indore?', a: 'Yes, IOCL COCO on AB Road near Treasure Island Mall dispenses verified XP100 E0 fuel. Check E0 Finder for live status.' },
    ],
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    metaTitle: 'E0 Petrol Pumps in Bhopal - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Bhopal near MP Nagar, Hoshangabad Road and Kolar Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['MP Nagar', 'Hoshangabad Road', 'Kolar Road', 'Arera Colony', 'Habibganj', 'Shivaji Nagar', 'Bairagarh'],
    verifiedPumpsCount: 16,
    avgEthanolBlend: '19.6%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Bhopal - Indore Highway (NH46)', 'Bhopal - Jabalpur Highway (NH45)', 'Bhopal - Sagar Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Hoshangabad Road, Near Habibganj Station', area: 'Habibganj / MP Nagar', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Bhopal is the gateway to Pachmarhi and Satpura hills. Cold winter mornings (5°C) cause E20 to misfire in older Royal Enfields. Fuel up with E0 before heading into the Satpura range.',
    faqs: [
      { q: 'Where is ethanol-free petrol available in Bhopal?', a: 'IOCL COCO on Hoshangabad Road near Habibganj Station has verified XP100. Check E0 Finder for directions.' },
    ],
  },
  {
    slug: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Nagpur - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Nagpur near Wardha Road, Sadar and Dharampeth. XP100 and ethanol-free fuel reports for highway drives.',
    popularAreas: ['Wardha Road', 'Sadar', 'Dharampeth', 'Sitabuldi', 'Manish Nagar', 'Hingna Road', 'Kamptee Road'],
    verifiedPumpsCount: 20,
    avgEthanolBlend: '19.5%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Nagpur - Mumbai Samruddhi Expressway', 'Nagpur - Hyderabad Highway (NH44)', 'Wardha Road (NH361)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Wardha Road, Near MIHAN', area: 'Wardha Road / MIHAN', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Nagpur is the Zero Mile hub for long-distance road trips. The Samruddhi Expressway to Mumbai is 700km+ with limited fuel stops. Filling with E0 petrol ensures maximum range per tank.',
    faqs: [
      { q: 'Where can I find XP100 in Nagpur before the Samruddhi Expressway?', a: 'IOCL COCO on Wardha Road near MIHAN has verified XP100 0% ethanol fuel. Check E0 Finder app for live stock.' },
    ],
  },
  {
    slug: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    metaTitle: 'E0 Petrol Pumps in Coimbatore - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Coimbatore near Avinashi Road, RS Puram and Gandhipuram. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Avinashi Road', 'RS Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Singanallur', 'Sulur'],
    verifiedPumpsCount: 19,
    avgEthanolBlend: '18.8%',
    avgDensity: '740 kg/m³',
    highwayCorridors: ['Coimbatore - Ooty Highway (NH181)', 'Coimbatore - Kochi Highway (NH544)', 'Coimbatore - Salem Highway (NH544)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Avinashi Road, Near Tidel Park', area: 'Avinashi Road / Peelamedu', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Coimbatore is the base camp for Nilgiri Hills rides to Ooty and Coonoor. Mountain climbs at 7,000 feet demand maximum fuel energy. E0 petrol delivers 8% more power than E20 on steep gradients.',
    faqs: [
      { q: 'Where can I get E0 petrol in Coimbatore before Ooty?', a: 'IOCL COCO on Avinashi Road near Tidel Park has verified XP100. Fill up before the Nilgiri ghat section.' },
    ],
  },
  {
    slug: 'mysore',
    name: 'Mysuru',
    state: 'Karnataka',
    metaTitle: 'E0 Petrol Pumps in Mysore - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Mysore near Hunsur Road, Vijayanagar and KRS Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Hunsur Road', 'Vijayanagar', 'KRS Road', 'Hebbal', 'Saraswathipuram', 'Jayalakshmipuram', 'Bannimantap'],
    verifiedPumpsCount: 14,
    avgEthanolBlend: '19.2%',
    avgDensity: '742 kg/m³',
    highwayCorridors: ['Bengaluru - Mysuru Expressway (NH275)', 'Mysuru - Ooty Highway (NH766)', 'Mysuru - Coorg Road (NH275)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Hunsur Road, Near Ring Road Junction', area: 'Hunsur Road / Hebbal', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Mysuru is the end point of the Bengaluru-Mysuru Expressway and the gateway to Coorg and Wayanad. Weekend riders from Bangalore stop at Mysuru E0 pumps before heading into the Western Ghats.',
    faqs: [
      { q: 'Is E0 petrol available in Mysore?', a: 'Yes, IOCL COCO on Hunsur Road near the Ring Road Junction has verified XP100. Check E0 Finder for live availability.' },
    ],
  },
  {
    slug: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    metaTitle: 'E0 Petrol Pumps in Vizag - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Visakhapatnam near Beach Road, Dwaraka Nagar and Rushikonda. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Beach Road', 'Dwaraka Nagar', 'Rushikonda', 'Madhurawada', 'Seethammadhara', 'MVP Colony', 'Gajuwaka'],
    verifiedPumpsCount: 17,
    avgEthanolBlend: '19.0%',
    avgDensity: '741 kg/m³',
    highwayCorridors: ['Vizag - Vijayawada Highway (NH16)', 'Vizag - Araku Valley Road', 'Beach Road Corridor'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Beach Road, Near VMRDA Park', area: 'Beach Road / Rushikonda', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Vizag\'s coastal humidity is among the highest in India. Ethanol in E20 absorbs sea moisture, causing phase separation within weeks. E0 petrol is essential for coastal vehicle longevity.',
    faqs: [
      { q: 'Where can I find ethanol-free petrol in Vizag?', a: 'IOCL COCO on Beach Road near VMRDA Park has verified XP100 0% ethanol fuel. Use E0 Finder for directions.' },
    ],
  },
  {
    slug: 'patna',
    name: 'Patna',
    state: 'Bihar',
    metaTitle: 'E0 Petrol Pumps in Patna - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Patna near Bailey Road, Boring Road and Kankarbagh. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Bailey Road', 'Boring Road', 'Kankarbagh', 'Patliputra Colony', 'Danapur', 'Rajendra Nagar', 'Ashiana Nagar'],
    verifiedPumpsCount: 15,
    avgEthanolBlend: '20.0%',
    avgDensity: '747 kg/m³',
    highwayCorridors: ['Patna - Varanasi Highway (NH19)', 'Patna - Ranchi Highway (NH33)', 'Patna - Gaya Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Bailey Road, Near Patna Junction', area: 'Bailey Road / Rajendra Nagar', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Bihar experiences extreme heat (46°C+) and monsoon humidity. Both conditions degrade ethanol-blended fuel rapidly. E0 petrol provides stable performance year-round for Patna\'s bike commuters.',
    faqs: [
      { q: 'Is XP100 available in Patna?', a: 'Yes, IOCL COCO on Bailey Road near Patna Junction has verified XP100. Check E0 Finder for live status.' },
    ],
  },
  {
    slug: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    metaTitle: 'E0 Petrol Pumps in Surat - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Surat near Adajan, Vesu, Athwa and Ring Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Adajan', 'Vesu', 'Athwa', 'Ring Road', 'Dumas Road', 'Piplod', 'Varachha', 'Katargam'],
    verifiedPumpsCount: 21,
    avgEthanolBlend: '19.5%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Surat - Mumbai Highway (NH48)', 'Surat - Ahmedabad Expressway (NE1)', 'Surat - Nashik Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Ring Road, Near Piplod', area: 'Ring Road / Vesu', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Surat is India\'s diamond and textile capital with a thriving superbike community. The coastal humidity near Dumas Beach accelerates ethanol damage. E0 petrol protects high-value engines.',
    faqs: [
      { q: 'Where can I find E0 petrol in Surat?', a: 'IOCL COCO on Ring Road near Piplod has verified XP100 0% ethanol fuel. Use E0 Finder for turn-by-turn navigation.' },
    ],
  },
  {
    slug: 'vadodara',
    name: 'Vadodara',
    state: 'Gujarat',
    metaTitle: 'E0 Petrol Pumps in Vadodara - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Vadodara near Alkapuri, Race Course and Akota. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Alkapuri', 'Race Course', 'Akota', 'Manjalpur', 'Old Padra Road', 'Fatehgunj', 'Gotri'],
    verifiedPumpsCount: 16,
    avgEthanolBlend: '19.4%',
    avgDensity: '743 kg/m³',
    highwayCorridors: ['Ahmedabad - Vadodara Expressway (NE1)', 'Vadodara - Mumbai Highway (NH48)', 'Vadodara - Indore Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Alkapuri, Near Sayaji Garden', area: 'Alkapuri / Race Course', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Vadodara sits on the Ahmedabad-Vadodara Expressway, one of India\'s best-maintained motorways. E0 petrol ensures maximum cruising range on this 93km expressway corridor.',
    faqs: [
      { q: 'Is ethanol-free petrol available in Vadodara?', a: 'Yes, IOCL COCO in Alkapuri near Sayaji Garden has verified XP100. Check E0 Finder for live reports.' },
    ],
  },
  {
    slug: 'noida',
    name: 'Noida',
    state: 'Uttar Pradesh',
    metaTitle: 'E0 Petrol Pumps in Noida - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Noida near Sector 18, Film City, Greater Noida Expressway. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Sector 18', 'Film City', 'Sector 62', 'Greater Noida Expressway', 'Sector 137', 'Pari Chowk', 'Knowledge Park'],
    verifiedPumpsCount: 26,
    avgEthanolBlend: '20.0%',
    avgDensity: '748 kg/m³',
    highwayCorridors: ['Yamuna Expressway (Noida - Agra)', 'Greater Noida Expressway', 'DND Flyway to Delhi'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Sector 16A, Near DND Toll', area: 'Film City / Sector 16A', verifiedDate: 'September 11, 2026' },
    ],
    cityGuide: 'Noida is home to the Buddh International Circuit (BIC) and a massive performance car community. Track day enthusiasts need pure E0 petrol for consistent power delivery at high RPM.',
    faqs: [
      { q: 'Where can I get E0 petrol in Noida before BIC track days?', a: 'IOCL COCO at Sector 16A near DND Toll has verified XP100. Also check Greater Noida Expressway stations on E0 Finder.' },
    ],
  },
  {
    slug: 'gurugram',
    name: 'Gurugram',
    state: 'Haryana',
    metaTitle: 'E0 Petrol Pumps in Gurgaon - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Gurugram near Golf Course Road, MG Road, Sohna Road and Dwarka Expressway. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Golf Course Road', 'MG Road', 'Sohna Road', 'Dwarka Expressway', 'Sector 29', 'Cyber City', 'Udyog Vihar'],
    verifiedPumpsCount: 30,
    avgEthanolBlend: '20.0%',
    avgDensity: '748 kg/m³',
    highwayCorridors: ['Delhi - Jaipur Highway (NH48)', 'Dwarka Expressway', 'KMP Expressway'],
    featuredStations: [
      { brand: 'HPCL Auto Centre', fuelGrade: 'poWer100 (0% Ethanol)', location: 'Golf Course Extension Road, Sector 56', area: 'Golf Course Road / Sector 56', verifiedDate: 'September 11, 2026' },
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'MG Road, Near IFFCO Chowk', area: 'MG Road / IFFCO Chowk', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Gurugram has India\'s highest concentration of luxury and sports cars. Golf Course Road and Cyber City are home to premium automobile enthusiasts who demand E0 fuel for their high-performance engines.',
    faqs: [
      { q: 'Where can I find E0 petrol in Gurgaon?', a: 'HPCL on Golf Course Extension Road and IOCL near IFFCO Chowk both have verified E0 fuel. Use E0 Finder for live GPS navigation.' },
    ],
  },
  {
    slug: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    metaTitle: 'E0 Petrol Pumps in Dehradun - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Dehradun near Rajpur Road, GMS Road and Clock Tower. XP100 reports before Mussoorie and Char Dham routes.',
    popularAreas: ['Rajpur Road', 'GMS Road', 'Clock Tower', 'Race Course', 'Ballupur', 'Clement Town', 'Sahastradhara Road'],
    verifiedPumpsCount: 18,
    avgEthanolBlend: '20.0%',
    avgDensity: '747 kg/m³',
    highwayCorridors: ['Dehradun - Mussoorie Highway', 'Dehradun - Haridwar Highway (NH7)', 'Char Dham Highway (NH94)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Rajpur Road, Near Survey Chowk', area: 'Rajpur Road', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Dehradun is the gateway to Mussoorie, Char Dham, and Uttarakhand\'s mountain passes. High-altitude cold causes E20 to freeze in fuel lines above 10,000 feet. Always fill E0 before mountain routes.',
    faqs: [
      { q: 'Should I fill E0 petrol in Dehradun before riding to Mussoorie?', a: 'Yes! Mountain cold causes ethanol-water separation. IOCL COCO on Rajpur Road has verified XP100 E0 fuel.' },
    ],
  },
  {
    slug: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    metaTitle: 'E0 Petrol Pumps in Agra - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Agra near MG Road, Fatehabad Road and Dayal Bagh. XP100 and ethanol-free fuel reports.',
    popularAreas: ['MG Road', 'Fatehabad Road', 'Dayal Bagh', 'Sikandra', 'Kamla Nagar', 'Shahganj', 'Trans Yamuna'],
    verifiedPumpsCount: 16,
    avgEthanolBlend: '20.0%',
    avgDensity: '747 kg/m³',
    highwayCorridors: ['Lucknow - Agra Expressway', 'Yamuna Expressway (Delhi - Agra)', 'Delhi - Mumbai Expressway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'MG Road, Near Agra Cantt', area: 'MG Road / Cantt', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Agra sits at the junction of three major expressways. Road trippers from Delhi via the Yamuna Expressway and from Lucknow via the Agra-Lucknow Expressway stop here for E0 fuel before continuing south.',
    faqs: [
      { q: 'Is E0 petrol available in Agra?', a: 'Yes, IOCL COCO on MG Road near Agra Cantt has verified XP100. Check E0 Finder for live availability.' },
    ],
  },
  {
    slug: 'nashik',
    name: 'Nashik',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Nashik - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Nashik near College Road, Gangapur Road and Mumbai-Agra Highway. XP100 and ethanol-free fuel reports.',
    popularAreas: ['College Road', 'Gangapur Road', 'Indira Nagar', 'Nashik Road', 'Satpur', 'Deolali', 'Panchavati'],
    verifiedPumpsCount: 17,
    avgEthanolBlend: '19.6%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Mumbai - Agra Highway (NH3)', 'Nashik - Pune Highway (NH60)', 'Mumbai - Nashik Highway (NH160)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Mumbai - Agra Highway, Near Dwarka Circle', area: 'Nashik Road / Dwarka', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Nashik is the wine capital of India and a popular stop on the Mumbai-Agra highway. Riders heading to Trimbakeshwar and Sula Vineyards fill E0 petrol here for ghat-section climbing performance.',
    faqs: [
      { q: 'Where can I find XP100 in Nashik?', a: 'IOCL COCO on the Mumbai-Agra Highway near Dwarka Circle has verified XP100. Check E0 Finder for directions.' },
    ],
  },
  {
    slug: 'ludhiana',
    name: 'Ludhiana',
    state: 'Punjab',
    metaTitle: 'E0 Petrol Pumps in Ludhiana - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Ludhiana near Ferozepur Road, Model Town and GT Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Ferozepur Road', 'Model Town', 'GT Road', 'Civil Lines', 'Dugri', 'Pakhowal Road', 'Rajguru Nagar'],
    verifiedPumpsCount: 19,
    avgEthanolBlend: '20.0%',
    avgDensity: '748 kg/m³',
    highwayCorridors: ['Delhi - Amritsar Highway (NH1)', 'Ludhiana - Chandigarh Highway (NH5)', 'GT Road'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'GT Road, Near Jagraon Bridge', area: 'GT Road / Civil Lines', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Ludhiana is Punjab\'s industrial capital with a massive modified car and tractor culture. E0 petrol is preferred for tuned engines and vintage Jeeps that run on older carburettor systems.',
    faqs: [
      { q: 'Is E0 petrol available in Ludhiana?', a: 'Yes, IOCL COCO on GT Road near Jagraon Bridge has verified XP100. Check E0 Finder for live status.' },
    ],
  },
  {
    slug: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    metaTitle: 'E0 Petrol Pumps in Amritsar - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Amritsar near GT Road, Lawrence Road and Majitha Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['GT Road', 'Lawrence Road', 'Majitha Road', 'Ranjit Avenue', 'Mall Road', 'White Avenue', 'Putlighar'],
    verifiedPumpsCount: 16,
    avgEthanolBlend: '20.0%',
    avgDensity: '748 kg/m³',
    highwayCorridors: ['Delhi - Amritsar Highway (NH1)', 'Amritsar - Wagah Border Road', 'Amritsar - Jammu Highway (NH44)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'GT Road, Near Bus Stand', area: 'GT Road / Hall Gate', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Amritsar marks the final fuel stop before Wagah Border and the Jammu-Kashmir highway. Winter temperatures drop to 2°C, causing E20 cold-start failures in motorcycles. E0 petrol eliminates this risk.',
    faqs: [
      { q: 'Where can I get E0 petrol in Amritsar?', a: 'IOCL COCO on GT Road near Bus Stand has verified XP100. Use E0 Finder for live stock and GPS navigation.' },
    ],
  },
  {
    slug: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    metaTitle: 'E0 Petrol Pumps in Trivandrum - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Thiruvananthapuram near MG Road, Kowdiar and NH66 Bypass. XP100 and ethanol-free fuel reports.',
    popularAreas: ['MG Road', 'Kowdiar', 'NH66 Bypass', 'Pattom', 'Vellayambalam', 'Kazhakkoottam', 'Technopark'],
    verifiedPumpsCount: 18,
    avgEthanolBlend: '18.5%',
    avgDensity: '739 kg/m³',
    highwayCorridors: ['Trivandrum - Kochi Highway (NH66)', 'Trivandrum - Nagercoil Highway', 'Trivandrum - Kanyakumari Coastal Road'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'NH66 Bypass, Near Kazhakkoottam', area: 'Kazhakkoottam / Technopark', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Trivandrum\'s tropical coastal climate is the worst in India for ethanol fuel degradation. Year-round humidity above 80% causes rapid phase separation in E20. E0 is essential for vehicle longevity.',
    faqs: [
      { q: 'Is E0 petrol available in Trivandrum?', a: 'Yes, IOCL COCO on NH66 Bypass near Kazhakkoottam has verified XP100. Check E0 Finder for live reports.' },
    ],
  },
  {
    slug: 'mangaluru',
    name: 'Mangaluru',
    state: 'Karnataka',
    metaTitle: 'E0 Petrol Pumps in Mangalore - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Mangaluru near Hampankatta, Kadri and NH66. XP100 and ethanol-free fuel reports for coastal rides.',
    popularAreas: ['Hampankatta', 'Kadri', 'Falnir', 'Bejai', 'Kankanady', 'Surathkal', 'Derebail'],
    verifiedPumpsCount: 13,
    avgEthanolBlend: '19.0%',
    avgDensity: '741 kg/m³',
    highwayCorridors: ['NH66 Coastal Highway', 'Mangalore - Bengaluru Highway (NH75)', 'Mangalore - Kasaragod Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'NH66, Near Surathkal', area: 'Surathkal / NITK', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Mangaluru is on the NH66 coastal highway connecting Mumbai to Kochi. Coastal salt air and humidity make E20 fuel corrosive. E0 petrol protects fuel systems on this 1,600km coastal corridor.',
    faqs: [
      { q: 'Where is ethanol-free petrol available in Mangalore?', a: 'IOCL COCO on NH66 near Surathkal has verified XP100. Check E0 Finder for live directions.' },
    ],
  },
  {
    slug: 'raipur',
    name: 'Raipur',
    state: 'Chhattisgarh',
    metaTitle: 'E0 Petrol Pumps in Raipur - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Raipur near GE Road, VIP Road and Shankar Nagar. XP100 and ethanol-free fuel reports.',
    popularAreas: ['GE Road', 'VIP Road', 'Shankar Nagar', 'Telibandha', 'Pandri', 'Tatibandh', 'Amanaka'],
    verifiedPumpsCount: 14,
    avgEthanolBlend: '19.8%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Raipur - Nagpur Highway (NH53)', 'Raipur - Bilaspur Highway (NH130)', 'Raipur - Jagdalpur Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'GE Road, Near Magneto Mall', area: 'GE Road / Telibandha', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Raipur connects central India to the eastern corridor. Summer temperatures exceed 44°C, causing E20 vapor lock in older vehicles. E0 petrol ensures reliable performance in extreme heat.',
    faqs: [
      { q: 'Is XP100 available in Raipur?', a: 'Yes, IOCL COCO on GE Road near Magneto Mall has verified XP100. Use E0 Finder for live stock updates.' },
    ],
  },
  {
    slug: 'jodhpur',
    name: 'Jodhpur',
    state: 'Rajasthan',
    metaTitle: 'E0 Petrol Pumps in Jodhpur - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Jodhpur near Residency Road, Sardarpura and Pal Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Residency Road', 'Sardarpura', 'Pal Road', 'Ratanada', 'Basni', 'Shastri Nagar', 'Mandore Road'],
    verifiedPumpsCount: 14,
    avgEthanolBlend: '19.8%',
    avgDensity: '746 kg/m³',
    highwayCorridors: ['Jodhpur - Jaipur Highway (NH62)', 'Jodhpur - Jaisalmer Highway (NH15)', 'Jodhpur - Udaipur Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Residency Road, Near Circuit House', area: 'Residency Road / Ratanada', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Jodhpur is the gateway to the Thar Desert and Jaisalmer. Desert temperatures swing from 48°C (summer) to 4°C (winter). E0 petrol handles both extremes without vapor lock or cold-start issues.',
    faqs: [
      { q: 'Where can I find E0 petrol in Jodhpur before Jaisalmer?', a: 'IOCL COCO on Residency Road near Circuit House has verified XP100. Fill up before the desert highway.' },
    ],
  },
  {
    slug: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    metaTitle: 'E0 Petrol Pumps in Udaipur - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Udaipur near Durga Nursery Road, Hiran Magri and Bhatt Ji Ki Bari. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Durga Nursery Road', 'Hiran Magri', 'Bhatt Ji Ki Bari', 'Fateh Sagar Road', 'Sukhadia Circle', 'Ambamata', 'Pratap Nagar'],
    verifiedPumpsCount: 13,
    avgEthanolBlend: '19.6%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Udaipur - Ahmedabad Highway (NH48)', 'Udaipur - Jodhpur Highway', 'Udaipur - Chittorgarh Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Durga Nursery Road, Near Celebration Mall', area: 'Durga Nursery / Hiran Magri', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Udaipur is Rajasthan\'s Lake City and a top destination for heritage car rallies. The Aravalli ghat sections demand maximum engine performance — E0 petrol delivers 8% more energy than E20.',
    faqs: [
      { q: 'Is E0 petrol available in Udaipur?', a: 'Yes, IOCL COCO on Durga Nursery Road near Celebration Mall has verified XP100. Check E0 Finder for GPS directions.' },
    ],
  },
  {
    slug: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    metaTitle: 'E0 Petrol Pumps in Guwahati - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Guwahati near GS Road, Zoo Road and NH27. XP100 and ethanol-free fuel reports for Northeast riders.',
    popularAreas: ['GS Road', 'Zoo Road', 'Ganeshguri', 'Beltola', 'Chandmari', 'Dispur', 'Khanapara'],
    verifiedPumpsCount: 15,
    avgEthanolBlend: '19.5%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Guwahati - Shillong Highway (NH6)', 'Guwahati - Tezpur Highway (NH27)', 'Guwahati - Silchar Highway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'GS Road, Near Ganeshguri', area: 'GS Road / Ganeshguri', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Guwahati is the gateway to Northeast India — Meghalaya, Nagaland, and Arunachal Pradesh. Mountain passes above 8,000 feet require E0 petrol to prevent cold-weather fuel issues.',
    faqs: [
      { q: 'Should I fill E0 petrol in Guwahati before riding to Shillong?', a: 'Yes! IOCL COCO on GS Road near Ganeshguri has verified XP100. E0 is essential for mountain passes.' },
    ],
  },
  {
    slug: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    metaTitle: 'E0 Petrol Pumps in Bhubaneswar - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Bhubaneswar near Janpath, Saheed Nagar and NH16. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Janpath', 'Saheed Nagar', 'Patia', 'Chandrasekharpur', 'Khandagiri', 'Rasulgarh', 'Nayapalli'],
    verifiedPumpsCount: 16,
    avgEthanolBlend: '19.2%',
    avgDensity: '743 kg/m³',
    highwayCorridors: ['Bhubaneswar - Puri Highway (NH316)', 'Bhubaneswar - Kolkata Highway (NH16)', 'Bhubaneswar - Cuttack Expressway'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'NH16, Near Rasulgarh Square', area: 'Rasulgarh / NH16', verifiedDate: 'September 8, 2026' },
    ],
    cityGuide: 'Bhubaneswar\'s coastal proximity and monsoon humidity make it high-risk for ethanol phase separation. E0 petrol is especially recommended for bikes stored during the Odisha monsoon season.',
    faqs: [
      { q: 'Where can I find E0 petrol in Bhubaneswar?', a: 'IOCL COCO on NH16 near Rasulgarh Square has verified XP100. Check E0 Finder for live reports.' },
    ],
  },
  {
    slug: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    metaTitle: 'E0 Petrol Pumps in Madurai - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Madurai near Bypass Road, KK Nagar and Mattuthavani. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Bypass Road', 'KK Nagar', 'Anna Nagar', 'Mattuthavani', 'Goripalayam', 'Tallakulam', 'Vilangudi'],
    verifiedPumpsCount: 14,
    avgEthanolBlend: '18.9%',
    avgDensity: '740 kg/m³',
    highwayCorridors: ['Madurai - Theni Highway', 'Madurai - Rameswaram Highway (NH87)', 'Madurai - Dindigul Highway (NH44)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Bypass Road, Near Mattuthavani Bus Stand', area: 'Bypass Road / Mattuthavani', verifiedDate: 'September 7, 2026' },
    ],
    cityGuide: 'Madurai is the gateway to Rameswaram and the southern Tamil Nadu coast. Coastal salt air accelerates ethanol corrosion. E0 petrol protects fuel systems for temple circuit road trips.',
    faqs: [
      { q: 'Is E0 petrol available in Madurai?', a: 'Yes, IOCL COCO on Bypass Road near Mattuthavani has verified XP100. Check E0 Finder for live availability.' },
    ],
  },
  {
    slug: 'thane',
    name: 'Thane',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Thane - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Thane near Ghodbunder Road, LBS Marg and Eastern Express Highway. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Ghodbunder Road', 'LBS Marg', 'Pokhran Road', 'Manpada', 'Majiwada', 'Naupada', 'Hiranandani Estate'],
    verifiedPumpsCount: 22,
    avgEthanolBlend: '19.8%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Mumbai - Nashik Highway (NH160)', 'Eastern Express Highway', 'Ghodbunder Road to WEH'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Ghodbunder Road, Near Hiranandani', area: 'Ghodbunder Road / Manpada', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Thane is Mumbai\'s northern gateway with direct access to the Mumbai-Nashik highway. Monsoon humidity in the creek area accelerates E20 degradation. E0 petrol is essential for Thane commuters.',
    faqs: [
      { q: 'Where can I find E0 petrol in Thane?', a: 'IOCL COCO on Ghodbunder Road near Hiranandani has verified XP100. Use E0 Finder for turn-by-turn directions.' },
    ],
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Navi Mumbai - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Navi Mumbai near Vashi, Belapur, Panvel and Palm Beach Road. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Vashi', 'CBD Belapur', 'Panvel', 'Kharghar', 'Palm Beach Road', 'Airoli', 'Nerul', 'Seawoods'],
    verifiedPumpsCount: 24,
    avgEthanolBlend: '19.8%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Mumbai - Pune Expressway (via Panvel)', 'Mumbai - Goa Highway (NH66)', 'Palm Beach Road Corridor'],
    featuredStations: [
      { brand: 'HPCL Millennium Outlet', fuelGrade: 'poWer100 (0% Ethanol)', location: 'Palm Beach Road, Sector 19', area: 'Vashi / Palm Beach Road', verifiedDate: 'September 11, 2026' },
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Sion-Panvel Highway, Near Panvel Toll', area: 'Panvel / Kalamboli', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Navi Mumbai is the last stop before the Mumbai-Pune Expressway and the Mumbai-Goa NH66. Fill E0 petrol at Panvel or Vashi before long highway drives to ensure maximum range per tank.',
    faqs: [
      { q: 'Where can I get E0 petrol in Navi Mumbai before the expressway?', a: 'HPCL on Palm Beach Road Vashi and IOCL near Panvel Toll both have verified E0 fuel. Check E0 Finder for live reports.' },
    ],
  },
  {
    slug: 'ranchi',
    name: 'Ranchi',
    state: 'Jharkhand',
    metaTitle: 'E0 Petrol Pumps in Ranchi - XP100 Near You',
    metaDescription: 'Find E0 petrol pumps in Ranchi near Main Road, Harmu, Kanke Road and Bariatu. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Main Road', 'Harmu Housing Colony', 'Kanke Road', 'Bariatu', 'Doranda', 'Lalpur', 'Hinoo'],
    verifiedPumpsCount: 12,
    avgEthanolBlend: '19.4%',
    avgDensity: '744 kg/m³',
    highwayCorridors: ['Ranchi - Jamshedpur Highway (NH33)', 'Ranchi - Bokaro Highway', 'Ranchi - Patratu Valley Corridor'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Main Road, Near Overbridge', area: 'Main Road / Overbridge', verifiedDate: 'September 10, 2026' },
    ],
    cityGuide: 'Ranchi sits at 650m elevation on the Chota Nagpur plateau with scenic drives like Patratu Valley. High altitude and steep ghats demand crisp throttle response and pure combustion with E0 petrol.',
    faqs: [
      { q: 'Where can I find E0 petrol in Ranchi?', a: 'IOCL COCO on Main Road near the Overbridge stocks verified XP100. Check E0 Finder for latest community tests.' },
    ],
  },
  {
    slug: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    metaTitle: 'E0 Petrol Pumps in Varanasi - XP100 Locator',
    metaDescription: 'Find E0 petrol pumps in Varanasi near Cantt, Sigra, Maldahiya and NH19. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Cantt', 'Sigra', 'Maldahiya', 'Lanka', 'Bhelupur', 'Shivpur', 'Rath Yatra'],
    verifiedPumpsCount: 14,
    avgEthanolBlend: '19.6%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Varanasi - Prayagraj Highway (NH19)', 'Varanasi - Lucknow Highway (NH31)', 'Purvanchal Expressway Link'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Cantt Railway Station Road, Maldahiya', area: 'Cantt / Maldahiya', verifiedDate: 'September 9, 2026' },
    ],
    cityGuide: 'Varanasi is a crucial transit hub connecting eastern UP and Bihar via NH19. Extreme heat in summer and stop-and-go congestion along the ghats make E0 petrol critical to prevent vapor lock and fuel system deposits.',
    faqs: [
      { q: 'Is E0 petrol available in Varanasi?', a: 'Yes, IOCL COCO on Cantt Station Road near Maldahiya has verified XP100. Open E0 Finder for live GPS routing.' },
    ],
  },
  {
    slug: 'aurangabad',
    name: 'Aurangabad',
    state: 'Maharashtra',
    metaTitle: 'E0 Petrol Pumps in Aurangabad (Chhatrapati Sambhajinagar) - XP100 Map',
    metaDescription: 'Find E0 petrol pumps in Aurangabad near Jalna Road, CIDCO and Samruddhi Mahamarg. XP100 and ethanol-free fuel reports.',
    popularAreas: ['Jalna Road', 'CIDCO', 'Kranti Chowk', 'Beed Bypass', 'Railway Station Road', 'Waluj', 'Chikalthana'],
    verifiedPumpsCount: 15,
    avgEthanolBlend: '19.7%',
    avgDensity: '745 kg/m³',
    highwayCorridors: ['Samruddhi Mahamarg Expressway', 'Jalna Road (NH753F)', 'Pune - Aurangabad Highway (NH60/NH753)'],
    featuredStations: [
      { brand: 'IndianOil COCO', fuelGrade: 'XP100 (0% Ethanol)', location: 'Jalna Road, Near CIDCO Bus Stand', area: 'CIDCO / Jalna Road', verifiedDate: 'September 11, 2026' },
    ],
    cityGuide: 'Aurangabad (Chhatrapati Sambhajinagar) is the heart of Marathwada and a major hub along the Samruddhi Mahamarg expressway (120 km/h speed limit). High-speed cruising on the expressway requires pure E0 petrol to keep cylinder temperatures lower and avoid knock.',
    faqs: [
      { q: 'Where can I get E0 petrol in Aurangabad before entering Samruddhi Mahamarg?', a: 'IOCL COCO on Jalna Road near CIDCO has verified XP100. Use E0 Finder for turn-by-turn navigation.' },
    ],
  },
]
