export interface Business {
  id: number
  name: string
  subtitle: string
  category: string
  categoryLabel: string
  reward: string
  address: string
  distance: string
  emoji: string
  open: boolean
  closingSoon?: boolean
  stamps: number
  totalStamps: number
  description: string
  phone: string
  hours: string
}

export const businesses: Business[] = [
  {
    id: 1, name: 'Bloom Café', subtitle: 'Premium Roastery',
    category: 'Coffee', categoryLabel: 'Coffee & Dining',
    reward: 'Win: Free Coffee', address: 'Main Street, New York, 10001',
    distance: '0.4 miles', emoji: '☕', open: true,
    stamps: 4, totalStamps: 10,
    description: 'Your neighbourhood specialty coffee shop. Freshly roasted beans, cosy vibes.',
    phone: '+1 212 555 0101', hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–6pm',
  },
  {
    id: 2, name: 'Quick & Cozy', subtitle: 'Luxury Stay',
    category: 'Hotel', categoryLabel: 'Hospitality',
    reward: 'Win: Loyalty Reward', address: 'Hanuman mandir purnahiya, Sitamarhi',
    distance: '1.2 miles', emoji: '🛋️', open: true,
    stamps: 2, totalStamps: 8,
    description: 'Warm drinks and cosy corners — your perfect work-from-café spot.',
    phone: '+91 98765 43210', hours: 'Daily 8am–9pm',
  },
  {
    id: 3, name: 'Roots & Love', subtitle: 'Artisan Bakery',
    category: 'Restaurant', categoryLabel: 'Food',
    reward: 'Win: Loyalty Reward', address: 'Shiv shakti Complex, Dahisar East, Mumbai',
    distance: '0.9 miles', emoji: '🍽️', open: true,
    stamps: 6, totalStamps: 10,
    description: 'Home-style Indian cuisine made with love. Family recipes, fresh ingredients.',
    phone: '+91 22 2688 0000', hours: 'Daily 11am–11pm',
  },
  {
    id: 4, name: 'Meraj Hair Studio', subtitle: 'Premium Barbershop',
    category: 'Salon', categoryLabel: 'Lifestyle',
    reward: 'Win: Complimentary Trim', address: '19.105699, 72.913263',
    distance: '2.5 miles', emoji: '✂️', open: true, closingSoon: true,
    stamps: 1, totalStamps: 6,
    description: 'Expert cuts, colour, and styling for men and women. Walk-ins welcome.',
    phone: '+91 90000 12345', hours: 'Tue–Sun 10am–8pm',
  },
  {
    id: 5, name: 'Mangals Restaurant', subtitle: 'North Indian Grill',
    category: 'Restaurant', categoryLabel: 'Food',
    reward: 'Win: Loyalty Reward', address: 'Sector 14, Gurugram, 122001',
    distance: '1.8 miles', emoji: '🍽️', open: true,
    stamps: 3, totalStamps: 10,
    description: 'Authentic North Indian grill and tandoor specialities since 1998.',
    phone: '+91 124 456 7890', hours: 'Daily 12pm–11pm',
  },
  {
    id: 6, name: 'Wellness Zone', subtitle: 'Fitness & Wellness',
    category: 'Gym', categoryLabel: 'Health',
    reward: 'Win: Free Session', address: 'Park Avenue, Chicago, 60601',
    distance: '3.1 miles', emoji: '💪', open: false,
    stamps: 5, totalStamps: 12,
    description: 'State-of-the-art equipment, personal trainers, and group classes.',
    phone: '+1 312 555 0199', hours: 'Mon–Sat 6am–10pm, Sun 8am–6pm',
  },
  {
    id: 7, name: 'A Studio', subtitle: 'Creative Styling',
    category: 'Salon', categoryLabel: 'Lifestyle',
    reward: 'Win: Discount', address: 'Lake View, Chicago, 60613',
    distance: '0.7 miles', emoji: '🎨', open: true,
    stamps: 2, totalStamps: 8,
    description: 'Creative hair colouring and art-inspired styling in a relaxed studio setting.',
    phone: '+1 312 555 0177', hours: 'Wed–Mon 10am–7pm',
  },
  {
    id: 8, name: 'MediCare Pharmacy', subtitle: 'Community Pharmacy',
    category: 'Pharmacy', categoryLabel: 'Health',
    reward: 'Win: 10% Off', address: '45 Health Ave, Brooklyn, NY',
    distance: '0.5 miles', emoji: '💊', open: true,
    stamps: 3, totalStamps: 10,
    description: 'Your trusted community pharmacy. Prescriptions, health products, and expert advice.',
    phone: '+1 718 555 0140', hours: 'Daily 8am–10pm',
  },
  {
    id: 9, name: 'ShineUp Car Wash', subtitle: 'Premium Detailing',
    category: 'Car Wash', categoryLabel: 'Automotive',
    reward: 'Win: Free Wash', address: '88 Motor Lane, Queens, NY',
    distance: '1.5 miles', emoji: '🚗', open: false,
    stamps: 4, totalStamps: 8,
    description: 'Premium full-service car wash and detailing. Gleam guaranteed.',
    phone: '+1 718 555 0188', hours: 'Mon–Sat 8am–6pm',
  },
  {
    id: 10, name: 'Grand Stay Hotel', subtitle: 'Five-Star Luxury',
    category: 'Hotel', categoryLabel: 'Hospitality',
    reward: 'Win: Free Night', address: '1 Luxury Blvd, Manhattan, NY',
    distance: '4.0 miles', emoji: '🏨', open: true,
    stamps: 1, totalStamps: 5,
    description: 'Five-star luxury in the heart of Manhattan. Earn a complimentary night stay.',
    phone: '+1 212 555 0100', hours: 'Open 24 hours',
  },
  {
    id: 11, name: 'StyleCo Retail', subtitle: 'Fashion & Lifestyle',
    category: 'Retail', categoryLabel: 'Retail',
    reward: 'Win: Gift Voucher', address: 'Mall Road, South Mumbai, 400001',
    distance: '2.2 miles', emoji: '🛍️', open: true,
    stamps: 0, totalStamps: 8,
    description: 'Trendy fashion and lifestyle picks. Loyalty members get exclusive early access.',
    phone: '+91 22 6612 3456', hours: 'Daily 10am–10pm',
  },
]
