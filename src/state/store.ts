import { create } from 'zustand';

interface CalendarStore {
    viewMode: 'gregorian' | 'ethiopian';
    setViewMode: (mode: 'gregorian' | 'ethiopian') => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
    viewMode: 'ethiopian',
    setViewMode: (mode) => set({ viewMode: mode })
}));
