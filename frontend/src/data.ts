import { City, Hall, EventCategory, ExtraService, TimeSlot, Review } from './types';

export const CITIES: City[] = [
  // Karnataka
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka' },
  { id: 'mysuru', name: 'Mysuru', state: 'Karnataka' },
  { id: 'mangaluru', name: 'Mangaluru', state: 'Karnataka' },
  { id: 'udupi', name: 'Udupi', state: 'Karnataka' },
  { id: 'hubballi', name: 'Hubballi', state: 'Karnataka' },
  { id: 'belagavi', name: 'Belagavi', state: 'Karnataka' },
  { id: 'shivamogga', name: 'Shivamogga', state: 'Karnataka' },
  // Kerala
  { id: 'kochi', name: 'Kochi', state: 'Kerala' },
  { id: 'kozhikode', name: 'Kozhikode', state: 'Kerala' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala' },
  { id: 'thrissur', name: 'Thrissur', state: 'Kerala' },
  // Goa
  { id: 'panaji', name: 'Panaji', state: 'Goa' },
  { id: 'margao', name: 'Margao', state: 'Goa' },
  // Tamil Nadu
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu' },
  { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu' }
];

export const EVENT_CATEGORIES: EventCategory[] = [
  // Formal Events
  {
    id: 'conference',
    name: 'Business Conference',
    type: 'formal',
    icon: 'Briefcase',
    description: 'State-of-the-art halls equipped with professional acoustics, high-speed Wi-Fi, and advanced presentation screens.',
    startingPrice: 35000,
    capacity: 300,
    duration: '8 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Mysuru'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'meeting',
    name: 'Corporate Meeting',
    type: 'formal',
    icon: 'Users',
    description: 'Sleek, soundproof boardrooms and mid-sized halls for critical alignments, discussions, and executive meetings.',
    startingPrice: 15000,
    capacity: 50,
    duration: '4 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Coimbatore', 'Panaji'],
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'seminar',
    name: 'Seminar & Workshop',
    type: 'formal',
    icon: 'GraduationCap',
    description: 'Educational setup with theater-style seating, dynamic presentation audio, and podium facilities.',
    startingPrice: 20000,
    capacity: 150,
    duration: '6 Hours',
    locations: ['Bengaluru', 'Coimbatore', 'Thiruvananthapuram', 'Mangaluru'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'award-ceremony',
    name: 'Award Ceremony',
    type: 'formal',
    icon: 'Trophy',
    description: 'Glamorous event halls featuring premium lighting systems, elevated main stage, red carpet entry, and premium banqueting.',
    startingPrice: 80000,
    capacity: 800,
    duration: '5 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Mysuru'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    type: 'formal',
    icon: 'Tv',
    description: 'Immersive spaces with massive LED backdrops, exceptional ambient controls, and high-tech broadcasting capabilities.',
    startingPrice: 60000,
    capacity: 500,
    duration: '6 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Panaji'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'networking',
    name: 'Networking Event',
    type: 'formal',
    icon: 'Share2',
    description: 'Cocktail style layouts with dynamic lounge areas, ambient lighting, and stellar catering options to foster premium connections.',
    startingPrice: 45000,
    capacity: 250,
    duration: '4 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Panaji', 'Coimbatore'],
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'
  },

  // Informal Events
  {
    id: 'birthday',
    name: 'Birthday Party',
    type: 'informal',
    icon: 'Cake',
    description: 'Vibrant, customizable spaces with themed balloons, kids activity zones, and specialized custom sound & light systems.',
    startingPrice: 15000,
    capacity: 150,
    duration: '4 Hours',
    locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Chennai', 'Kochi', 'Panaji'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wedding',
    name: 'Wedding Reception',
    type: 'informal',
    icon: 'Heart',
    description: 'Magnificent, royal grand halls with exquisite floral designs, premium dining rooms, luxury bridal suites, and valet parking.',
    startingPrice: 100000,
    capacity: 1200,
    duration: '12 Hours',
    locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Chennai', 'Kochi', 'Madurai'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'engagement',
    name: 'Engagement Ceremony',
    type: 'informal',
    icon: 'Gem',
    description: 'Intimate, beautifully decorated halls radiating warmth and elegance, perfect for custom stage settings and family bonding.',
    startingPrice: 40000,
    capacity: 350,
    duration: '6 Hours',
    locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Chennai', 'Kochi', 'Coimbatore'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'anniversary',
    name: 'Anniversary Party',
    type: 'informal',
    icon: 'Sparkles',
    description: 'Classy ballroom set up with elegant table centerpieces, dynamic lighting, violin or acoustic band setup, and stellar catering.',
    startingPrice: 30000,
    capacity: 250,
    duration: '5 Hours',
    locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Chennai', 'Kochi', 'Panaji'],
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    type: 'informal',
    icon: 'Baby',
    description: 'Whimsical pastel-themed decorations, extremely comfortable seating arrangements, and dedicated photo booths.',
    startingPrice: 18000,
    capacity: 100,
    duration: '4 Hours',
    locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Chennai', 'Kochi'],
    image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'music-night',
    name: 'Music Night & Concert',
    type: 'informal',
    icon: 'Music',
    description: 'High-voltage acoustic auditoriums and open-terrace rooftop halls with club-grade subwoofers and custom lighting rigs.',
    startingPrice: 75000,
    capacity: 600,
    duration: '6 Hours',
    locations: ['Bengaluru', 'Chennai', 'Kochi', 'Panaji'],
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600'
  }
];

export const HALLS: Hall[] = [
  // Bengaluru
  {
    id: 'bng-grand-palace',
    name: 'Grand Palace Convention Hall',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    capacity: 1000,
    pricePerDay: 90000,
    amenities: ['Air Conditioning', 'Parking', 'Stage', 'LED Screen', 'Bridal Room', 'Dining Hall', 'Generator Backup'],
    description: 'The epitome of grandeur and elegance in Bengaluru. Features a towering 24-foot ceiling, state-of-the-art acoustics, customizable lighting, and space to comfortably host up to 1000 guests. Ideal for mega-weddings, corporate summits, and premium concerts.',
    rating: 4.9,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Central AC', 'Over 200 Car Parking', '60ft Wide Stage', 'High Definition P3 LED Wall included', '2 Luxury Bridal Suites'],
    eventTypes: ['formal', 'informal']
  },
  {
    id: 'bng-crystal-crown',
    name: 'Crystal Crown Banquet',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    capacity: 500,
    pricePerDay: 55000,
    amenities: ['Air Conditioning', 'Stage', 'Decoration', 'Catering', 'Dining Hall', 'WiFi', 'Generator Backup'],
    description: 'A luxurious banquet hall with glass crystal chandeliers, warm premium wall detailing, and an integrated dining section. Known for its immaculate in-house culinary service and modern design touch.',
    rating: 4.7,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505232458627-a727266a7040?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Exquisite Crystal Chandeliers', 'Premium Wooden Flooring', 'Live Food Counters Area', 'Complimentary Themed Decor'],
    eventTypes: ['formal', 'informal']
  },
  {
    id: 'bng-skyline-rooftop',
    name: 'Skyline Rooftop Hall',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    capacity: 300,
    pricePerDay: 40000,
    amenities: ['DJ Setup', 'Stage', 'Garden Area', 'Swimming Pool', 'Catering', 'WiFi', 'Air Conditioning'],
    description: 'An open-air modern rooftop venue featuring a scenic panoramic view of Bengaluru’s dynamic skyline. Complete with a pool deck, integrated premium sound, ambient starry lighting, and an elegant bar counter.',
    rating: 4.8,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Panoramic City View', 'Poolside Deck Access', 'Acoustic DJ Booth Ready', 'Warm LED Fairy Lights Canopy'],
    eventTypes: ['formal', 'informal']
  },

  // Mangaluru
  {
    id: 'mng-ocean-pearl',
    name: 'Ocean Pearl Convention Hall',
    cityId: 'mangaluru',
    cityName: 'Mangaluru',
    capacity: 800,
    pricePerDay: 65000,
    amenities: ['Air Conditioning', 'Parking', 'Stage', 'Catering', 'Decoration', 'Bridal Room', 'Generator Backup'],
    description: 'Overlooking the gentle breeze zone, Ocean Pearl offers premium interiors with rich ivory detailing, a spectacular pre-function area, state-of-the-art catering, and a sprawling stage layout.',
    rating: 4.8,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1505232458627-a727266a7040?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Grand Ivory Pillar-less Design', 'Signature Coastal & Multi-cuisine catering', '150-car Valet Parking Space'],
    eventTypes: ['formal', 'informal']
  },
  {
    id: 'mng-palm-grove',
    name: 'Palm Grove Banquet',
    cityId: 'mangaluru',
    cityName: 'Mangaluru',
    capacity: 350,
    pricePerDay: 35000,
    amenities: ['Garden Area', 'Parking', 'Stage', 'Catering', 'Decoration', 'Wheelchair Accessible'],
    description: 'An eco-friendly, semi-outdoor garden banqueting venue lined with tropical palm trees. Perfect for cozy ring exchanges, traditional ceremonies, and children’s birthday milestones.',
    rating: 4.6,
    reviewsCount: 61,
    images: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Lush Natural Grass Lawn', 'Kids Playground & Activities Corner', 'Custom Organic Floral Decor'],
    eventTypes: ['informal']
  },

  // Mysuru
  {
    id: 'mys-royal-heritage',
    name: 'Royal Heritage Palace',
    cityId: 'mysuru',
    cityName: 'Mysuru',
    capacity: 1200,
    pricePerDay: 110000,
    amenities: ['Air Conditioning', 'Parking', 'Stage', 'LED Screen', 'Bridal Room', 'Dining Hall', 'Garden Area', 'Generator Backup'],
    description: 'Experience majestic royalty in the City of Palaces. Inspired by authentic Indo-Saracenic royal architecture, this massive venue boasts hand-painted gold leaf domes, intricate carvings, and vast palatial gardens.',
    rating: 4.9,
    reviewsCount: 156,
    images: [
      'https://images.unsplash.com/photo-1542662565-7e4b66b50d48?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Palace-style Architecture', 'Vast Landscaped Royal Garden', 'Ample Parking for 400+ vehicles', 'Premium VIP Lounge & Helipad access'],
    eventTypes: ['formal', 'informal']
  },

  // Kochi
  {
    id: 'koc-marine-drive',
    name: 'Marine Drive Convention Center',
    cityId: 'kochi',
    cityName: 'Kochi',
    capacity: 900,
    pricePerDay: 75000,
    amenities: ['Air Conditioning', 'Parking', 'Stage', 'LED Screen', 'WiFi', 'Catering', 'Generator Backup', 'Wheelchair Accessible'],
    description: 'A modern waterfront masterpiece at Marine Drive, Kochi. Offering spectacular views of the serene backwaters, complete with elegant architectural glass features and stellar contemporary multi-cuisine dining facilities.',
    rating: 4.8,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Stunning Backwater Panorama', 'Acoustically Treated Walls', 'Extra Large 350 Seat Dining Area'],
    eventTypes: ['formal', 'informal']
  },

  // Chennai
  {
    id: 'che-marina-bay',
    name: 'Marina Bay Luxury Hall',
    cityId: 'chennai',
    cityName: 'Chennai',
    capacity: 1100,
    pricePerDay: 95000,
    amenities: ['Air Conditioning', 'Parking', 'Stage', 'LED Screen', 'Bridal Room', 'Dining Hall', 'DJ Setup', 'Generator Backup'],
    description: 'Located in the hearts of Chennai, Marina Bay Luxury Hall offers a massive modern venue with fully-programmable RGB lighting, a luxury double-deck stage, and catering facilities hosting classical South Indian feasts or global buffets.',
    rating: 4.9,
    reviewsCount: 138,
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Double-Decker Theater Stage', 'Central VRF Air Conditioning', 'Spacious Bridal & Groom Changing Suites'],
    eventTypes: ['formal', 'informal']
  },

  // Goa
  {
    id: 'goa-whispering-palms',
    name: 'Whispering Palms Beachfront Hall',
    cityId: 'panaji',
    cityName: 'Panaji',
    capacity: 400,
    pricePerDay: 85000,
    amenities: ['Garden Area', 'Swimming Pool', 'DJ Setup', 'Catering', 'Decoration', 'WiFi', 'Air Conditioning'],
    description: 'The ultimate coastal beachside hall in Goa. Blends a majestic indoor air-conditioned glass hall with direct private beach access and sandy palm lawn. Highly sought-after for sundowner destination weddings and breezy corporate retreats.',
    rating: 4.9,
    reviewsCount: 172,
    images: [
      'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Private Beachfront Access', 'Scenic Sea-facing Glass Pavilion', 'Sunset View Deck & Custom Tiki Bar'],
    eventTypes: ['formal', 'informal']
  }
];

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'srv-catering',
    name: 'Gourmet Catering (Per Guest)',
    price: 850,
    category: 'catering',
    icon: 'Utensils',
    description: 'A premium spread featuring authentic regional specialties, international fusion stations, welcome drinks, desserts, and staff.'
  },
  {
    id: 'srv-decoration-stage',
    name: 'Theme & Stage Decoration',
    price: 25000,
    category: 'decoration',
    icon: 'Sparkles',
    description: 'Exquisite modern backdrops with floral columns, premium carpets, dynamic spotlights, and curated seating setups.'
  },
  {
    id: 'srv-photography',
    name: 'Cinematography & Photography',
    price: 35000,
    category: 'logistics',
    icon: 'Camera',
    description: 'A professional 3-member crew capturing raw emotion, candid frames, cinematic highlight videos, and high-res digital albums.'
  },
  {
    id: 'srv-dj',
    name: 'Premium Sound & DJ Setup',
    price: 15000,
    category: 'entertainment',
    icon: 'Music',
    description: 'Club-grade dual subwoofer sound system, customized dynamic stage par lights, and a skilled DJ reading your room.'
  },
  {
    id: 'srv-live-band',
    name: 'Live Unplugged Fusion Band',
    price: 30000,
    category: 'entertainment',
    icon: 'Mic2',
    description: 'A highly talented 4-piece regional acoustic band performing a blend of contemporary hits and timeless classics.'
  },
  {
    id: 'srv-flower-decor',
    name: 'Exotic Fresh Flower Arch',
    price: 12000,
    category: 'decoration',
    icon: 'Flower2',
    description: 'Elegant fresh roses, jasmines, and lilies arch styling for the entry pathway and main focal areas.'
  },
  {
    id: 'srv-balloon-decor',
    name: 'Themed Balloon Artistry',
    price: 6000,
    category: 'decoration',
    icon: 'PartyPopper',
    description: 'Playful organic balloon garlands, photo arches, and tabletop centerpieces. Best for birthdays and baby showers.'
  },
  {
    id: 'srv-valet-parking',
    name: 'Valet Parking Support',
    price: 5000,
    category: 'logistics',
    icon: 'Car',
    description: 'Uniformed professional valets, high-speed car tag system, and dedicated priority lanes for standard parking zones.'
  },
  {
    id: 'srv-event-host',
    name: 'Professional Event Host (MC)',
    price: 10000,
    category: 'entertainment',
    icon: 'UserCheck',
    description: 'Engaging, charismatic, and bilingual master of ceremonies to host and synchronize events smoothly.'
  },
  {
    id: 'srv-welcome-drinks',
    name: 'Specialized Welcome Mocktails',
    price: 150,
    category: 'catering',
    icon: 'GlassWater',
    description: 'Chilled tropical drinks, custom mojitos, and artisanal fruit shots served right at entry reception.'
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'Morning', name: 'Morning Slot', time: '8:00 AM - 1:00 PM', priceMultiplier: 0.8 },
  { id: 'Afternoon', name: 'Afternoon Slot', time: '2:00 PM - 6:00 PM', priceMultiplier: 0.7 },
  { id: 'Evening', name: 'Evening Slot', time: '7:00 PM - 11:00 PM', priceMultiplier: 1.0 },
  { id: 'Full Day', name: 'Full Day Booking', time: '8:00 AM - 11:00 PM', priceMultiplier: 1.6 }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    hallId: 'bng-grand-palace',
    userName: 'Aishwarya Sen',
    rating: 5,
    comment: 'Absolute masterpiece of a hall! The P3 LED Wall was crystal clear, and the 60ft stage made our wedding feel so grand. All our 900 guests were mesmerized by the interior design.',
    date: '2026-05-12',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-2',
    hallId: 'bng-grand-palace',
    userName: 'Rithvik Kamath',
    rating: 5,
    comment: 'Hosted our corporate AGM here. Incredibly professional management, outstanding sound system, and generous air conditioning. Valet parking handled 180 cars flawlessly.',
    date: '2026-06-04',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-3',
    hallId: 'bng-skyline-rooftop',
    userName: 'Nisha Hegde',
    rating: 5,
    comment: 'The Skyline rooftop is unmatched in Bengaluru. Sunset party was gorgeous next to the pool, and the DJ setup was top tier. Highly recommend booking the Evening slot.',
    date: '2026-06-18',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'rev-4',
    hallId: 'mys-royal-heritage',
    userName: 'Karthik Raja',
    rating: 5,
    comment: 'Felt like real kings! The architectural details and painting on the domes are mindblowing. The royal gardens provided breathtaking background shots for our wedding photoshoot.',
    date: '2026-04-30',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-1001',
    hallId: 'bng-grand-palace',
    hallName: 'Grand Palace Convention Hall',
    cityName: 'Bengaluru',
    eventType: 'Wedding Reception',
    date: '2026-07-10',
    slot: 'Morning' as const,
    guests: 800,
    services: ['srv-catering', 'srv-decoration-stage'],
    totalPrice: 834000,
    status: 'Confirmed' as const,
    paymentMethod: 'Pay Now' as const,
    userName: 'Rajesh Sharma',
    userEmail: 'rajesh@example.com',
    createdAt: '2026-06-15T10:30:00Z'
  },
  {
    id: 'bk-1002',
    hallId: 'bng-skyline-rooftop',
    hallName: 'Skyline Rooftop Hall',
    cityName: 'Bengaluru',
    eventType: 'Anniversary Party',
    date: '2026-07-15',
    slot: 'Evening' as const,
    guests: 200,
    services: ['srv-dj', 'srv-catering'],
    totalPrice: 224000,
    status: 'Confirmed' as const,
    paymentMethod: 'Pay Now' as const,
    userName: 'Meera Rao',
    userEmail: 'meera@example.com',
    createdAt: '2026-06-17T14:45:00Z'
  },
  {
    id: 'bk-1003',
    hallId: 'mys-royal-heritage',
    hallName: 'Royal Heritage Palace',
    cityName: 'Mysuru',
    eventType: 'Business Conference',
    date: '2026-07-20',
    slot: 'Full Day' as const,
    guests: 400,
    services: ['srv-catering', 'srv-photography', 'srv-valet-parking'],
    totalPrice: 556000,
    status: 'Pending' as const,
    paymentMethod: 'Pay at Venue' as const,
    userName: 'Dr. Srinivas Prasad',
    userEmail: 'srinivas@heritage.org',
    createdAt: '2026-06-25T08:12:00Z'
  }
];
