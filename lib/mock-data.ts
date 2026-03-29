export interface Car {
  id: string;
  name: string;
  type: string;
  seats: number;
  transmission: string;
  fuel: string;
  pricePerDay: number;
  status: "Available" | "Booked" | "Maintenance";
  image: string;
  description: string;
  rating: number;
  trips: number;
  location: string;
}

export interface Booking {
  id: string;
  carName: string;
  customerName: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  tripType: "One Way" | "Round Trip";
  status: "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  amount: number;
}

export const MOCK_CARS: Car[] = [
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    pricePerDay: 5500,
    status: "Available",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    description: "Premium 7-seater SUV perfect for family trips and long-distance travel. Features advanced safety systems and plush interiors.",
    rating: 4.8,
    trips: 142,
    location: "Chennai Central",
  },
  {
    id: "honda-city",
    name: "Honda City",
    type: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 3500,
    status: "Booked",
    image: "https://picsum.photos/id/111/800/600",
    description: "Elegant sedan with best-in-class mileage and a refined driving experience. Ideal for city commutes and business travel.",
    rating: 4.6,
    trips: 98,
    location: "T. Nagar",
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    type: "Luxury",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 8500,
    status: "Available",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
    description: "Luxury executive sedan with quattro all-wheel drive. Premium leather, panoramic sunroof, and cutting-edge technology.",
    rating: 4.9,
    trips: 56,
    location: "Anna Nagar",
  },
  {
    id: "kia-carnival",
    name: "Kia Carnival",
    type: "MUV",
    seats: 9,
    transmission: "Automatic",
    fuel: "Diesel",
    pricePerDay: 6500,
    status: "Available",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    description: "Spacious premium MPV with airline-style seats and entertainment system. Perfect for group travel and corporate events.",
    rating: 4.7,
    trips: 73,
    location: "Adyar",
  },
  {
    id: "mahindra-thar",
    name: "Mahindra Thar",
    type: "Off-Road",
    seats: 4,
    transmission: "Manual",
    fuel: "Diesel",
    pricePerDay: 4500,
    status: "Maintenance",
    image: "https://picsum.photos/id/133/800/600",
    description: "Rugged off-road SUV built for adventure. 4x4 capability, convertible top, and trail-rated performance.",
    rating: 4.5,
    trips: 34,
    location: "Velachery",
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Ertiga",
    type: "MPV",
    seats: 7,
    transmission: "Automatic",
    fuel: "CNG",
    pricePerDay: 2800,
    status: "Available",
    image: "https://picsum.photos/id/1071/800/600",
    description: "Budget-friendly 7-seater MPV with excellent fuel economy. CNG option makes it the most economical choice for daily use.",
    rating: 4.3,
    trips: 210,
    location: "Tambaram",
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "JT-1001",
    carName: "Toyota Fortuner",
    customerName: "Rajesh Kumar",
    phone: "+91 98765 43210",
    pickupLocation: "Chennai Central",
    dropoffLocation: "Pondicherry",
    startDate: "2026-03-30",
    endDate: "2026-04-01",
    tripType: "Round Trip",
    status: "Confirmed",
    amount: 11000,
  },
  {
    id: "JT-1002",
    carName: "Honda City",
    customerName: "Priya Sharma",
    phone: "+91 87654 32109",
    pickupLocation: "T. Nagar",
    dropoffLocation: "Mahabalipuram",
    startDate: "2026-03-29",
    endDate: "2026-03-29",
    tripType: "One Way",
    status: "In Progress",
    amount: 3500,
  },
  {
    id: "JT-1003",
    carName: "Audi A6",
    customerName: "Amit Patel",
    phone: "+91 76543 21098",
    pickupLocation: "Anna Nagar",
    dropoffLocation: "Bangalore",
    startDate: "2026-03-26",
    endDate: "2026-03-28",
    tripType: "Round Trip",
    status: "Completed",
    amount: 25500,
  },
  {
    id: "JT-1004",
    carName: "Kia Carnival",
    customerName: "Sunita Reddy",
    phone: "+91 65432 10987",
    pickupLocation: "Adyar",
    dropoffLocation: "Tirupati",
    startDate: "2026-04-02",
    endDate: "2026-04-04",
    tripType: "Round Trip",
    status: "Confirmed",
    amount: 19500,
  },
  {
    id: "JT-1005",
    carName: "Maruti Ertiga",
    customerName: "Vikram Singh",
    phone: "+91 54321 09876",
    pickupLocation: "Tambaram",
    dropoffLocation: "Vellore",
    startDate: "2026-03-25",
    endDate: "2026-03-25",
    tripType: "One Way",
    status: "Completed",
    amount: 2800,
  },
  {
    id: "JT-1006",
    carName: "Toyota Fortuner",
    customerName: "Meera Nair",
    phone: "+91 43210 98765",
    pickupLocation: "Chennai Central",
    dropoffLocation: "Kodaikanal",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
    tripType: "Round Trip",
    status: "Cancelled",
    amount: 16500,
  },
];

export const CURRENT_USER = {
  name: "Murali Dharan",
  email: "admin@zytravo.com",
  role: "Fleet Manager",
  avatar: "https://avatar.iran.liara.run/public/1",
};
