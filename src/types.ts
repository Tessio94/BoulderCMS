import { Category, Member } from "./payload-types";

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
