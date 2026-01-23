export interface Highlight {
  title: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface VisitInfo {
  bestTime: string;
  timeRequired: string;
  difficulty: string;
  entryFee: string;
  hours: string;
  tips: string[];
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  region: string;
  category: string;
  heroImage: string;
  photoGallery: string[];
  quickSummary: string;
  fullDescription: string;
  overview: string;
  whatToSee: string[];
  thingsToDo: string[];
  historyAndLegend: string;
  highlights: Highlight[];
  visitInfo: VisitInfo;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  reviews: Review[];
  relatedHotels: string[];
  relatedRestaurants: string[];
  status: 'active' | 'inactive';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  category: 'luxury' | 'mid-range' | 'budget';
  pricePerNight: number;
  heroImage: string;
  photoGallery: string[];
  quickSummary: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive';
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  specialty: string;
  averagePrice: number;
  heroImage: string;
  photoGallery: string[];
  quickSummary: string;
  description: string;
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive';
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    slug: 'sigiriya',
    region: 'Central Province',
    category: 'cultural',
    heroImage: 'https://images.unsplash.com/photo-1586613835259-8fd2b8d851c5?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1586613835259-8fd2b8d851c5?w=800',
      'https://images.unsplash.com/photo-1602155106899-e7f8abc8db50?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800',
      'https://images.unsplash.com/photo-1590123332319-2bb3c4c8baca?w=800',
    ],
    quickSummary: 'An ancient rock fortress rising 200 meters above the jungle, featuring stunning frescoes and the famous Lion Gate.',
    fullDescription: `Sigiriya, also known as Lion Rock, is a UNESCO World Heritage Site and one of Sri Lanka's most remarkable archaeological wonders. This ancient rock fortress rises dramatically 200 meters above the surrounding jungle, offering breathtaking panoramic views and a glimpse into the country's rich history.

Built in the 5th century AD by King Kashyapa, Sigiriya served as both a royal palace and fortress. The complex showcases remarkable engineering and artistic achievements, including the famous Mirror Wall, ancient water gardens, and the stunning Sigiriya Frescoes depicting celestial maidens.

The climb to the summit takes you through beautifully landscaped terraced gardens, past the iconic Lion's Paws entrance, and up ancient staircases carved into the rock face. At the top, you'll find the ruins of the royal palace and pools, with 360-degree views extending to the distant mountains.`,
    overview: 'Sigiriya is a UNESCO World Heritage Site featuring a 5th-century rock fortress built by King Kashyapa. Rising 200 meters above the jungle, it showcases ancient engineering marvels including water gardens, the Mirror Wall, and famous frescoes.',
    whatToSee: [
      'Ancient Frescoes of celestial maidens',
      'Lion Gate entrance with massive paws',
      'Mirror Wall with ancient graffiti',
      'Water gardens and boulder gardens',
      'Summit palace ruins and pools',
      'Sigiriya Museum'
    ],
    thingsToDo: [
      'Climb to the summit for panoramic views',
      'Photograph the iconic Lion Paws',
      'Explore the ancient water gardens',
      'Visit the on-site museum',
      'Watch sunrise or sunset from nearby Pidurangala Rock'
    ],
    historyAndLegend: `According to legend, King Kashyapa (477-495 AD) killed his father King Dhatusena and seized the throne from his brother Moggallana. Fearing revenge, he built this magnificent fortress atop Sigiriya Rock. The complex served as both a royal palace and an impregnable citadel. When Moggallana finally returned with an army, Kashyapa rode out to meet him in battle but was deserted by his troops and took his own life. The site was later used as a Buddhist monastery until the 14th century.`,
    highlights: [
      {
        title: 'Ancient Frescoes',
        icon: '🎨',
        description: 'Marvel at the 1,500-year-old paintings of celestial maidens, remarkably preserved in a sheltered pocket of the rock face.',
      },
      {
        title: 'Lion Gate Entrance',
        icon: '🦁',
        description: 'Pass through the iconic Lion\'s Paws, remnants of a massive lion statue that once guarded the final ascent.',
      },
      {
        title: 'Water Gardens',
        icon: '💧',
        description: 'Explore the sophisticated ancient hydraulic systems and symmetrical water gardens at the base.',
      },
      {
        title: 'Mirror Wall',
        icon: '✨',
        description: 'Walk along the ancient polished wall covered with centuries-old graffiti and poetry.',
      },
      {
        title: 'Summit Palace Ruins',
        icon: '🏛️',
        description: 'Discover the foundations of the royal palace, including pools and throne platforms.',
      },
      {
        title: 'Panoramic Views',
        icon: '🌄',
        description: 'Enjoy stunning 360-degree views of the surrounding jungle, villages, and distant mountains.',
      },
    ],
    visitInfo: {
      bestTime: 'Early morning (7 AM) to avoid crowds and heat',
      timeRequired: '3-4 hours for complete exploration',
      difficulty: 'Moderate - 1,200 steps to climb',
      entryFee: '$30 USD for foreign adults',
      hours: '7:00 AM - 5:30 PM daily',
      tips: [
        'Bring plenty of water and wear comfortable shoes',
        'Start early to avoid the midday heat',
        'Be cautious of the wasps nest near the frescoes',
        'Hire a licensed guide for historical context',
        'Don\'t miss the museum at the entrance',
      ],
    },
    coordinates: { lat: 7.9570, lng: 80.7603 },
    rating: 4.8,
    reviewCount: 2847,
    reviews: [
      {
        id: 'r1',
        author: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely breathtaking! The climb was challenging but so worth it. The views from the top are unforgettable.',
      },
      {
        id: 'r2',
        author: 'James K.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 5,
        date: '2024-01-10',
        comment: 'A true wonder of the ancient world. The frescoes are stunning and the engineering is remarkable.',
      },
    ],
    relatedHotels: ['h1', 'h2'],
    relatedRestaurants: ['r1'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Ella',
    slug: 'ella',
    region: 'Uva Province',
    category: 'nature',
    heroImage: 'https://images.unsplash.com/photo-1566766224366-5f6f2b5e3f7a?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1566766224366-5f6f2b5e3f7a?w=800',
      'https://images.unsplash.com/photo-1580181049477-4fb57a2c8e51?w=800',
      'https://images.unsplash.com/photo-1590104241578-2295d2e4edcf?w=800',
      'https://images.unsplash.com/photo-1623789758489-0ef26f5c9cc5?w=800',
    ],
    quickSummary: 'A charming hill country town surrounded by tea plantations, waterfalls, and stunning mountain scenery.',
    fullDescription: `Ella is a small town nestled in the heart of Sri Lanka's hill country, surrounded by rolling tea plantations, misty mountains, and cascading waterfalls. This bohemian haven has become a favorite destination for travelers seeking natural beauty, adventure, and authentic Sri Lankan culture.

The town offers a perfect blend of relaxation and adventure. Trek to the summit of Ella Rock for panoramic views, explore the famous Nine Arch Bridge, or simply wander through the emerald-green tea estates. The cooler mountain climate provides a refreshing escape from the coastal heat.

Ella is also famous for its food scene, with cozy cafes serving everything from traditional Sri Lankan rice and curry to international cuisine. The laid-back atmosphere and friendly locals make it an ideal place to unwind and connect with nature.`,
    overview: 'Ella is a picturesque hill country town known for its stunning natural beauty, adventure activities, and laid-back atmosphere. Surrounded by tea plantations and misty mountains, it offers the perfect blend of relaxation and exploration.',
    whatToSee: [
      'Nine Arch Bridge - iconic colonial railway bridge',
      'Ella Rock for panoramic mountain views',
      'Ravana Falls - 25-meter waterfall',
      'Little Adam\'s Peak',
      'Tea plantations and factories',
      'Ella Gap viewpoint'
    ],
    thingsToDo: [
      'Hike to Ella Rock summit',
      'Walk across Nine Arch Bridge',
      'Take the scenic train journey',
      'Visit tea factories and taste Ceylon tea',
      'Trek to Little Adam\'s Peak',
      'Enjoy local kottu roti at night markets'
    ],
    historyAndLegend: `Ella is steeped in mythology connected to the Ramayana epic. According to legend, the demon king Ravana hid Princess Sita in a cave near Ella after abducting her from India. Ravana Falls is named after him, and locals believe the caves in the area were used as his hideouts. The name "Ella" is said to derive from the Sinhala word for waterfall, reflecting the abundance of cascades in the region.`,
    highlights: [
      {
        title: 'Nine Arch Bridge',
        icon: '🌉',
        description: 'Witness the iconic colonial-era railway bridge set against lush green hills.',
      },
      {
        title: 'Ella Rock Hike',
        icon: '🥾',
        description: 'Challenge yourself with a rewarding trek offering spectacular mountain views.',
      },
      {
        title: 'Tea Plantations',
        icon: '🍵',
        description: 'Walk through endless rows of tea bushes and visit working tea factories.',
      },
      {
        title: 'Ravana Falls',
        icon: '💦',
        description: 'Cool off at this beautiful 25-meter waterfall steeped in legend.',
      },
      {
        title: 'Little Adam\'s Peak',
        icon: '⛰️',
        description: 'An easier hike with equally stunning views over the Ella Gap.',
      },
      {
        title: 'Train Journey',
        icon: '🚂',
        description: 'Experience one of the world\'s most scenic train rides through the highlands.',
      },
    ],
    visitInfo: {
      bestTime: 'January to March (dry season)',
      timeRequired: '2-3 days recommended',
      difficulty: 'Easy to Moderate',
      entryFee: 'Free (some attractions have fees)',
      hours: 'Town accessible 24/7',
      tips: [
        'Book train tickets in advance for the scenic journey',
        'Bring layers - mornings can be chilly',
        'Hire a local guide for the Ella Rock hike',
        'Try the local kottu roti at night markets',
      ],
    },
    coordinates: { lat: 6.8667, lng: 81.0466 },
    rating: 4.7,
    reviewCount: 1923,
    reviews: [
      {
        id: 'r3',
        author: 'Emma L.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        rating: 5,
        date: '2024-01-20',
        comment: 'The most peaceful place I\'ve ever visited. The Nine Arch Bridge at sunrise is magical!',
      },
    ],
    relatedHotels: ['h3', 'h4'],
    relatedRestaurants: ['r2', 'r3'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Galle Fort',
    slug: 'galle-fort',
    region: 'Southern Province',
    category: 'cultural',
    heroImage: 'https://images.unsplash.com/photo-1588598198321-9735fd510221?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1588598198321-9735fd510221?w=800',
      'https://images.unsplash.com/photo-1580181049477-4fb57a2c8e51?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800',
    ],
    quickSummary: 'A UNESCO World Heritage colonial fort with charming cobblestone streets, boutiques, and ocean views.',
    fullDescription: `Galle Fort is a historical, archaeological, and architectural heritage monument that stands as a testament to Sri Lanka's colonial past. Built by the Portuguese in 1588 and extensively fortified by the Dutch in the 17th century, this UNESCO World Heritage Site is one of the best-preserved sea fortresses in Asia.

Walking through the fort's narrow cobblestone streets feels like stepping back in time. Colonial architecture blends seamlessly with modern boutiques, art galleries, and cafes. The rampart walls offer stunning views of the Indian Ocean, particularly beautiful at sunset.

Beyond its historical significance, Galle Fort is a vibrant living community. Explore Dutch Reformed churches, visit the old lighthouse, and discover hidden courtyards and gardens. The fort hosts cultural events, including the famous Galle Literary Festival.`,
    overview: 'Galle Fort is a UNESCO World Heritage Site and one of the best-preserved colonial sea fortresses in Asia. This living heritage site combines Portuguese and Dutch architecture with modern boutiques, galleries, and cafes.',
    whatToSee: [
      'Dutch Reformed Church (1755)',
      'Galle Lighthouse',
      'Maritime Archaeology Museum',
      'Historical Mansion Museum',
      'Flag Rock and bastions',
      'Colonial-era buildings and streets'
    ],
    thingsToDo: [
      'Walk the rampart walls at sunset',
      'Explore boutique shops and galleries',
      'Visit historical churches and museums',
      'Enjoy rooftop dining with ocean views',
      'Attend the Galle Literary Festival',
      'Take a guided walking tour'
    ],
    historyAndLegend: `The Portuguese first established a presence here in 1588, but it was the Dutch who transformed Galle into the fortified city we see today, capturing it in 1640. The Dutch East India Company made it their main port in Ceylon. In 1796, the British took control without a fight. The fort survived the 2004 tsunami with minimal damage, testament to its robust construction. Legend says a network of underground tunnels connects various parts of the fort, some leading to the sea for escape routes.`,
    highlights: [
      {
        title: 'Dutch Reformed Church',
        icon: '⛪',
        description: 'Visit the oldest Protestant church in Sri Lanka, dating back to 1755.',
      },
      {
        title: 'Rampart Walls',
        icon: '🌅',
        description: 'Walk the ancient fortification walls with spectacular ocean sunset views.',
      },
      {
        title: 'Lighthouse',
        icon: '🗼',
        description: 'See the iconic 1939 lighthouse, the oldest light station in Sri Lanka.',
      },
      {
        title: 'Boutique Shopping',
        icon: '🛍️',
        description: 'Browse unique shops featuring local crafts, jewelry, and antiques.',
      },
      {
        title: 'Colonial Architecture',
        icon: '🏛️',
        description: 'Admire well-preserved Dutch and British colonial buildings.',
      },
      {
        title: 'Art Galleries',
        icon: '🖼️',
        description: 'Explore contemporary and traditional Sri Lankan art in intimate galleries.',
      },
    ],
    visitInfo: {
      bestTime: 'November to April (dry season)',
      timeRequired: 'Half day to full day',
      difficulty: 'Easy - mostly flat walking',
      entryFee: 'Free to enter the fort',
      hours: '24/7 access',
      tips: [
        'Visit during early morning or late afternoon for best light',
        'Watch the sunset from the ramparts near the lighthouse',
        'Many shops close on Sundays',
        'Book a walking tour for historical insights',
      ],
    },
    coordinates: { lat: 6.0269, lng: 80.2170 },
    rating: 4.6,
    reviewCount: 3156,
    reviews: [
      {
        id: 'r4',
        author: 'Michael R.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        rating: 4,
        date: '2024-01-18',
        comment: 'Beautiful blend of history and modern life. The sunset from the walls is unforgettable.',
      },
    ],
    relatedHotels: ['h5', 'h6'],
    relatedRestaurants: ['r4', 'r5'],
    status: 'active',
  },
  {
    id: '4',
    name: 'Yala National Park',
    slug: 'yala',
    region: 'Southern Province',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800',
    ],
    quickSummary: 'Sri Lanka\'s most famous wildlife sanctuary, home to the highest density of leopards in the world.',
    fullDescription: `Yala National Park is Sri Lanka's premier wildlife destination and the second-largest national park in the country. Famous for having the highest density of leopards in the world, Yala offers incredible opportunities to spot these elusive big cats in their natural habitat.

The park's diverse ecosystems include scrublands, grasslands, lagoons, and beaches, supporting an amazing variety of wildlife. Besides leopards, you can encounter elephants, sloth bears, crocodiles, wild buffalo, and over 200 species of birds including the endemic Sri Lankan junglefowl.

Safari drives take you through dramatic landscapes dotted with ancient Buddhist ruins, adding a cultural dimension to your wildlife adventure. The best time for wildlife spotting is early morning or late afternoon when animals are most active.`,
    overview: 'Yala National Park is Sri Lanka\'s premier wildlife sanctuary, famous for having the highest density of leopards in the world. The park\'s diverse ecosystems support an incredible variety of wildlife including elephants, sloth bears, and over 200 bird species.',
    whatToSee: [
      'Sri Lankan leopards',
      'Asian elephants',
      'Sloth bears',
      'Crocodiles and water monitors',
      'Over 200 bird species',
      'Ancient Buddhist ruins (Sithulpawwa)'
    ],
    thingsToDo: [
      'Morning and evening jeep safaris',
      'Bird watching expeditions',
      'Photography tours',
      'Visit Sithulpawwa rock temple',
      'Beach safari along the coast',
      'Full-day wildlife tracking'
    ],
    historyAndLegend: `Yala has been a wildlife sanctuary since 1900 and became a national park in 1938. The area holds deep historical significance with ancient Buddhist monasteries dating back 2,000 years, including Sithulpawwa, which once housed 12,000 monks. Local legends speak of Ravana, the demon king from the Ramayana, who is said to have ruled these lands. The indigenous Vedda people also have ancestral connections to this region.`,
    highlights: [
      {
        title: 'Leopard Spotting',
        icon: '🐆',
        description: 'Track the elusive Sri Lankan leopard in its natural habitat.',
      },
      {
        title: 'Elephant Herds',
        icon: '🐘',
        description: 'Watch wild elephants gathering at watering holes.',
      },
      {
        title: 'Bird Watching',
        icon: '🦚',
        description: 'Spot over 200 bird species including flamingos and peacocks.',
      },
      {
        title: 'Safari Adventure',
        icon: '🚙',
        description: 'Experience thrilling jeep safaris through diverse landscapes.',
      },
      {
        title: 'Ancient Ruins',
        icon: '🏛️',
        description: 'Discover 2,000-year-old Buddhist ruins within the park.',
      },
      {
        title: 'Coastal Views',
        icon: '🌊',
        description: 'Explore beautiful beaches along the park\'s boundary.',
      },
    ],
    visitInfo: {
      bestTime: 'February to July (dry season)',
      timeRequired: 'Full day (2 safari sessions)',
      difficulty: 'Easy - seated in vehicle',
      entryFee: '$25-40 USD depending on zone',
      hours: '6:00 AM - 6:00 PM',
      tips: [
        'Book safaris in advance during peak season',
        'Early morning safaris have best leopard sightings',
        'Wear neutral colors and bring binoculars',
        'The park closes during September for wildlife breeding',
      ],
    },
    coordinates: { lat: 6.3696, lng: 81.5046 },
    rating: 4.7,
    reviewCount: 1678,
    reviews: [
      {
        id: 'r5',
        author: 'David W.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        rating: 5,
        date: '2024-01-12',
        comment: 'Saw three leopards in one morning! Our guide was exceptional. A must-do safari.',
      },
    ],
    relatedHotels: ['h7'],
    relatedRestaurants: ['r6'],
    status: 'active',
  },
  {
    id: '5',
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    region: 'Central Province',
    category: 'nature',
    heroImage: 'https://images.unsplash.com/photo-1590104241578-2295d2e4edcf?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1590104241578-2295d2e4edcf?w=800',
      'https://images.unsplash.com/photo-1580181049477-4fb57a2c8e51?w=800',
      'https://images.unsplash.com/photo-1566766224366-5f6f2b5e3f7a?w=800',
      'https://images.unsplash.com/photo-1623789758489-0ef26f5c9cc5?w=800',
    ],
    quickSummary: 'Known as "Little England," this hill station features colonial architecture, tea estates, and cool mountain air.',
    fullDescription: `Nuwara Eliya, nestled at 1,868 meters above sea level, is Sri Lanka's most famous hill station, often called "Little England" for its colonial heritage and temperate climate. The town's Tudor-style bungalows, manicured gardens, and year-round spring-like weather create a unique atmosphere unlike anywhere else on the island.

The surrounding landscape is dominated by endless tea plantations, their emerald slopes creating one of the most picturesque sceneries in Sri Lanka. Visit working tea factories to learn about the production process and sample Ceylon tea at its source.

Beyond tea, Nuwara Eliya offers Victorian-era landmarks, a scenic lake, beautiful gardens, and access to some of Sri Lanka's most dramatic waterfalls. The town comes alive during the April season when horse racing and flower festivals transform it into a festive retreat.`,
    overview: 'Nuwara Eliya is Sri Lanka\'s premier hill station at 1,868m elevation, known as "Little England" for its colonial charm. Experience temperate climate, endless tea plantations, Victorian architecture, and beautiful gardens.',
    whatToSee: [
      'Pedro Tea Estate and factory',
      'Gregory Lake',
      'Hakgala Botanical Gardens',
      'Victoria Park',
      'Colonial-era buildings',
      'Strawberry farms'
    ],
    thingsToDo: [
      'Tour a working tea factory',
      'Boating on Gregory Lake',
      'Visit botanical gardens',
      'Pick fresh strawberries',
      'Explore colonial architecture',
      'Attend April season festivities'
    ],
    historyAndLegend: `Nuwara Eliya was developed by the British in the 19th century as a retreat from the tropical heat of the lowlands. Samuel Baker, the famous explorer, is credited with establishing the town in 1846. The British planted tea here after coffee crops were devastated by disease. The Hill Club, established in 1876, still maintains colonial traditions. Legend connects nearby Hakgala to the Ramayana - the name means "jaw rock," said to be where Hanuman's jaw struck after being hit while carrying a mountain of medicinal herbs.`,
    highlights: [
      {
        title: 'Tea Factory Tours',
        icon: '🍵',
        description: 'Learn the art of Ceylon tea production and enjoy tastings.',
      },
      {
        title: 'Gregory Lake',
        icon: '🚣',
        description: 'Enjoy boating, jet skiing, or peaceful walks around this scenic lake.',
      },
      {
        title: 'Hakgala Gardens',
        icon: '🌸',
        description: 'Explore one of Asia\'s finest botanical gardens with rare species.',
      },
      {
        title: 'Victoria Park',
        icon: '🌳',
        description: 'Stroll through beautiful gardens home to exotic birds.',
      },
      {
        title: 'Colonial Architecture',
        icon: '🏠',
        description: 'Admire Tudor-style buildings and the historic Grand Hotel.',
      },
      {
        title: 'Strawberry Farms',
        icon: '🍓',
        description: 'Pick fresh strawberries at local farms.',
      },
    ],
    visitInfo: {
      bestTime: 'March to May or August to September',
      timeRequired: '2-3 days recommended',
      difficulty: 'Easy',
      entryFee: 'Free to explore (attractions vary)',
      hours: 'Town accessible 24/7',
      tips: [
        'Pack warm clothing - temperatures can drop to 10°C',
        'Visit Pedro Tea Estate for the best factory tour',
        'Book accommodations early during April season',
        'Try fresh strawberries and cream at local cafes',
      ],
    },
    coordinates: { lat: 6.9497, lng: 80.7891 },
    rating: 4.5,
    reviewCount: 1432,
    reviews: [
      {
        id: 'r6',
        author: 'Lisa T.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        rating: 4,
        date: '2024-01-08',
        comment: 'Felt like being transported to the English countryside. The tea estates are gorgeous!',
      },
    ],
    relatedHotels: ['h8'],
    relatedRestaurants: ['r7'],
    status: 'active',
  },
  {
    id: '6',
    name: 'Mirissa Beach',
    slug: 'mirissa',
    region: 'Southern Province',
    category: 'beach',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800',
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800',
    ],
    quickSummary: 'A tropical paradise with golden sands, world-class whale watching, and vibrant beach nightlife.',
    fullDescription: `Mirissa is Sri Lanka's most beloved beach destination, a crescent of golden sand backed by swaying palm trees and kissed by the warm waters of the Indian Ocean. This laid-back coastal village has evolved from a quiet fishing hamlet into a travelers' paradise while maintaining its authentic charm.

The beach is famous for whale watching - the waters off Mirissa offer some of the best opportunities in the world to spot blue whales, the largest animals on Earth. Between November and April, these gentle giants migrate past the coast, along with spinner dolphins and sperm whales.

Beyond marine life, Mirissa offers excellent surfing, snorkeling, and simply lounging on the beach. As the sun sets, beach bars come alive with music and cocktails, creating a perfect blend of relaxation and nightlife. The iconic Parrot Rock provides stunning sunset views and a bit of adventure.`,
    overview: 'Mirissa is a tropical beach paradise offering world-class whale watching, surfing, and vibrant nightlife. This golden crescent beach backed by palm trees is one of the best places on Earth to spot blue whales.',
    whatToSee: [
      'Blue whales and dolphins',
      'Parrot Rock',
      'Secret Beach',
      'Coconut Tree Hill',
      'Fishing harbor',
      'Stilt fishermen'
    ],
    thingsToDo: [
      'Whale and dolphin watching',
      'Surfing and boogie boarding',
      'Snorkeling at coral reefs',
      'Climb Parrot Rock at sunset',
      'Beach bar hopping',
      'Fresh seafood dining'
    ],
    historyAndLegend: `Mirissa has transformed from a small fishing village to a tourist destination while retaining its authentic charm. The name "Mirissa" is believed to derive from the Sinhala word for a type of cloth or from "Maharissa" meaning great cape. The area was historically significant for its fishing industry, and traditional stilt fishing still practiced here dates back over 500 years. Local fishermen believe the waters are blessed by the sea goddess, which is why whales and dolphins frequently visit.`,
    highlights: [
      {
        title: 'Whale Watching',
        icon: '🐋',
        description: 'Witness blue whales and dolphins in their natural habitat.',
      },
      {
        title: 'Parrot Rock',
        icon: '🪨',
        description: 'Climb this iconic rock formation for panoramic beach views.',
      },
      {
        title: 'Surfing',
        icon: '🏄',
        description: 'Catch waves at beginner-friendly surf spots.',
      },
      {
        title: 'Beach Sunset',
        icon: '🌅',
        description: 'Experience magical sunsets with cocktails on the sand.',
      },
      {
        title: 'Fresh Seafood',
        icon: '🦐',
        description: 'Enjoy the day\'s catch at beachfront restaurants.',
      },
      {
        title: 'Snorkeling',
        icon: '🤿',
        description: 'Explore colorful coral reefs and tropical fish.',
      },
    ],
    visitInfo: {
      bestTime: 'November to April (dry season)',
      timeRequired: '3-5 days recommended',
      difficulty: 'Easy',
      entryFee: 'Free beach access',
      hours: '24/7',
      tips: [
        'Book whale watching tours a day in advance',
        'Start whale watching trips at 6 AM for calmer seas',
        'Stay near the main beach for nightlife',
        'Visit Secret Beach for a quieter experience',
      ],
    },
    coordinates: { lat: 5.9489, lng: 80.4582 },
    rating: 4.6,
    reviewCount: 2234,
    reviews: [
      {
        id: 'r7',
        author: 'Anna K.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        rating: 5,
        date: '2024-01-22',
        comment: 'Saw blue whales! The beach is beautiful and the vibe is so relaxed. Perfect paradise.',
      },
    ],
    relatedHotels: ['h6'],
    relatedRestaurants: ['r8'],
    status: 'active',
  },
];

