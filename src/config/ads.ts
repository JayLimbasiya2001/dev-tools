/**
 * Hilltops Ads configuration.
 * Set VITE_ADS_ENABLED=false in .env to disable during local development.
 */
export const ADS_ENABLED =
  import.meta.env.VITE_ADS_ENABLED !== 'false' &&
  (import.meta.env.PROD || import.meta.env.VITE_ADS_ENABLED === 'true');

/** 300×250 medium rectangle */
export const BANNER_SIZE = { width: 300, height: 250 } as const;

export const HILLTOPS_ADS = {
  topBanner: {
    src: 'https://sophisticatedpin.com/biXBV.s/d/GNls0FY-W/cP/leVmS9/uqZbUnlLkGPATicYwvOATEg-3iNaD/kJt/NvzPAW5/OODycJ1/Miwz',
  },
  sidebarPrimary: {
    src: 'https://sophisticatedpin.com/bPX.VYsAdoGBlo0iYYWPcJ/Beom/9iuJZIU/lzkOPyTdcUwJOOT/gD4KMLDiUjt-NtzaAD5wOSD/gQwPOhQu',
  },
  sidebarSecondary: {
    src: 'https://sophisticatedpin.com/bkXHVvswd.G-l/0fYYWxcF/mekm_9Au/ZhU-lQk/PNTbcUwDOSTXgg4mNjzhMEt/Nfz/AP5oOaD/gH3/N/wa',
  },
  popunder: {
    src: 'https://sorrowfulpsychology.com/bZ3rVm0.PI3/pLv/b/mrVvJ/Z/D/0W3RMoDQkE4/OTTHIb5/LlTbcDwqO/TNg_5/M/ztMm',
  },
} as const;

export type HilltopsPlacement = keyof typeof HILLTOPS_ADS;
