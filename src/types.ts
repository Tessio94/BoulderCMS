import { Category, Gym, Media, Member } from "./payload-types";

export type EventType = {
  title: string;
  from: string;
  until: string;
  description: string | null | undefined;
  link?: string;
  slug: string | null | undefined;
};

export type LocaleType = "en" | "de" | "all" | undefined;

export type joinedMemberType = {
  id: number;
  member: Member;
  category: Category;
};

export type Filters = {
  from: string;
  to: string;
  hall: string;
  term: string;
  sort: string;
  locale: LocaleType;
};

export type GalleryType = {
  id: number;
  slug?: string | null;
  title: string;
  gym: number | Gym;
  location?: string | null;
  from: string;
  gallery?: (number | Media)[] | null;
  heroImage?: number | Media | null;
};
