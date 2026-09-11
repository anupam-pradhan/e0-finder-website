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
    ],
    cityGuide: `
Mumbai's coastal monsoon humidity creates a high risk for **fuel phase separation** in vehicles running E20 blended petrol. When humidity exceeds 80%, ethanol inside fuel tanks absorbs water and settles at the bottom. Filling with verified E0 petrol prevents tank corrosion and fuel pump failures.
    `,
    faqs: [
      {
        q: 'Where can I buy ethanol-free petrol in Mumbai before the Mumbai-Pune Expressway?',
        a: 'The BPCL Bandra Reclamation outlet and HPCL Vashi bunk on Palm Beach Road both offer verified unblended and 100-octane fuels. Check E0 Finder for live morning stock updates.',
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
    ],
    cityGuide: `
Kolkata has rich classic vehicle clubs and heritage car rallies. Humid monsoon seasons accelerate ethanol phase separation in metal fuel tanks. E0 Finder maps verified unblended bunks along EM Bypass and New Town.
    `,
    faqs: [
      {
        q: 'Where is 0% ethanol fuel available in Kolkata?',
        a: 'IOCL COCO on EM Bypass near Ruby Hospital is Kolkata’s top verified XP100 station. Check E0 Finder for updates.',
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
    ],
    cityGuide: `
Kerala receives over 3,000mm of annual rainfall. High humidity accelerates ethanol phase separation, leading to water accumulation in vehicle and marine boat fuel tanks. E0 Finder maps verified unblended pumps across Kochi and NH66.
    `,
    faqs: [
      {
        q: 'Why is E0 petrol recommended for coastal Kerala?',
        a: 'Ethanol is hygroscopic and pulls water from coastal humid air into fuel tanks within 2 to 3 weeks. Pure E0 petrol is completely hydrophobic and immune to moisture absorption.',
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
]
