import { create } from 'zustand';

const useSquares = create((set) => ({
  squares: Array(9).fill(null),
  setSquares: (squares) => set({ squares }),
  restart: () => set({ squares: Array(9).fill(null) }),
}));

export default useSquares;