export const hotels: Hotel[] = [
  {
    id: 'h1',
    name: 'Heritance Kandalama',
    location: 'Dambulla',
    category: 'luxury',
    pricePerNight: 220,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    ],
    quickSummary: 'Iconic eco-luxury hotel built into a cliff face with stunning lake and Sigiriya views.',
    description: 'Designed by legendary architect Geoffrey Bawa, this eco-friendly masterpiece blends seamlessly with nature. Features infinity pools, spa, and direct access to Kandalama Lake.',
    amenities: ['Infinity Pool', 'Spa', 'Restaurant', 'WiFi', 'Room Service', 'Nature Trails', 'Bicycle Rental'],
    rating: 4.8,
    reviewCount: 567,
    status: 'active',
  },
  {
    id: 'h2',
    name: 'Aliya Resort & Spa',
    location: 'Sigiriya',
    category: 'luxury',
    pricePerNight: 180,
    heroImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    ],
    quickSummary: 'Modern luxury resort with elephant-inspired architecture and Sigiriya Rock views.',
    description: 'Contemporary resort featuring rooms with private balconies overlooking Sigiriya Rock. Enjoy the infinity pool, Ayurvedic spa, and wildlife experiences.',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Safari Tours', 'Cooking Classes'],
    rating: 4.6,
    reviewCount: 423,
    status: 'active',
  },
  {
    id: 'h3',
    name: '98 Acres Resort',
    location: 'Ella',
    category: 'luxury',
    pricePerNight: 150,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    ],
    quickSummary: 'Boutique eco-resort nestled in a tea estate with stunning valley views.',
    description: 'Award-winning eco-resort set on a working tea estate. Features stilted chalets, farm-to-table dining, and breathtaking views of Ella Gap.',
    amenities: ['Restaurant', 'Bar', 'WiFi', 'Tea Estate Tours', 'Hiking Trails', 'Yoga'],
    rating: 4.7,
    reviewCount: 389,
    status: 'active',
  },
  {
    id: 'h4',
    name: 'Ella Flower Garden Resort',
    location: 'Ella',
    category: 'mid-range',
    pricePerNight: 85,
    heroImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    ],
    quickSummary: 'Charming hillside retreat with colorful gardens and mountain views.',
    description: 'Family-run guesthouse surrounded by beautiful gardens. Offers comfortable rooms, home-cooked meals, and genuine Sri Lankan hospitality.',
    amenities: ['Restaurant', 'Garden', 'WiFi', 'Mountain Views', 'Laundry', 'Tour Booking'],
    rating: 4.5,
    reviewCount: 256,
    status: 'active',
  },
  {
    id: 'h5',
    name: 'Amangalla',
    location: 'Galle Fort',
    category: 'luxury',
    pricePerNight: 450,
    heroImage: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    ],
    quickSummary: 'Ultra-luxury heritage hotel in a restored 17th-century Dutch colonial building.',
    description: 'Experience colonial grandeur at this Aman resort within Galle Fort. Features antique-filled suites, spa, garden restaurant, and impeccable service.',
    amenities: ['Pool', 'Spa', 'Fine Dining', 'Butler Service', 'Library', 'Garden', 'Concierge'],
    rating: 4.9,
    reviewCount: 234,
    status: 'active',
  },
  {
    id: 'h6',
    name: 'The Fort Printers',
    location: 'Galle Fort',
    category: 'mid-range',
    pricePerNight: 90,
    heroImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    ],
    quickSummary: 'Boutique guesthouse in a historic printing press with artistic interiors.',
    description: 'Unique boutique hotel in a converted 18th-century building. Features stylish rooms, rooftop terrace, and central Galle Fort location.',
    amenities: ['Restaurant', 'Bar', 'WiFi', 'Rooftop Terrace', 'Air Conditioning', 'Tour Desk'],
    rating: 4.4,
    reviewCount: 178,
    status: 'active',
  },
  {
    id: 'h7',
    name: 'Wild Coast Tented Lodge',
    location: 'Yala',
    category: 'luxury',
    pricePerNight: 650,
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    ],
    quickSummary: 'Extraordinary glamping experience with cocoon-shaped tents on Yala\'s doorstep.',
    description: 'Award-winning luxury tented camp featuring architect-designed cocoon suites. Offers private plunge pools, wildlife safaris, and stargazing.',
    amenities: ['Private Pool', 'Safari', 'Restaurant', 'Bar', 'Spa', 'Butler', 'Wildlife Guide'],
    rating: 4.9,
    reviewCount: 145,
    status: 'active',
  },
  {
    id: 'h8',
    name: 'Jetwing St. Andrews',
    location: 'Nuwara Eliya',
    category: 'mid-range',
    pricePerNight: 95,
    heroImage: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
    quickSummary: 'Colonial-era hotel with Scottish baronial architecture and cozy fireplaces.',
    description: 'Historic hotel dating to 1875, offering old-world charm with modern comforts. Features a golf course, spa, and traditional high tea service.',
    amenities: ['Restaurant', 'Bar', 'Golf', 'Spa', 'Fireplace', 'Garden', 'High Tea'],
    rating: 4.3,
    reviewCount: 312,
    status: 'active',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'The Lake Restaurant',
    location: 'Dambulla',
    cuisine: 'Sri Lankan',
    specialty: 'Rice & Curry',
    averagePrice: 25,
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    quickSummary: 'Lakeside dining with authentic Sri Lankan cuisine and Sigiriya views.',
    description: 'Enjoy traditional Sri Lankan dishes while overlooking Kandalama Lake. Famous for their elaborate rice and curry spread with over 15 side dishes.',
    rating: 4.5,
    reviewCount: 234,
    status: 'active',
  },
  {
    id: 'r2',
    name: 'Cafe Chill',
    location: 'Ella',
    cuisine: 'International',
    specialty: 'Wood-fired Pizza',
    averagePrice: 12,
    heroImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    ],
    quickSummary: 'Beloved backpacker hangout with great pizzas and mountain views.',
    description: 'Iconic Ella cafe serving excellent wood-fired pizzas, fresh juices, and Sri Lankan dishes. The terrace offers stunning views over Ella Gap.',
    rating: 4.4,
    reviewCount: 567,
    status: 'active',
  },
  {
    id: 'r3',
    name: 'Rotti Hut',
    location: 'Ella',
    cuisine: 'Sri Lankan',
    specialty: 'Kottu Rotti',
    averagePrice: 5,
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    quickSummary: 'Local favorite for authentic kottu rotti prepared on a sizzling griddle.',
    description: 'Watch your kottu being chopped and mixed on the hot griddle at this popular local eatery. The rhythmic sounds and delicious aromas are unforgettable.',
    rating: 4.6,
    reviewCount: 423,
    status: 'active',
  },
  {
    id: 'r4',
    name: 'The Church Street Social',
    location: 'Galle Fort',
    cuisine: 'Fusion',
    specialty: 'Seafood Tapas',
    averagePrice: 35,
    heroImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ],
    quickSummary: 'Trendy cocktail bar and restaurant in a heritage building.',
    description: 'Stylish eatery serving creative fusion tapas and craft cocktails. The colonial building with modern interiors creates a sophisticated atmosphere.',
    rating: 4.3,
    reviewCount: 289,
    status: 'active',
  },
  {
    id: 'r5',
    name: 'Lucky Fort Restaurant',
    location: 'Galle Fort',
    cuisine: 'Sri Lankan',
    specialty: 'Devilled Prawns',
    averagePrice: 15,
    heroImage: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    ],
    quickSummary: 'Family-run gem serving the best devilled prawns in Galle.',
    description: 'Hidden upstairs restaurant beloved by locals and travelers alike. Their devilled prawns and fresh seafood curry are legendary.',
    rating: 4.7,
    reviewCount: 456,
    status: 'active',
  },
  {
    id: 'r6',
    name: 'Leopard Safari Camp Restaurant',
    location: 'Yala',
    cuisine: 'Sri Lankan',
    specialty: 'Bush BBQ',
    averagePrice: 45,
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    ],
    quickSummary: 'Unique dining experience under the stars near the jungle.',
    description: 'Experience bush BBQ dinners with fresh grilled meats and seafood. Dine under the stars while listening to the sounds of the wild.',
    rating: 4.5,
    reviewCount: 123,
    status: 'active',
  },
  {
    id: 'r7',
    name: 'Grand Indian',
    location: 'Nuwara Eliya',
    cuisine: 'Indian',
    specialty: 'Tandoori',
    averagePrice: 18,
    heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    ],
    quickSummary: 'Cozy restaurant serving authentic North Indian cuisine.',
    description: 'Escape the cool hill country weather with warming curries and fresh naan from the tandoor. A local institution since 1985.',
    rating: 4.2,
    reviewCount: 198,
    status: 'active',
  },
  {
    id: 'r8',
    name: 'Dewmini Roti Shop',
    location: 'Mirissa',
    cuisine: 'Sri Lankan',
    specialty: 'Roti Varieties',
    averagePrice: 8,
    heroImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200',
    photoGallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    ],
    quickSummary: 'Famous roti shop serving the most diverse roti menu in Sri Lanka.',
    description: 'This tiny shop offers over 50 types of roti including innovative fillings like chocolate banana and nutella. A must-visit for any food lover.',
    rating: 4.8,
    reviewCount: 678,
    status: 'active',
  },
];

export const categories = {
  destinations: ['all', 'cultural', 'nature', 'wildlife', 'beach'],
  hotels: ['all', 'luxury', 'mid-range', 'budget'],
  restaurants: ['all', 'Sri Lankan', 'International', 'Fusion', 'Indian'],
};

export const stats = [
  { value: '8', label: 'UNESCO Sites', icon: '🏛️' },
  { value: '1,340', label: 'km Coastline', icon: '🏖️' },
  { value: '26', label: 'National Parks', icon: '🌿' },
  { value: '2,500+', label: 'Years of History', icon: '📜' },
];
