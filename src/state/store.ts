import { create } from 'zustand';
import { UserSettings } from '../types';
import { getSettings } from '../queries/settingQueries';

export const defaultSettings: UserSettings = {
    language: 'am',
    fontSize: 16,
    darkMode: true
};

interface SettingStore {
    settings: UserSettings;
    // setSettings: (setting: Partial<UserSettings>) => void
}

export const useSettingsStore = create<SettingStore>((set) => ({
    settings: defaultSettings,
    fetch: async () => {
        const result = await getSettings();
        const settingsData = result[0].settings;
        set({ settings: settingsData });
    }
}));

interface CalendarStore {
    viewMode: 'gregorian' | 'ethiopian';
    setViewMode: (mode: 'gregorian' | 'ethiopian') => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
    viewMode: 'ethiopian',
    setViewMode: (mode) => set({ viewMode: mode })
}));
