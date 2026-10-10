// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS for InviteConfig
// ─────────────────────────────────────────────────────────────────────────────

export interface BilingualText {
  nameEn: string;
  nameHi: string;
}

export interface PersonName extends BilingualText {}

export interface FamilyMember {
  nameEn: string;
  nameHi: string;
}

export interface FamilySide {
  father: FamilyMember;
  mother: FamilyMember;
  pGrandfather?: FamilyMember;
  pGrandmother?: FamilyMember;
  siblings?: FamilyMember[];
  city?: string;
}

export interface DressCode {
  en: string;
  hi: string;
  colors: string[]; // hex color swatches
}

export interface EventDescription {
  en: string;
  hi: string;
}

export interface WeddingEvent {
  id: string;
  nameEn: string;
  nameHi: string;
  date: string; // ISO YYYY-MM-DD
  dayEn: string;
  dayHi: string;
  startTime: string; // HH:mm 24h
  endTime: string;
  muhurat?: string; // display string
  venue: string;
  venueHi: string;
  address: string;
  lat: number;
  lng: number;
  mapsLink: string;
  dressCode: DressCode;
  description: EventDescription;
  accentColor: string;
  motif: string;
  image: string;
  isMain?: boolean;
  familyOnly?: boolean;
}

export interface LoveStoryMilestone {
  id: string;
  year: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  icon: 'diya' | 'lotus' | 'rings' | 'kalash' | 'heart';
  image?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'pre-wedding' | 'engagement' | 'family';
}

export interface Hotel {
  nameEn: string;
  stars: number;
  contact: string;
  bookingUrl?: string;
}

export interface Coordinator {
  nameEn: string;
  phone: string;
  whatsapp: string;
}

export interface TravelInfo {
  nearestAirport: { nameEn: string; nameHi: string; distanceEn: string; distanceHi: string };
  nearestStation: { nameEn: string; nameHi: string; distanceEn: string; distanceHi: string };
  hotels: Hotel[];
  coordinators: Coordinator[];
}

export interface ThemeColors {
  maroon: string;
  gold: string;
  goldLight: string;
  goldDark: string;
  ivory: string;
  marigold: string;
  emerald: string;
  haldi: string;
  mehndi: string;
}

export interface InviteConfig {
  couple: {
    bride: { nameEn: string; nameHi: string; fullNameEn: string; fullNameHi: string; nickname?: string };
    groom: { nameEn: string; nameHi: string; fullNameEn: string; fullNameHi: string; nickname?: string };
    hashtag: string;
  };
  brideFamily: FamilySide;
  groomFamily: FamilySide;
  familyBlessingsEn: string;
  familyBlessingsHi: string;
  nimantranEn: string;
  nimantranHi: string;
  events: WeddingEvent[];
  muhuratDate: string;
  muhuratTime: string;
  muhuratLabel: { en: string; hi: string };
  loveStory: LoveStoryMilestone[];
  gallery: GalleryItem[];
  travel: TravelInfo;
  contact: { whatsappBride: string; whatsappGroom: string };
  upiId?: string;
  upiEnabled: boolean;
  livestreamUrl?: string;
  livestreamEnabled: boolean;
  rsvpDeadline: string;
  musicTrackUrl?: string;
  theme: {
    colors: ThemeColors;
    fontDisplay: string;
    fontScript: string;
    fontBody: string;
    fontDevanagari: string;
  };
  seo: { titleEn: string; titleHi: string; description: string; ogImage: string };
  defaultLanguage: 'en' | 'hi';
}
