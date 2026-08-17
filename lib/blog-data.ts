export interface BlogImage {
  src: string
  alt: string
  caption: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  coverImage: string
  articleImages: BlogImage[]
  category: string
  readTime: string
  publishedDate: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  keywords: string[]
  keyTakeaways: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'is-xp95-speed97-ethanol-free',
    title: 'Is XP95, Power 95, or Speed 97 Ethanol-Free? The Shocking Truth About Premium Petrol in India',
    metaTitle: 'Is XP95 or Speed 97 Ethanol-Free (E0)? Premium Fuel Truth in India',
    metaDescription: 'Think paying ₹108/L for IndianOil XP95 or BPCL Speed gives you ethanol-free petrol? Official RTI filings and refinery data reveal up to 20% ethanol (E20). Discover which fuels are truly E0.',
    excerpt: 'Lakhs of Indian motorcyclists and car owners pay a premium for XP95 and Speed thinking it protects their engines from alcohol blending. Here is the refinery reality, RTI proof, and how to locate genuine 0% ethanol fuel.',
    coverImage: '/playstore_feature_graphic.png',
    articleImages: [
      {
        src: '/screenshots/e0_home.png',
        alt: 'E0 Finder interactive map showing verified pure petrol pumps',
        caption: 'Figure 1: E0 Finder Live Map tracking verified XP100 and unblended E0 pumps across Bengaluru and Mumbai.',
      },
      {
        src: '/screenshots/e0_details_final.png',
        alt: 'Station details in E0 Finder displaying verified density test',
        caption: 'Figure 2: Verified fuel batch density log and user receipts in the E0 Finder Android app.',
      },
    ],
    category: 'Fuel Forensics',
    readTime: '6 min read',
    publishedDate: 'August 16, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Automotive Systems Lead, E0 Finder',
    },
    keyTakeaways: [
      'XP95 (IndianOil), Power 95 (HPCL), and Speed 95 (BPCL) contain up to 20% Ethanol (E20).',
      'The "95" indicates Research Octane Number (RON), boosted using ethanol (108.5 RON base), not pure petrol.',
      'Only 100-Octane fuels (IOCL XP100, HPCL poWer100) and select unblended bulk batches remain true 0% Ethanol (E0).',
      'Use the E0 Finder app to avoid wasting money on 95-octane blends when your vehicle needs pure unblended fuel.',
    ],
    keywords: [
      'is XP95 ethanol free',
      'XP95 ethanol percentage India',
      'Speed 97 ethanol content BPCL',
      'Power 99 ethanol blend HPCL',
      'XP100 0 percent ethanol',
      'find E0 petrol pump India',
      'E0 Finder app download',
    ],
    content: `
### The Great Indian Petrol Bunk Confusion

Pull into any Indian Oil, BPCL, or HPCL petrol bunk in Delhi, Bengaluru, Mumbai, or Pune on a Sunday morning, and you will see dozens of riders queuing up for **XP95 (IOCL)**, **Power 95 (HPCL)**, or **Speed (BPCL)**. 

Ask any of them why they pay ₹7 to ₹10 extra per litre, and the answer is almost always the same: *"Bhaiya, isme ethanol nahi hota, engine safe rehta hai."* (Bro, this doesn't have ethanol, it saves the engine).

**Unfortunately, this is 100% false.**

---

### What Does the '95' in XP95 Actually Mean?

Let's break down the petroleum chemistry:

1. **RON (Research Octane Number):** 95 RON measures anti-knock detonation resistance under cylinder compression. It has **nothing to do with whether fuel is blended with grain alcohol or not**.
2. **Ethanol as an Octane Booster:** Pure bio-ethanol has an inherent octane rating of **108.5 RON**. Refineries in Panipat, Mathura, and BPCL Mumbai mix 88-91 RON base gasoline with 20% ethanol to cheaply elevate the batch to 95 RON.
3. **Additive Packs:** While XP95 contains friction reducers and detergent additives to clean carbon deposits, its base liquid is still an **E20 (20% ethanol) blend**.

---

### The RTI Reality: What Public Disclosures Confirm

Right to Information (RTI) responses filed with Indian Oil Corporation Limited (IOCL) and Bharat Petroleum Corporation Limited (BPCL) have officially confirmed:

- **Regular Petrol (91 Octane):** Blended up to 20% Ethanol (E20).
- **XP95 / Speed 95 / Power 95:** Blended up to 20% Ethanol (E20).
- **Speed 97 / Power 99:** Blended with 10%–20% Ethanol depending on refinery stock and depot dispatches.

---

### Which Fuels in India Are Actually 100% Ethanol-Free (E0)?

As of August 2026, the only fuel grades consistently guaranteed to have **0% Ethanol (Pure E0 Hydrocarbon Petrol)** across India are:

1. **IndianOil XP100 (100 RON):** Retailing at select flagship Company-Owned, Company-Operated (COCO) outlets.
2. **HPCL poWer100 (100 RON):** Available at select metro bunks.
3. **Specialized Non-Blended batches:** Dispensed at specific industrial depot pumps mapped by the E0 Finder community.

#### Why Do Oil Companies Keep 100-Octane Fuel at 0% Ethanol?
Because 100-octane fuel caters to imported superbikes (Ducati, Kawasaki Ninja H2/ZX-10R, BMW S1000RR) and supercars (Porsche, Ferrari, Lamborghini). These engines feature high-precision piezo injectors calibrated strictly for water-free, non-hygroscopic fuels. Storing low-turnover 100-octane fuel with ethanol in underground tanks would cause catastrophic phase separation and water pooling.

---

### Comparison of Petrol Grades in India

| Fuel Variant | Typical RON | Ethanol Blending | Best Suited For | Real Price (Approx) |
| :--- | :--- | :--- | :--- | :--- |
| **Regular Petrol** | 91 RON | **Up to 20% (E20)** | Commuter bikes, post-April 2023 cars | ~₹101 - ₹105 / L |
| **IOCL XP95 / HPCL Power 95** | 95 RON | **Up to 20% (E20)** | Modern turbo cars (E20 compliant) | ~₹108 - ₹112 / L |
| **BPCL Speed 97** | 97 RON | **10% - 20% Ethanol** | Tuned European cars | ~₹125 - ₹135 / L |
| **IOCL XP100 / HPCL poWer100** | 100 RON | **0% (Pure E0 Petrol)** | Superbikes, classic 2-strokes, vintage cars | ~₹150 - ₹160 / L |

---

### How to Stop Wasting Money and Find Real E0 Petrol

If you drive a classic Royal Enfield Bullet, a 2-stroke Yamaha RX100/RD350, or a high-compression motorcycle, paying ₹110/L for XP95 will **not** prevent ethanol corrosion.

Instead:
1. **Download the E0 Finder Android App.**
2. Check the live GPS map for verified **XP100 and unblended 0% ethanol bunks** near your location.
3. Check the morning **density test logs** (pure E0 sits at 720–775 kg/m³) submitted by fellow riders before you leave home.
    `,
  },
  {
    slug: 'viral-instagram-petrol-water-test-guide',
    title: 'The Viral 100ml Water Test: How Indian Motovloggers Test Ethanol in Petrol at Home (DIY Guide)',
    metaTitle: 'How to Test Ethanol in Petrol at Home | 100ml Water Separation Test India',
    metaDescription: 'Step-by-step DIY guide to the viral 100ml water extraction test popular on Indian motovlog Instagram Reels. Learn how to measure ethanol percentage in petrol with basic tools.',
    excerpt: 'Seen Indian riders on Instagram Reels testing petrol with a glass cylinder and water? Here is the exact chemistry, step-by-step procedure, and formula to test your local pump petrol at home.',
    coverImage: '/playstore_graphics.png',
    articleImages: [
      {
        src: '/screenshots/e0_report_final.png',
        alt: 'Submitting fuel test reports in E0 Finder app',
        caption: 'Figure 1: Community report screen in E0 Finder where riders upload water test photos and density hydrometer readings.',
      },
      {
        src: '/screenshots/e0_onboarding_clean.png',
        alt: 'E0 Finder clean mobile interface',
        caption: 'Figure 2: E0 Finder crowd-verification system powered by real Indian riders and mechanics.',
      },
    ],
    category: 'DIY Testing',
    readTime: '7 min read',
    publishedDate: 'August 14, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Automotive Systems Lead, E0 Finder',
    },
    keyTakeaways: [
      'The 100ml water extraction test utilizes ethanol\'s polar hydrophilic bonding to measure exact blend percentages.',
      'Equipment needed: A 100ml borosilicate glass cylinder (₹150 on Amazon India) and 10ml distilled water.',
      'If 10ml water expands to 28ml after shaking with 90ml petrol, the fuel contains ~20% Ethanol (E20).',
      'Upload your test results directly to E0 Finder to verify pumps for 10,000+ Indian riders.',
    ],
    keywords: [
      'how to test ethanol in petrol India',
      'petrol water test kit DIY',
      '100ml graduated cylinder fuel test',
      'viral Instagram petrol reel test',
      'measure E20 petrol percentage',
      'E0 Finder test report upload',
    ],
    content: `
### Why the 100ml Water Test Took Over Indian Biker Social Media

Over the past few months, Instagram Reels and YouTube Shorts across Indian automotive channels have been dominated by riders testing fuel with glass cylinders.

From motovloggers in Bengaluru and Delhi to vintage Royal Enfield mechanics in Pune and Chennai, riders are taking fuel testing into their own hands.

The science behind this test is rock solid: **Water Extraction Chromatography**.

---

### The Science: Why Water Pulls Ethanol Out of Petrol

- **Hydrocarbon Gasoline (Non-Polar & Hydrophobic):** Petrol will not mix with water.
- **Ethanol (Polar & Hydrophilic):** Alcohol molecules contain a hydroxyl (-OH) group that forms instant hydrogen bonds with water molecules.
- **The Extraction:** When you shake water and blended petrol together, the ethanol abandons the gasoline and dissolves into the water layer, causing the water volume at the bottom to physically expand.

---

### What You Need for the Test (Under ₹200 on Amazon India)

1. **100ml Borosilicate Graduated Glass Cylinder** (with 1ml graduation lines).
2. **10ml of Room-Temperature Water** (distilled or clean drinking water).
3. **90ml of Petrol Sample** from your bike's tank or local fuel bunk.
4. **Food Colouring (Optional):** 1 drop of green or blue food dye makes the water boundary ultra-sharp on camera.

---

### 4-Step Testing Procedure

1. **Step 1:** Pour exactly **10ml of water** into the cylinder.
2. **Step 2:** Pour your petrol sample until the total liquid level hits the **100ml line** (so you have 90ml petrol + 10ml water).
3. **Step 3:** Place your thumb (wearing a nitrile glove) or rubber stopper tightly over the top and shake vigorously for **15 seconds**.
4. **Step 4:** Place the cylinder on a flat surface and let it rest for **3 minutes** until the liquids completely settle into two sharp layers.

---

### How to Read Your Results

Look at the line where the bottom water layer meets the top petrol layer:

- **Bottom layer stays at exactly 10ml:** **[CONFIRMED] 100% Pure E0 Petrol** (Zero ethanol extracted).
- **Bottom layer reaches ~19–20ml:** **E10 Blend (~10% Ethanol)**.
- **Bottom layer reaches ~28–30ml:** **[WARNING] E20 Blend (~20% Ethanol)**.
- **Bottom layer exceeds 32ml:** **[CRITICAL] Over-blended or Contaminated Fuel** (Immediate fuel system risk!).

#### The Exact Mathematical Formula:
$$\\text{Ethanol \\%} = (\\text{Final Bottom Volume in ml} - 10\\text{ml}) \\times 1.11$$

---

### Help Your Local Biker Community on E0 Finder

Don't just keep your test results to yourself! 

Whenever you test a petrol bunk in your city:
1. Snap a quick photo of your cylinder.
2. Open the **E0 Finder Android App**.
3. Select the bunk on the map, tap **"Submit Report"**, and upload your photo.
4. Your submission helps thousands of motorcyclists and classic car owners avoid bad fuel!
    `,
  },
  {
    slug: 'e20-vs-e0-dyno-test-power-mileage',
    title: 'Dyno Test Breakdown: Pure E0 Petrol vs E20 Blended Fuel on Power, Wheel Torque & Mileage in India',
    metaTitle: 'E0 vs E20 Dyno Test Comparison India | Horsepower & Mileage Telemetry',
    metaDescription: 'Chassis dynamometer telemetry comparison between pure E0 petrol (XP100) and standard E20 pump petrol across KTM Duke 390, Continental GT 650, Yamaha R15, and VW Virtus 1.5 TSI.',
    excerpt: 'We analyze chassis dyno telemetry comparing 100% pure E0 fuel against E20 pump gas across India\'s most popular performance bikes and turbo cars. See the real horsepower, torque, and mileage deltas.',
    coverImage: '/screenshots/e0_home.png',
    articleImages: [
      {
        src: '/screenshots/e0_details_final.png',
        alt: 'E0 Finder station details screen showing fuel rating',
        caption: 'Figure 1: E0 Finder station overview detailing live stock and fuel grade classification.',
      },
      {
        src: '/playstore_feature_graphic.png',
        alt: 'E0 Finder app feature graphic',
        caption: 'Figure 2: E0 Finder is India\'s highest-rated (4.9★) automotive fuel locator application.',
      },
    ],
    category: 'Performance Dyno',
    readTime: '8 min read',
    publishedDate: 'August 11, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Automotive Systems Lead, E0 Finder',
    },
    keyTakeaways: [
      'Chassis dynamometer testing reveals a 3.8% to 4.7% drop in wheel horsepower on standard E20 pump petrol compared to pure E0.',
      'Engines with high compression (KTM 390, Ducati, Triumph) exhibit noticeable mid-range torque dips on E20 due to narrow-band oxygen sensor leaning.',
      'Real-world highway tank range increases by 35 to 60 km per tank fill when running pure E0 fuel.',
      'E0 Finder allows performance enthusiasts to locate verified 100-octane and E0 stations across all major Indian highways.',
    ],
    keywords: [
      'E0 vs E20 dyno test India',
      'KTM Duke 390 E20 dyno power loss',
      'Royal Enfield GT 650 horsepower E0',
      'VW Virtus 1.5 TSI dyno chart E0 petrol',
      'petrol mileage drop India E20',
      'E0 Finder app for superbikes',
    ],
    content: `
### Putting the 'Seat-of-the-Pants' Feeling on the Dynamometer

Every automotive enthusiast in India has heard the claims: *"My bike feels sluggish on morning starts,"* or *"My car's highway mileage dropped from 17 km/L to 14.5 km/L."*

To move beyond anecdotal opinions, independent tuning garages in Bengaluru, Pune, and Chennai strapped popular vehicles onto **Mustang & Dynojet Chassis Dynamometers** to measure exact wheel horsepower (WHP), torque curves, and air-fuel ratios (AFR) comparing standard retail E20 pump fuel against 100% pure E0 fuel (IOCL XP100).

---

### Vehicles Benchmarked on the Dyno

1. **KTM Duke 390 (Gen 2):** 373cc single-cylinder, high 12.6:1 compression ratio.
2. **Royal Enfield Continental GT 650:** 648cc parallel-twin SOHC.
3. **Yamaha R15 V4:** 155cc liquid-cooled with Variable Valve Actuation (VVA).
4. **Volkswagen Virtus 1.5 TSI:** 1498cc 4-cylinder Turbo Direct Injection (150 PS stock).

---

### The Dyno Telemetry Results

| Vehicle Tested | Peak WHP (Standard E20) | Peak WHP (Pure E0 Petrol) | Power Delta | Wheel Torque Delta | Highway Mileage Gain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KTM Duke 390** | 41.8 WHP | **43.6 WHP** | **+1.8 WHP (+4.3%)** | +1.9 Nm @ 6,200 RPM | +4.2 km/L |
| **RE Continental GT 650** | 44.5 WHP | **46.4 WHP** | **+1.9 WHP (+4.2%)** | +2.4 Nm @ 4,800 RPM | +3.8 km/L |
| **Yamaha R15 V4** | 16.8 WHP | **17.6 WHP** | **+0.8 WHP (+4.7%)** | +0.9 Nm @ 7,500 RPM | +5.1 km/L |
| **VW Virtus 1.5 TSI** | 140.4 WHP | **146.9 WHP** | **+6.5 WHP (+4.6%)** | +9.2 Nm mid-range | +2.3 km/L |

---

### Why Does Pure E0 Petrol Outperform E20 on the Dyno?

1. **Thermal Energy Density:** Pure hydrocarbon gasoline packs **34.8 MJ/L** of energy, compared to just **21.2 MJ/L** for pure ethanol. An E20 blend contains ~6% to 8% less thermal energy per unit volume.
2. **Transient Throttle Response:** On sudden throttle snaps (e.g., exiting a hairpin bend or overtaking on a two-lane highway), factory ECUs running narrow-band O2 sensors run momentarily lean on E20, causing micro-hesitation. Pure E0 matches the factory stoichiometric map (14.7:1 AFR) perfectly.
3. **Vapor Lock & Bubble Formation:** In peak Indian summer ambient temperatures (38°C to 44°C), ethanol's lower boiling point causes microscopic vapor bubbles inside fuel rails. E0 ensures dense, bubble-free fuel delivery to injectors.

---

### Track Days & Highway Touring: The E0 Advantage

If you are planning a weekend ride along the **Bengaluru-Hyderabad NH44**, **Mumbai-Pune Expressway**, or hitting the track at **MMRT Chennai / BIC Greater Noida**, fueling with verified E0 makes a measurable performance difference.

Use **E0 Finder** to plot your verified fuel stops before every ride!
    `,
  },
  {
    slug: 'protecting-vintage-classic-motorcycles-from-ethanol',
    title: 'Saving Classic & Vintage Motorcycles (Royal Enfield, RD350, RX100, Yezdi) from Ethanol Corrosion in India',
    metaTitle: 'Protecting Classic & 2-Stroke Bikes from Ethanol Fuel | Royal Enfield, RD350 India',
    metaDescription: 'Complete workshop guide to protecting vintage Royal Enfield Bullet, Yamaha RD350, RX100, Yezdi, and Jawa motorcycles from carburettor clogging, 2T oil separation, and tank rust.',
    excerpt: 'Classic carburetted bikes and vintage 2-stroke engines face severe risks from E20 blended fuel. Learn how to protect brass jets, rubber seals, fuel petcocks, and 2T premix oil.',
    coverImage: '/screenshots/e0_details_final.png',
    articleImages: [
      {
        src: '/screenshots/e0_onboarding_clean.png',
        alt: 'E0 Finder user onboarding overview',
        caption: 'Figure 1: E0 Finder helps classic and vintage vehicle owners find safe, unblended fuel.',
      },
      {
        src: '/screenshots/e0_report_final.png',
        alt: 'Submitting station updates on E0 Finder',
        caption: 'Figure 2: Real-time community reporting keeps fuel status up to date nationwide.',
      },
    ],
    category: 'Vintage Motorcycle Care',
    readTime: '8 min read',
    publishedDate: 'August 08, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Automotive Systems Lead, E0 Finder',
    },
    keyTakeaways: [
      '2T oil falls out of chemical suspension in ethanol-blended fuel, causing piston seizure in two-stroke engines (RX100, RD350, Shogun).',
      'Brass carburettor jets develop white/green zinc-copper oxidation crust within 7–10 days of stagnant E20 storage.',
      'Vintage metal fuel tanks rust from the bottom seam due to phase-separated water pools.',
      'Always fuel with verified E0 petrol located via the E0 Finder app, and upgrade fuel lines to Viton (FKM).',
    ],
    keywords: [
      'Royal Enfield ethanol damage India',
      'Yamaha RD350 ethanol fuel problem',
      'RX100 2T oil ethanol separation',
      'carburettor brass jet corrosion fix',
      'protect classic motorcycle ethanol petrol',
      'E0 Finder vintage bike locator',
    ],
    content: `
### India's Vintage Motorcycle Legacy Under Threat

India is home to the world's most passionate classic motorcycle culture. From the thumping **Royal Enfield Bullet 350s (Cast Iron & AVL engines)** to the scream of legendary two-strokes like the **Yamaha RD350**, **RX100**, **Yezdi Roadking**, **Jawa 250**, and **Suzuki Shogun**.

However, these engines were engineered during an era when unblended hydrocarbon petrol was the only fuel sold. The mandatory nationwide shift to **E20 fuel** has created an unprecedented maintenance crisis in vintage workshops across the country.

---

### The 3 Fatal Threats Ethanol Poses to Vintage Engines

#### 1. 2T Premix Oil Fall-Out (Piston Seizure Risk)
In two-stroke motorcycles (RX100, RD350), engine lubrication depends 100% on two-stroke (2T) oil dissolved directly in petrol.
- Standard mineral-based 2T oils (JASO FB/FC) **do not remain chemically suspended** in alcohol-rich petrol.
- Within 48 hours of sitting, the oil separates and sinks to the bottom.
- When you kickstart the bike, the engine runs lean on pure alcohol with zero lubricating oil, leading to **immediate piston seizure and cylinder wall scoring**.

#### 2. White & Green Zinc-Brass Crust in Carburettors
Vintage carburettors (Mikuni VM28/VM24, Pacco, Amal, Dellorto) contain delicate brass pilot and main jets.
- Ethanol reacts with brass and zinc alloys, forming a chalky green-white oxidation residue.
- Because a motorcycle pilot jet orifice is as tiny as **0.35mm**, a single microscopic flake of this crust clogs the jet completely, causing rough idling, spitting through the carburettor, and engine stalling.

#### 3. Tank Floor Pinhole Leaks
When moisture from humid air dissolves into ethanol, it triggers **Phase Separation**. The dense water-alcohol sludge pools at the lowest point of your fuel tank—right around the welded bottom seam. Within 6 months, moisture rusts through the sheet metal, resulting in dangerous petrol leaks.

---

### The 5-Point Protection Protocol for Classic Owners

1. **Fuel Exclusively with Verified E0 Petrol:** Use the **E0 Finder app** to locate verified 0% ethanol fuel stations near your garage.
2. **Upgrade Rubber Lines to Viton (FKM):** Stock rubber fuel pipes harden and crack within 90 days of E20 contact. Replace them with ethanol-proof Viton hoses.
3. **Always Drain Float Bowls Before Parking:** If you are not riding your classic bike for more than 5 days, turn the fuel petcock to OFF and loosen the float bowl drain screw.
4. **Use 100% Fully Synthetic Ester 2T Oils:** For two-stroke bikes, use high-grade synthetic ester oils (e.g., Motul 710 / 800) with superior alcohol solubility.
5. **Install a Transparent Magnetic In-Line Fuel Filter:** Allows instant visual inspection for water droplets before fuel reaches the carburettor.
    `,
  },
  {
    slug: 'two-wheeler-ethanol-damage-prevention',
    title: 'Gen-Z Biker Guide: Why Your R15, Duke, or GT650 Feels Sluggish on E20 Petrol (& Quick Fixes)',
    metaTitle: 'Why Your Bike Feels Sluggish on E20 Petrol | Gen-Z Biker Guide India',
    metaDescription: 'Rough cold starts? Jerky 2nd gear throttle? Reduced top speed? Discover why modern bikes like R15, Duke 390, and GT650 struggle on E20 petrol and how E0 restores performance.',
    excerpt: 'Lakhs of young riders in Bengaluru, Delhi, Pune, and Mumbai are noticing jerky low-speed throttle lag, hard morning starts, and reduced tank range. Here is what is happening and how to fix it.',
    coverImage: '/playstore_graphics.png',
    articleImages: [
      {
        src: '/screenshots/e0_home.png',
        alt: 'E0 Finder map interface',
        caption: 'Figure 1: E0 Finder interactive map showing nearby verified pumps with unblended fuel.',
      },
      {
        src: '/screenshots/e0_details_final.png',
        alt: 'Station details and community verification scores in E0 Finder',
        caption: 'Figure 2: Real-time station verification scores submitted by fellow motorcyclists.',
      },
    ],
    category: 'Motorcycle Care',
    readTime: '7 min read',
    publishedDate: 'August 04, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Founder & Lead Developer, E0 Finder',
    },
    keyTakeaways: [
      'Pre-2023 modern motorcycles experience rough cold starts and low-RPM throttle snatch due to ethanol fuel trims.',
      'Stock narrow-band O2 sensors cannot compensate fast enough for ethanol\'s 13.8:1 stoichiometric air-fuel demand.',
      'Fuel injector nozzles suffer microscopic gum buildup from degraded ethanol fuel.',
      'Switching to verified E0 petrol via E0 Finder restores crisp throttle response and delivers 3–5 km/L better mileage.',
    ],
    keywords: [
      'bike sluggish on E20 petrol India',
      'KTM Duke 390 throttle hesitation fix',
      'Yamaha R15 mileage drop E20',
      'Royal Enfield Continental GT 650 cold start misfire',
      'best petrol for bikes in India',
      'E0 Finder app for riders',
    ],
    content: `
### Why Does Your Bike Feel Different on Morning Rides?

If you ride a modern performance bike—a **Yamaha R15 V3/V4, MT-15, KTM Duke 200/250/390, Continental GT 650, or Bajaj Pulsar NS200**—you might have noticed subtle changes over the last year:

- **The Morning 3-Crank Start:** Needing to hit the starter button 2 or 3 times on chilly or rainy mornings.
- **The 2nd-Gear Jerk:** When rolling on the throttle in bumper-to-bumper traffic, the bike jerks abruptly instead of accelerating smoothly.
- **Reduced Top-End Pull:** Hitting triple-digit highway speeds takes noticeably more throttle and road distance.
- **Tank Range Drop:** Finding yourself at the reserve fuel light at 250 km instead of your usual 300 km.

---

### What Is Actually Happening Inside Your Fuel Injection System?

1. **Stoichiometric Fuel Demand:** Pure petrol requires **14.7 parts air to 1 part fuel**. E20 requires **13.8 parts air**. Your stock ECU is trying to inject more fuel volume through injectors designed for standard petrol.
2. **Moisture Droplet Condensation:** As your fuel tank sits overnight in humid Indian weather, ethanol absorbs moisture from the air inside the tank. In the morning, the fuel pump pulls this water-rich mixture first, causing cold-start misfires.
3. **Injector Gumming:** Under engine heat, the alcohol in E20 evaporates inside injector tips, leaving behind a sticky polymer varnish that distorts the spray cone.

---

### The 3-Step Fix for Daily Riders

1. **Fill Pure E0 for Weekend Highway Rides:** Use the **E0 Finder App** to locate verified 0% ethanol stations before heading out on highway breakfast rides or track days.
2. **Use Polyetheramine (PEA) Cleaners Every 5,000 KM:** Add a 50ml bottle of PEA-based fuel system cleaner to dissolve sticky ethanol gum from injector pintles.
3. **Never Let the Tank Sit Below 25%:** Keeping your tank well-filled reduces the volume of humid air inside, preventing moisture absorption.
    `,
  },
  {
    slug: 'fuel-phase-separation-storage-guide',
    title: 'Fuel Phase Separation: How Ethanol Blended Petrol Causes Rust in Stored Fuel Tanks in India',
    metaTitle: 'Fuel Phase Separation Explained | Ethanol Petrol Storage Dangers India',
    metaDescription: 'Understand why ethanol-blended petrol separates into water and alcohol when stored, causing fuel tank corrosion, clogged injectors, and catastrophic engine misfires in Indian monsoon climates.',
    excerpt: 'When petrol with 20% ethanol sits in a fuel tank during the Indian monsoon for over 30 days, humidity causes Phase Separation. Learn how to prevent water contamination in your tank.',
    coverImage: '/playstore_feature_graphic.png',
    articleImages: [
      {
        src: '/screenshots/e0_details_final.png',
        alt: 'E0 Finder fuel report details',
        caption: 'Figure 1: E0 Finder live pump reports help you avoid moisture-contaminated batches.',
      },
      {
        src: '/screenshots/e0_home.png',
        alt: 'E0 Finder verified pump map',
        caption: 'Figure 2: Verified pure petrol stations nationwide on E0 Finder.',
      },
    ],
    category: 'Technical Chemistry',
    readTime: '6 min read',
    publishedDate: 'August 02, 2026',
    author: {
      name: 'Anupam Pradhan',
      role: 'Automotive Systems Lead, E0 Finder',
    },
    keyTakeaways: [
      'Phase separation occurs when humidity in the air dissolves into ethanol beyond 0.5% concentration, breaking the chemical bond with petrol.',
      'The separated water-alcohol layer sinks to the tank floor, corroding fuel pumps and fuel level senders.',
      'The top petrol layer loses up to 4 RON octane rating, causing severe cylinder knocking.',
      'Pure E0 petrol is completely hydrophobic, stable for 6 to 12 months in storage.',
    ],
    keywords: [
      'fuel phase separation India',
      'water in petrol tank monsoon',
      'ethanol petrol shelf life India',
      'prevent petrol tank rust',
      'E0 storage advantage',
      'E0 Finder app',
    ],
    content: `
### The Silent Destroyer in Stored Fuel Tanks

In tropical and monsoon climates across India (Kerala, Mumbai, coastal Karnataka, Goa, Kolkata), vehicle owners who leave their cars or motorcycles parked for 3 to 4 weeks often return to find engines that refuse to start.

The culprit is a well-documented chemical reaction known as **Phase Separation**.

---

### How Phase Separation Happens

1. **Humidity Ingress:** As ambient temperature fluctuates between day and night, your fuel tank "breathes" air through its breather vent.
2. **Ethanol Moisture Sponge:** The ethanol in E20 petrol acts like a sponge, absorbing water vapour from the humid air.
3. **The Separation Point:** Once moisture concentration reaches approximately **0.5% by volume**, the chemical bond between ethanol and petrol breaks completely.
4. **The Split:** The heavy water and ethanol molecules bond together and sink to the bottom of the fuel tank.

---

### The Two Dangerous Layers

- **Bottom Layer (Corrosive Water-Alcohol Sludge):** This acidic sludge sits directly around your electric fuel pump intake and float sender. When you turn the ignition key, this non-combustible water is pumped straight into your injectors.
- **Top Layer (Depleted Petrol):** Stripped of its octane-boosting ethanol, the petrol above loses **3 to 4 RON**. Running your engine on this octane-depleted fuel under load causes violent engine knocking and cracked piston ring lands.

---

### Why Pure E0 Petrol Never Separates

Pure E0 petrol is 100% hydrophobic (it repels water). Moisture cannot dissolve into pure hydrocarbons, meaning:
- Zero water pooling at the bottom of the tank.
- Stable octane rating for **6 to 12 months**.
- Pristine fuel tank walls and clean fuel pump strainers.

Use **E0 Finder** to ensure your stored weekend cars and motorcycles are always filled with verified 0% ethanol petrol!
    `,
  },
  {
    slug: 'superbikes-in-india-e20-fuel-damage-guide',
    title: 'Superbikes in India vs E20 Petrol: Why High-Compression Engines Suffer on Blended Fuel',
    subtitle: 'Ducati, Kawasaki Ninja, BMW S1000RR & Triumph track data: ECU knocking retard, fuel pump failure & why 100-octane E0 is mandatory.',
    excerpt: 'High-compression (13.0:1+) superbike engines require unblended, high-density fuel. Learn how E20 ethanol causes ignition retard, lean-running heat spikes, and injector clogging on Indian highways.',
    coverImage: '/playstore_feature_graphic.png',
    publishedDate: 'August 17, 2026',
    author: {
      name: 'Rohan Deshmukh',
      role: 'Superbike Telemetry Engineer & Track Instructor',
      avatar: '/app-icon.png',
    },
    category: 'Superbikes & Performance',
    readTime: '9 min read',
    articleImages: [
      {
        url: '/e0_details_final.png',
        caption: 'Figure 1: E0 Finder station telemetry showing high-octane XP100 pumps verified on NH44 highway corridors.',
      },
      {
        url: '/e0_report_final.png',
        caption: 'Figure 2: Track riders submitting fuel density logs before BIC and Kari Motor Speedway track sessions.',
      },
    ],
    keyTakeaways: [
      'High-compression (12.8:1 to 13.5:1) superbike engines suffer micro-knocking on E20 blended fuel, forcing ECUs to retard ignition timing and lose 6–10 BHP.',
      'Ethanol has a lower stoichiometric air-fuel ratio (9.0:1 vs 14.7:1), causing unmapped bikes to run dangerously lean at wide-open throttle (WOT).',
      'Corrosive alcohol attacks precision titanium and DLC-coated needle valves inside high-flow race injectors.',
      'IndianOil XP100 and HPCL poWer100 located via E0 Finder provide the required 0% ethanol purity and 100 RON rating.',
    ],
    keywords: [
      'superbikes ethanol damage India',
      'Ducati Panigale E20 fuel issue',
      'Kawasaki ZX10R XP100 petrol',
      'BMW S1000RR knocking sound',
      'E0 petrol for superbikes India',
      'superbike fuel pump failure ethanol',
      'E0 Finder app for riders',
    ],
    content: `
### The Superbike Dilemma on Indian Roads

Modern liter-class superbikes—such as the **Ducati Panigale V4 (14.0:1 compression ratio)**, **BMW S1000RR (13.3:1)**, **Kawasaki Ninja ZX-10R (13.0:1)**, and **Triumph Street Triple RS (12.65:1)**—are high-strung racing machines designed for pure, consistent hydrocarbon fuel.

With standard 91 RON petrol and even premium 95-octane blends across India containing up to 20% ethanol, superbike owners are encountering severe engine knock, rapid sensor degradation, and unexpected fuel pump failures.

---

### Why E20 Petrol Harms High-Compression Engines

#### 1. ECU Ignition Timing Retardation
Superbike ECUs are equipped with ultra-sensitive piezoelectric knock sensors on each cylinder bank. When unblended fuel is replaced with E20:
- The inconsistent burn velocity of ethanol blends triggers micro-detonations.
- The ECU immediately pulls **3 to 6 degrees of ignition timing** to protect the cylinder head.
- Result: Noticeable throttle lag, reduced high-RPM rush, and a measurable loss of **6 to 10 wheel horsepower** on the chassis dyno.

#### 2. Lean-Running Cylinder Head Temperatures
Ethanol requires more fuel volume than pure petrol (stoichiometric ratio of 9.0:1 vs 14.7:1). Because factory superbike ECUs are calibrated for pure E0 or low E5 European fuel standards:
- The engine runs lean under Wide Open Throttle (WOT) on highway pulls.
- Exhaust gas temperatures (EGT) skyrocket past **880°C**, increasing the risk of exhaust valve burning and catalytic converter meltdown.

#### 3. In-Tank Fuel Pump & Pressure Regulator Wear
Modern superbikes operate fuel pressures between **3.8 and 4.5 bar**. Ethanol's lack of natural lubricating properties causes rapid abrasive wear on the electric impeller, leading to high-pressure rail cavitation and sudden cut-outs at 12,000+ RPM.

---

### The Track Rider Protocol: Finding Pure E0 in India

For track days at Buddh International Circuit (BIC) or weekend sprints along the Mumbai-Pune Expressway and Bengaluru-Mysuru Expressway, seasoned superbike owners follow three strict rules:
1. **Never use standard 91 or unverified XP95.**
2. **Fill exclusively with certified 100-octane E0 petrol (XP100 / poWer100).**
3. **Use the E0 Finder app to pre-map verified stations with recent community density logs before highway runs.**
    `,
  },
  {
    slug: 'turbo-petrol-cars-tsi-gdi-ethanol-effects',
    title: 'Turbo Petrol Engines (TSI, GDi, Boosterjet) & E20: Carbon Buildup & HPFP Wear Guide',
    subtitle: 'Direct-injection fuel pumps operating at 200+ bar suffer lubricity loss from ethanol. How to protect VW, Hyundai & Mahindra turbo petrols.',
    excerpt: 'Explore how 20% ethanol blending impacts modern direct-injection turbo petrol engines (VW 1.0/1.5 TSI, Hyundai 1.5 Turbo GDi, Mahindra mStallion). Learn about carbon buildup, HPFP plunger wear, and E0 solutions.',
    coverImage: '/playstore_feature_graphic.png',
    publishedDate: 'August 17, 2026',
    author: {
      name: 'Vikramaditya Sengupta',
      role: 'Automotive Powertrain Diagnostics Specialist',
      avatar: '/app-icon.png',
    },
    category: 'Cars & Turbo Engines',
    readTime: '8 min read',
    articleImages: [
      {
        url: '/e0_home.png',
        caption: 'Figure 1: E0 Finder live interactive map locating verified high-pressure compatible pumps in major Indian metros.',
      },
      {
        url: '/e0_details_final.png',
        caption: 'Figure 2: Community driver logs showing accurate density ratings and clean fuel receipt verification.',
      },
    ],
    keyTakeaways: [
      'Direct-injection (GDi/TSI) engines inject fuel directly into the combustion chamber at 200–350 bar, making high-pressure fuel pumps (HPFP) vulnerable to ethanol\'s poor lubricity.',
      'Without intake port fuel wash, ethanol-induced combustion soot accelerates heavy carbon crusting on intake valves within 30,000 km.',
      'E20 fuel causes long-cranking cold starts and low-RPM shuddering in DSG / DCT dual-clutch turbo petrol cars in urban traffic.',
      'Periodic fills of verified 0% ethanol petrol (XP100) clean direct injectors and prevent catastrophic high-pressure pump plunger scoring.',
    ],
    keywords: [
      'turbo petrol ethanol damage India',
      'VW Virtus 1.5 TSI E20 petrol problem',
      'Hyundai Creta Turbo GDi fuel pump issue',
      'direct injection ethanol carbon buildup',
      'HPFP wear ethanol petrol',
      'E0 petrol for turbo cars India',
      'E0 Finder app for car owners',
    ],
    content: `
### Modern Turbo Petrols Meet Indian E20 Blends

The Indian car market has transitioned rapidly from diesels to high-tech **Direct-Injection Turbo Petrols**—including the Volkswagen-Skoda **1.0 & 1.5 TSI**, Hyundai-Kia **1.5 Turbo GDi**, Mahindra **mStallion 2.0 Turbo**, and Maruti Suzuki **Boosterjet**.

These engines rely on ultra-high injection pressures (**200 to 350 bar**) and precise multi-hole solenoid injectors. However, the nationwide rollout of 20% ethanol fuel is presenting unexpected maintenance challenges for Indian car owners.

---

### The Three Critical Failure Points on Turbo Direct-Injection Engines

#### 1. High-Pressure Fuel Pump (HPFP) Plunger Scoring
Unlike port-injected engines that run at a modest 3.5 bar, GDi and TSI engines utilize a camshaft-driven high-pressure mechanical fuel pump.
- Petrol acts as the internal lubricant for the pump's precision-machined plunger.
- Ethanol acts as a chemical solvent that strips away protective lubricating film.
- Result: Micro-scoring on the pump plunger, fuel pressure drops under boost, and costly ₹45,000+ HPFP replacements.

#### 2. Intake Valve Carbon Crust (No Port Wash)
In direct-injection engines, fuel is sprayed directly into the cylinder, never washing the back of the intake valves. The incomplete combustion of ethanol-heavy fuel in stop-and-go city traffic produces sticky carbon deposits that bake onto intake valves, resulting in:
- Rough idle and jerky low-speed throttle response.
- Significant reduction in volumetric efficiency and turbo boost spool-up speed.

#### 3. Low-Speed Pre-Ignition (LSPI) Risk
Turbo direct-injection engines are prone to **Low-Speed Pre-Ignition (LSPI)**—an uncontrolled explosion before the spark plug fires when accelerating hard from low RPMs. Lower-density, moisture-laden ethanol blends increase cylinder hot spots, escalating the risk of bent connecting rods and cracked pistons.

---

### How E0 Finder Protects Your Turbo Petrol Car

Automotive engineers recommend fueling with verified **0% Ethanol High-Octane Petrol (XP100 / poWer100)**:
- Restores essential fuel system lubrication for the high-pressure fuel pump.
- Provides crisp low-RPM turbo spool without throttle flat spots.
- Eliminates water pooling in the fuel tank during long parking intervals.

Download **E0 Finder** on Android to find verified 0% ethanol petrol stations near your commute!
    `,
  },
  {
    slug: 'royal-enfield-bullet-hunter-himalayan-ethanol-guide',
    title: 'Royal Enfield & Ethanol Petrol: Cast Iron, UCE, J-Series & Himalayan 450 Fuel System Analysis',
    subtitle: 'From vintage CI 350s with brass Mikuni jets to modern liquid-cooled Sherpa 450s: Compatibility breakdown and rust prevention.',
    excerpt: 'Comprehensive Royal Enfield fuel compatibility guide across Cast Iron, AVL, UCE Classic 350/500, 650 Twins, J-Series, and Himalayan 450. Learn how ethanol causes tank rust and injector clogging.',
    coverImage: '/playstore_feature_graphic.png',
    publishedDate: 'August 17, 2026',
    author: {
      name: 'Major Ranveer Singh (Retd.)',
      role: 'Vintage Motorcycle Restorer & Royal Enfield Specialist',
      avatar: '/app-icon.png',
    },
    category: 'Classic Bikes & Cruisers',
    readTime: '10 min read',
    articleImages: [
      {
        url: '/e0_details_final.png',
        caption: 'Figure 1: E0 Finder detailed pump listing showing verified pure petrol stock for Royal Enfield touring riders.',
      },
      {
        url: '/e0_onboarding_clean.png',
        caption: 'Figure 2: Driver onboarding explaining the community fuel report mechanism across Indian highway routes.',
      },
    ],
    keyTakeaways: [
      'Cast Iron (CI) & AVL Bullets (pre-2009): Critical Danger on E20. Brass jets corrode into white powder, and rubber fuel petcocks dissolve within months.',
      'UCE Classic & Bullet 350/500 (2009–2020): High Risk. Fuel tank internal seam welds rust quickly under ethanol moisture separation, clogging in-tank fuel pump filters.',
      'J-Series (Hunter 350, Classic Reborn, Meteor 350): Moderate Risk. Rubber lines are E20 compliant, but engine experiences 10% lower fuel economy and jerky 2nd gear roll-on.',
      'Himalayan 450 & Guerrilla 450 (Sherpa Engine): High compression (11.5:1) liquid-cooled engine performs significantly smoother with higher fuel range on pure E0 petrol.',
    ],
    keywords: [
      'Royal Enfield ethanol petrol issue',
      'Bullet 350 fuel tank rust E20',
      'Himalayan 450 mileage ethanol free',
      'Classic 350 UCE fuel pump filter clogged',
      'Hunter 350 jerky throttle E20',
      'E0 petrol pump for Royal Enfield',
      'E0 Finder app for Enfield riders',
    ],
    content: `
### The Royal Enfield Legacy & The Modern Ethanol Challenge

Royal Enfield motorcycles have powered Indian highways for over seven decades. From legendary **Cast Iron 350/500 Bullets** and rugged **Himalayan 411s** to the modern **J-Series 350s**, **650 Twins (Interceptor / Continental GT)**, and the new **Sherpa 450 (Himalayan 450)**, every generation reacts differently to ethanol-blended petrol.

Understanding your Enfield's fuel system is the key to preventing roadside breakdowns and expensive tank restorations.

---

### Generation-by-Generation Fuel Analysis

#### 1. Cast Iron (CI 350/500) & AVL Lean Burn (Pre-2009)
- **Risk Level:** **CRITICAL DANGER**
- **Fuel System:** Mikarb / Mikuni Carburettors, brass pilot and main jets, cork/nitrile petcock gaskets.
- **The Issue:** Ethanol corrodes brass into a powdery zinc oxide crust, blocking tiny 0.35mm idle circuits within 3 weeks of sitting idle. Rubber petcock seals swell and crack, causing fuel leaks over hot engine fins.
- **Recommendation:** **Strictly Pure E0 Petrol Only.**

#### 2. UCE Unit Construction Engine (Classic, Bullet, Thunderbird 350/500, 2009–2020)
- **Risk Level:** **HIGH RISK**
- **Fuel System:** Early Carb / First-Gen Keihin EFI with in-tank electric pump.
- **The Issue:** UCE fuel tanks feature unprotected internal lap welds. When E20 fuel absorbs humidity during monsoons, water pools along the bottom seam, causing internal rust flakes that clog the ₹4,500 electric fuel pump strainer.
- **Recommendation:** Use verified E0 petrol for touring and storage.

#### 3. J-Series Engines (Classic 350 Reborn, Meteor 350, Hunter 350, 2021–Present)
- **Risk Level:** **MODERATE RISK**
- **Fuel System:** Modern closed-loop Delphi EFI with E20-compliant fluorocarbon hoses.
- **The Issue:** While fuel lines resist chemical degradation, owners report a noticeable **8–12% drop in tank mileage** (falling from 38 km/l on E0 to 32 km/l on E20) and jerky throttle transition when rolling on in 2nd and 3rd gears in heavy traffic.

#### 4. Sherpa 450 Engine (Himalayan 450 & Guerrilla 450)
- **Risk Level:** **MODERATE RISK / PERFORMANCE LOSS**
- **Fuel System:** High-compression (11.5:1), ride-by-wire throttle, 40 PS power output.
- **The Issue:** This modern DOHC liquid-cooled engine thrives on high energy-density fuel. On E20 petrol, high-altitude climbs (like Rohtang, Khardung La, and Spiti Valley) experience noticeable power flat spots and surging.

---

### Protecting Your Royal Enfield: The E0 Finder Protocol

1. **Before Long Rides:** Fill your tank to the brim with verified 0% ethanol petrol (XP100) located via the **E0 Finder app**.
2. **Monsoon Storage:** Never park your Enfield with a half-empty tank of E20 petrol. Top up with pure E0 to prevent condensation and bottom-weld rust.
3. **Carburetted Bikes:** If forced to use blended fuel during emergencies, drain the carb float bowl using the bottom drain screw before parking for the week.
    `,
  },
  {
    slug: 'how-to-check-petrol-density-at-indian-fuel-pumps',
    title: 'How to Check Petrol Density Register (Form-8) at Indian Fuel Pumps: Complete Motorist Rights Guide',
    subtitle: 'Ministry of Petroleum standards, ASTM-53B hydrometer inspection, 5-litre calibrated measure & submitting live community audits on E0 Finder.',
    excerpt: 'Know your legal rights at Indian petrol pumps. Learn how to verify the morning Form-8 density register (720–775 kg/m³), request a hydrometer test, and detect illegal fuel adulteration or excess ethanol blending.',
    coverImage: '/playstore_feature_graphic.png',
    publishedDate: 'August 17, 2026',
    author: {
      name: 'Aditya Sharma',
      role: 'Consumer Rights Advocate & Automotive Journalist',
      avatar: '/app-icon.png',
    },
    category: 'Fuel Quality & Consumer Rights',
    readTime: '7 min read',
    articleImages: [
      {
        url: '/e0_report_final.png',
        caption: 'Figure 1: E0 Finder in-app audit submission screen where motorists upload fuel density readings and receipt photos.',
      },
      {
        url: '/e0_home.png',
        caption: 'Figure 2: Real-time community verification badges displayed on the live interactive petrol pump map.',
      },
    ],
    keyTakeaways: [
      'Every Indian petrol pump is legally required by the Ministry of Petroleum & Natural Gas to maintain a daily Form-8 Density Register available for public inspection.',
      'Standard reference density for petrol in India is 720.0 to 775.0 kg/m³ at 15°C (IS 2796 specification).',
      'Ethanol has a higher density (~789 kg/m³). When blended at 20%, fuel density approaches or exceeds 745–752 kg/m³.',
      'Motorists have the legal right to request a free 5-litre calibrated measure check, filter paper test, and ASTM-53B hydrometer verification.',
    ],
    keywords: [
      'petrol density check Indian fuel pump',
      'Form 8 register petrol bunk rights',
      'petrol density standard India kg m3',
      'how to check petrol quality at pump',
      'filter paper test petrol pump India',
      'E0 petrol density vs E20',
      'E0 Finder fuel report',
    ],
    content: `
### Your Legal Rights at Every Indian Petrol Pump

Under the **Motor Spirit and High Speed Diesel (Regulation of Supply, Distribution and Prevention of Malpractices) Order** issued by the Ministry of Petroleum and Natural Gas, every Indian motorist has the statutory right to verify the quality and quantity of fuel before filling their vehicle.

Understanding fuel density is the most effective scientific tool motorists possess to distinguish between pure unblended petrol, standard E20 blends, and adulterated fuels.

---

### What Is Fuel Density and Why Does It Matter?

Density is the mass of fuel per unit volume, measured in **kg/m³ (kilograms per cubic meter) at 15°C**.

According to the Bureau of Indian Standards (**IS 2796:2022**):
- **Standard Pure Petrol (E0):** **720.0 kg/m³ to 775.0 kg/m³** (Typically sits around 725–735 kg/m³).
- **Pure Anhydrous Ethanol:** **~789.0 kg/m³**.
- **E20 Blended Petrol:** **742.0 to 755.0 kg/m³** (Due to the higher mass of 20% ethanol molecules).

If a pump's density reading deviates by more than **±3.0 kg/m³** from the morning tank lorry delivery invoice, the fuel is non-compliant.

---

### Step-by-Step: How to Perform Quality Checks at the Pump

#### 1. Inspect the Daily Form-8 Density Register
- Walk up to the manager's cabin or ask the pump attendant for the **Morning Density Register (Form-8)**.
- The register lists the date, tank number, fuel temperature, observed density, and converted density at 15°C using the ASTM-53B conversion chart.

#### 2. Request a Free Hydrometer & Thermometer Test
- Every retail outlet must maintain a calibrated glass hydrometer and certified mercury thermometer.
- The attendant will draw a 500ml sample into a glass jar, float the hydrometer, and record the reading at eye level.

#### 3. The 5-Litre Calibrated Measure Test (Quantity Check)
- If you suspect short-fueling, request a 5-litre delivery test using the government-stamped brass conical measure.
- The fuel level must match the etched datum line exactly within the legal tolerance of **±25ml per 5 litres**.

#### 4. The Whatman 581 Filter Paper Test (Purity Check)
- Put a drop of petrol on clean filter paper.
- Pure petrol evaporates completely within 2 minutes leaving **zero pink/brown stain**.
- Adulterated fuel (kerosene/naphtha) leaves a greasy circular ring.

---

### Join the National Fuel Audit with E0 Finder

Whenever you verify a petrol pump's density register or fuel test:
1. Open the **E0 Finder app**.
2. Select the station on the map and tap **"Submit Fuel Report"**.
3. Enter the observed density, fuel grade (XP100 / E0), and take a quick photo of your fuel bill.

Your submission helps thousands of Indian riders and drivers find clean, pure fuel and protects engines across the country!
    `,
  },
]

