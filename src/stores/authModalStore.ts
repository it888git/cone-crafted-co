import { create } from "zustand";

interface AuthModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  openModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openModal: () => set({ open: true }),
}));
