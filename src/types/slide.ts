export type SlideLayoutType = 
  | 'title'
  | 'split-contrast'
  | 'dossier'
  | 'media-grid'
  | 'tactical-map'
  | 'battle'
  | 'memorial-quote'
  | 'conclusion';

export interface SlidePoint {
  title?: string;
  desc: string;
  highlight?: string;
  accent?: 'red' | 'brass' | 'olive';
}

export interface SlideStat {
  label: string;
  value: string;
  detail?: string;
}

export interface SlideQuote {
  text: string;
  author: string;
  role?: string;
  source?: string;
}

export interface SlideMedia {
  url: string;
  caption?: string;
  source?: string;
  secondaryUrl?: string;
  secondaryCaption?: string;
  gallery?: Array<{
    url: string;
    caption?: string;
    source?: string;
  }>;
  galleryGroup?: string;
}

export interface SpeakerNoteData {
  cue: string;
  scriptSnippet: string;
  timing: string;
  keyVocabulary?: string[];
}

export interface SlideCinematicVideo {
  src: string;
  title: string;
  badge?: string;
  caption?: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  tag: string;
  date?: string;
  theater?: string;
  layoutType: SlideLayoutType;
  content: {
    lead?: string;
    points?: SlidePoint[];
    leftCol?: {
      header: string;
      items: string[];
      subtitle?: string;
      theme?: 'golden' | 'slate';
    };
    rightCol?: {
      header: string;
      items: string[];
      subtitle?: string;
      highlight?: boolean;
      theme?: 'golden' | 'slate';
    };
    quote?: SlideQuote;
    stats?: SlideStat[];
    cards?: Array<{
      title: string;
      unit: string;
      theater: string;
      desc: string;
      imageUrl?: string;
    }>;
    stops?: Array<{
      num: number;
      name: string;
      date: string;
      theater: string;
      coords: string;
      status: string;
    }>;
  };
  media?: SlideMedia;
  speakerNote: SpeakerNoteData;
  cinematicVideo?: SlideCinematicVideo;
}

