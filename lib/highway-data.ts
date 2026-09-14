export interface HighwayStop {
  stationName: string
  fuelGrade: string
  kmMarker: string
  sideOfHighway: 'towards-destination' | 'towards-origin' | 'both'
  landmark: string
  testedDensity?: string
  lastVerified: string
}

export interface HighwayCorridor {
  slug: string
  name: string
  highwayNumber: string
  lengthKm: number
  originCity: string
  destinationCity: string
  overview: string
  whyE0Matters: string
  stops: HighwayStop[]
}

export const HIGHWAYS_DATA: HighwayCorridor[] = [
  {
    slug: 'mumbai-pune-expressway',
    name: 'Mumbai – Pune Expressway',
    highwayNumber: 'NH48 / Yashwantrao Chavan Expressway',
    lengthKm: 94.5,
    originCity: 'Mumbai / Navi Mumbai',
    destinationCity: 'Pune',
    overview: 'India\'s busiest expressway with high-speed cruising and steep Bhor Ghat climbing section. Speeds up to 100 km/h with continuous sustained high RPM.',
    whyE0Matters: 'Ascending the steep Bhor Ghat incline places high thermal loads on engines. E0 petrol (XP100/poWer100) prevents knock under high boost and prevents loss of power.',
    stops: [
      {
        stationName: 'HPCL Millennium Outlet',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 0 (Start)',
        sideOfHighway: 'towards-destination',
        landmark: 'Palm Beach Road / Vashi entry corridor before Expressway Toll',
        testedDensity: '746 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Kalamboli',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 8',
        sideOfHighway: 'towards-destination',
        landmark: 'Near Kalamboli junction right before the expressway toll booth',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'BPCL Food Mall Khalapur',
        fuelGrade: 'Speed 97 (Verified Low Blend)',
        kmMarker: 'KM 38',
        sideOfHighway: 'towards-destination',
        landmark: 'Khalapur Food Mall midway plaza before Ghat climb',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Urse Toll Plaza',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 82',
        sideOfHighway: 'both',
        landmark: 'Near Urse Toll Plaza exiting towards Pune / Hinjewadi',
        testedDensity: '744 kg/m³',
        lastVerified: 'September 2026',
      },
    ],
  },
  {
    slug: 'delhi-jaipur-expressway',
    name: 'Delhi – Jaipur Highway & NE4 Expressway',
    highwayNumber: 'NH48 / Delhi-Mumbai Expressway (NE4 link)',
    lengthKm: 270,
    originCity: 'Delhi / Gurugram',
    destinationCity: 'Jaipur',
    overview: 'High-speed corridor linking the capital with Rajasthan. Includes NH48 and the 120 km/h Sohna-Dausa stretch of the Delhi-Mumbai Expressway.',
    whyE0Matters: 'Summer ambient temperatures regularly exceed 45°C. Blended ethanol fuels are prone to vapor lock and rapid evaporation in fuel rails.',
    stops: [
      {
        stationName: 'IndianOil COCO Rajiv Chowk',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 32',
        sideOfHighway: 'towards-destination',
        landmark: 'Rajiv Chowk Service Lane, Gurugram NH48',
        testedDensity: '743 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'HPCL Auto Care Centre Manesar',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 52',
        sideOfHighway: 'towards-destination',
        landmark: 'Opposite IMT Manesar Main Gate',
        testedDensity: '744 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil Highway Nest Neemrana',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 122',
        sideOfHighway: 'both',
        landmark: 'Midway Neemrana bypass rest stop',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IOCL COCO Kukas',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 248',
        sideOfHighway: 'towards-destination',
        landmark: 'Near Kukas RIICO Industrial Area before entering Jaipur',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
    ],
  },
  {
    slug: 'bangalore-mysore-expressway',
    name: 'Bangalore – Mysore Expressway',
    highwayNumber: 'NH275',
    lengthKm: 118,
    originCity: 'Bangalore',
    destinationCity: 'Mysore',
    overview: '10-lane access-controlled expressway cutting transit time between Bangalore and Mysore to 75 minutes. Speed limit 100 km/h.',
    whyE0Matters: 'Popular weekend run for motorcycle groups and sports cars. High constant cruising speeds require consistent fuel density for engine longevity.',
    stops: [
      {
        stationName: 'HPCL Auto Care Centre Kengeri',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 14',
        sideOfHighway: 'towards-destination',
        landmark: 'Mysore Road near Kengeri Metro Station start point',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Ramanagara Bypass',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 48',
        sideOfHighway: 'both',
        landmark: 'Service lane near Ramanagara rest stop',
        testedDensity: '744 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Mandya',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 82',
        sideOfHighway: 'both',
        landmark: 'Induvalu Mandya bypass',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'HPCL Millennium Outlet Mysore Ring Road',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 118 (Arrival)',
        sideOfHighway: 'both',
        landmark: 'Mysore Outer Ring Road near Columbia Asia Junction',
        testedDensity: '744 kg/m³',
        lastVerified: 'September 2026',
      },
    ],
  },
  {
    slug: 'delhi-chandigarh-nh44',
    name: 'Delhi – Chandigarh Corridor',
    highwayNumber: 'NH44 (Grand Trunk Road)',
    lengthKm: 245,
    originCity: 'Delhi',
    destinationCity: 'Chandigarh',
    overview: 'Historic Grand Trunk Road corridor with multiple famous dhabas (Murthal, Karnal). Flattest and highest-volume highway in North India.',
    whyE0Matters: 'Winter temperature drops below 5°C causing severe condensation and phase separation in tanks filled with blended ethanol. E0 provides flawless cold ignition.',
    stops: [
      {
        stationName: 'IndianOil COCO Murthal',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 52',
        sideOfHighway: 'towards-destination',
        landmark: 'Adjacent to Amrik Sukhdev Dhaba, Murthal',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'HPCL Oasis Karnal Lake',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 128',
        sideOfHighway: 'both',
        landmark: 'Karnal Lake Midway Oasis complex',
        testedDensity: '746 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Ambala Cantt',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 198',
        sideOfHighway: 'towards-destination',
        landmark: 'GT Road Ambala bypass before Chandigarh expressway fork',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Sector 33 Chandigarh',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 245 (Arrival)',
        sideOfHighway: 'both',
        landmark: 'Sector 33-B landmark pump',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
    ],
  },
  {
    slug: 'samruddhi-mahamarg',
    name: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg',
    highwayNumber: 'Nagpur – Mumbai Super Communication Expressway',
    lengthKm: 701,
    originCity: 'Nagpur',
    destinationCity: 'Mumbai / Thane (via Igatpuri)',
    overview: 'India\'s longest greenfield expressway engineered for 150 km/h design speed with a legal limit of 120 km/h. Long distances between wayside amenities.',
    whyE0Matters: 'With stretches of 80+ km between fuel stations, running out of fuel or suffering fuel starvation at 120 km/h is dangerous. E0 petrol gives 8-10% higher highway range.',
    stops: [
      {
        stationName: 'IndianOil COCO Shirdi Waypoint Interchange',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 180',
        sideOfHighway: 'both',
        landmark: 'Near Shirdi/Kopargaon expressway interchange toll',
        testedDensity: '745 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'IndianOil COCO Aurangabad Interchange',
        fuelGrade: 'XP100 (0% Ethanol)',
        kmMarker: 'KM 310',
        sideOfHighway: 'both',
        landmark: 'Shendra MIDC Interchange near Aurangabad',
        testedDensity: '744 kg/m³',
        lastVerified: 'September 2026',
      },
      {
        stationName: 'HPCL Express Waypoint Amravati',
        fuelGrade: 'poWer100 (0% Ethanol)',
        kmMarker: 'KM 560',
        sideOfHighway: 'both',
        landmark: 'Badnera/Amravati expressway connector',
        lastVerified: 'September 2026',
      },
    ],
  },
]
