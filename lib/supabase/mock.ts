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

export const createMockClient = () => {
  const queryInterface = {
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
          filter: () => queryInterface.from(table).select(query)
        }),
        order: (col: string, opts: any) => Promise.resolve({ data: [...mockBookings], error: null }),
        lt: (col: string, val: any) => ({
          gt: (col2: string, val2: any) => ({
            maybeSingle: async () => ({ data: null, error: null }) // Simulate no conflict
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
      signInWithPassword: async ({ email }: any) => {
        return { data: { user: { email } }, error: null };
      },
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: { email: "admin@mock.com" } }, error: null })
    }
  };

  return queryInterface;
};
