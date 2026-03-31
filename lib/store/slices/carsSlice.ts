import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_CARS, Car } from '@/lib/mock-data';

interface CarsState {
  items: Car[];
}

const initialState: CarsState = {
  items: MOCK_CARS,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Car>) => {
      state.items.push(action.payload);
    },
    updateCarStatus: (state, action: PayloadAction<{ id: string; status: Car['status'] }>) => {
      const car = state.items.find(c => c.id === action.payload.id);
      if (car) {
        car.status = action.payload.status;
      }
    },
  },
});

export const { addCar, updateCarStatus } = carsSlice.actions;
export default carsSlice.reducer;
