/* eslint-disable @typescript-eslint/no-explicit-any */

const mockCars = [
  { id: "toyota-fortuner", name: "Toyota Fortuner", image_url: "/cars/fortuner.jpg" },
  { id: "honda-city", name: "Honda City", image_url: "/cars/city.jpg" },
];

let mockBookings: any[] = [
  {
    id: "mock-1",
    car_id: "toyota-fortuner",
    user_name: "John Doe",
    start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    end_time: new Date(Date.now() + 90000000).toISOString(),
    cars: { name: "Toyota Fortuner" }
  }
];

// Mock Credentials
const MOCK_CREDENTIALS = [
  { email: 'admin@jayasreetravels.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'user@jayasreetravels.com', password: 'user123', role: 'user', name: 'Mock Customer' },
];

// Mock Session Persistence
const SESSION_KEY = 'jayasree-mock-auth';
const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

const setStoredSession = (session: any) => {
  if (typeof window === 'undefined') return;
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
};

// Simple event bus for auth changes
const listeners = new Set<(event: string, session: any) => void>();

export const createMockClient = () => {
  return {
    from: (table: string) => ({
      select: (query?: string) => ({
        eq: (col: string, val: any) => ({
          single: async () => {
            if (table === "cars") return { data: mockCars.find(c => c.id === val), error: null };
            return { data: null, error: null };
          },
          maybeSingle: async () => {
            if (table === "bookings") return { data: mockBookings.find(b => b.car_id === val), error: null };
            return { data: null, error: null };
          }
        }),
        filter: (col: string, op: string, val: any) => ({
          filter: () => (createMockClient() as any).from(table).select(query)
        }),
        order: (col: string, opts: any) => Promise.resolve({ data: [...mockBookings], error: null }),
        lt: (col: string, val: any) => ({
          gt: (col2: string, val2: any) => ({
            maybeSingle: async () => ({ data: null, error: null })
          })
        }),
        then: (onfulfilled: any) => {
          if (table === "cars") return Promise.resolve({ data: mockCars, error: null }).then(onfulfilled);
          if (table === "bookings") return Promise.resolve({ data: mockBookings, error: null }).then(onfulfilled);
          return Promise.resolve({ data: [], error: null }).then(onfulfilled);
        }
      }),
      insert: async (data: any) => {
        const newBooking = { ...data, id: Math.random().toString(), cars: mockCars.find(c => c.id === data.car_id) };
        mockBookings = [newBooking, ...mockBookings];
        return { data: newBooking, error: null };
      },
      delete: () => ({
        eq: (col: string, val: any) => {
          mockBookings = mockBookings.filter(b => b.id !== val);
          return Promise.resolve({ error: null });
        }
      })
    }),
    auth: {
      signInWithPassword: async ({ email, password }: any) => {
        const found = MOCK_CREDENTIALS.find(u => u.email === email && u.password === password);
        
        if (!found) {
          return { 
            data: { user: null, session: null }, 
            error: { message: 'Invalid email or password. Use: admin@jayasreetravels.com / admin123  OR  user@jayasreetravels.com / user123' } 
          };
        }

        const user = { 
          id: 'mock-uuid', 
          email, 
          user_metadata: { 
            full_name: found.name,
            role: found.role
          } 
        };
        const session = { user, access_token: 'mock-token' };
        setStoredSession(session);
        listeners.forEach(l => l('SIGNED_IN', session));
        return { data: { user, session }, error: null };
      },
      signOut: async () => {
        setStoredSession(null);
        listeners.forEach(l => l('SIGNED_OUT', null));
        return { error: null };
      },
      getSession: async () => ({ data: { session: getStoredSession() }, error: null }),
      getUser: async () => ({ data: { user: getStoredSession()?.user || null }, error: null }),
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        listeners.add(callback);
        // Initial trigger
        callback('INITIAL_SESSION', getStoredSession());
        return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } };
      }
    }
  };
};
