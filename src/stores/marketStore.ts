import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface MarketCountry {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  deliveryRegion: 'baltic' | 'uk' | 'europe' | 'international';
}

export const MARKET_COUNTRIES: MarketCountry[] = [
  // Baltic States
  { code: 'LT', name: 'Lithuania', currency: 'EUR', currencySymbol: '€', flag: '🇱🇹', deliveryRegion: 'baltic' },
  { code: 'LV', name: 'Latvia', currency: 'EUR', currencySymbol: '€', flag: '🇱🇻', deliveryRegion: 'baltic' },
  { code: 'EE', name: 'Estonia', currency: 'EUR', currencySymbol: '€', flag: '🇪🇪', deliveryRegion: 'baltic' },
  // United Kingdom
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', currencySymbol: '£', flag: '🇬🇧', deliveryRegion: 'uk' },
  // Europe
  { code: 'AT', name: 'Austria', currency: 'EUR', currencySymbol: '€', flag: '🇦🇹', deliveryRegion: 'europe' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', currencySymbol: '€', flag: '🇧🇪', deliveryRegion: 'europe' },
  { code: 'BG', name: 'Bulgaria', currency: 'BGN', currencySymbol: 'лв', flag: '🇧🇬', deliveryRegion: 'europe' },
  { code: 'HR', name: 'Croatia', currency: 'EUR', currencySymbol: '€', flag: '🇭🇷', deliveryRegion: 'europe' },
  { code: 'CY', name: 'Cyprus', currency: 'EUR', currencySymbol: '€', flag: '🇨🇾', deliveryRegion: 'europe' },
  { code: 'CZ', name: 'Czech Republic', currency: 'CZK', currencySymbol: 'Kč', flag: '🇨🇿', deliveryRegion: 'europe' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', currencySymbol: 'kr', flag: '🇩🇰', deliveryRegion: 'europe' },
  { code: 'FI', name: 'Finland', currency: 'EUR', currencySymbol: '€', flag: '🇫🇮', deliveryRegion: 'europe' },
  { code: 'FR', name: 'France', currency: 'EUR', currencySymbol: '€', flag: '🇫🇷', deliveryRegion: 'europe' },
  { code: 'DE', name: 'Germany', currency: 'EUR', currencySymbol: '€', flag: '🇩🇪', deliveryRegion: 'europe' },
  { code: 'GR', name: 'Greece', currency: 'EUR', currencySymbol: '€', flag: '🇬🇷', deliveryRegion: 'europe' },
  { code: 'HU', name: 'Hungary', currency: 'HUF', currencySymbol: 'Ft', flag: '🇭🇺', deliveryRegion: 'europe' },
  { code: 'IS', name: 'Iceland', currency: 'ISK', currencySymbol: 'kr', flag: '🇮🇸', deliveryRegion: 'europe' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', currencySymbol: '€', flag: '🇮🇪', deliveryRegion: 'europe' },
  { code: 'IT', name: 'Italy', currency: 'EUR', currencySymbol: '€', flag: '🇮🇹', deliveryRegion: 'europe' },
  { code: 'LU', name: 'Luxembourg', currency: 'EUR', currencySymbol: '€', flag: '🇱🇺', deliveryRegion: 'europe' },
  { code: 'MT', name: 'Malta', currency: 'EUR', currencySymbol: '€', flag: '🇲🇹', deliveryRegion: 'europe' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', currencySymbol: '€', flag: '🇳🇱', deliveryRegion: 'europe' },
  { code: 'NO', name: 'Norway', currency: 'NOK', currencySymbol: 'kr', flag: '🇳🇴', deliveryRegion: 'europe' },
  { code: 'PL', name: 'Poland', currency: 'PLN', currencySymbol: 'zł', flag: '🇵🇱', deliveryRegion: 'europe' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', currencySymbol: '€', flag: '🇵🇹', deliveryRegion: 'europe' },
  { code: 'RO', name: 'Romania', currency: 'RON', currencySymbol: 'lei', flag: '🇷🇴', deliveryRegion: 'europe' },
  { code: 'SK', name: 'Slovakia', currency: 'EUR', currencySymbol: '€', flag: '🇸🇰', deliveryRegion: 'europe' },
  { code: 'SI', name: 'Slovenia', currency: 'EUR', currencySymbol: '€', flag: '🇸🇮', deliveryRegion: 'europe' },
  { code: 'ES', name: 'Spain', currency: 'EUR', currencySymbol: '€', flag: '🇪🇸', deliveryRegion: 'europe' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', currencySymbol: 'kr', flag: '🇸🇪', deliveryRegion: 'europe' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', currencySymbol: 'CHF', flag: '🇨🇭', deliveryRegion: 'europe' },
  // International
  { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$', flag: '🇺🇸', deliveryRegion: 'international' },
  { code: 'CA', name: 'Canada', currency: 'CAD', currencySymbol: 'CA$', flag: '🇨🇦', deliveryRegion: 'international' },
  { code: 'AU', name: 'Australia', currency: 'AUD', currencySymbol: 'A$', flag: '🇦🇺', deliveryRegion: 'international' },
  { code: 'JP', name: 'Japan', currency: 'JPY', currencySymbol: '¥', flag: '🇯🇵', deliveryRegion: 'international' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', currencySymbol: '₩', flag: '🇰🇷', deliveryRegion: 'international' },
  { code: 'IL', name: 'Israel', currency: 'ILS', currencySymbol: '₪', flag: '🇮🇱', deliveryRegion: 'international' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', currencySymbol: '₺', flag: '🇹🇷', deliveryRegion: 'international' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', currencySymbol: 'د.إ', flag: '🇦🇪', deliveryRegion: 'international' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', currencySymbol: 'S$', flag: '🇸🇬', deliveryRegion: 'international' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', currencySymbol: 'NZ$', flag: '🇳🇿', deliveryRegion: 'international' },
];

interface MarketStore {
  selectedCountry: MarketCountry;
  setCountry: (country: MarketCountry) => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      selectedCountry: MARKET_COUNTRIES[0], // Default: Lithuania
      setCountry: (country) => set({ selectedCountry: country }),
    }),
    {
      name: 'market-country',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
