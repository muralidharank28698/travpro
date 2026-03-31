import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_BOOKINGS, Booking } from '@/lib/mock-data';

interface BookingsState {
  items: Booking[];
}

const initialState: BookingsState = {
  items: MOCK_BOOKINGS,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.items.push(action.payload);
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: Booking['status'] }>) => {
      const booking = state.items.find(b => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
  },
});

export const { addBooking, updateBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
