import { SECTION_COMPLETE, SECTION_QUICK } from '../utils/constants';

export interface Info {
  question: string;
  answer: string;
}

export interface Item {
  createdAt: string;
  info: Info[];
  email: string;
  images?: string[];
  tags: string[];
  type: typeof SECTION_QUICK | typeof SECTION_COMPLETE;
  updatedAt?: string;
}

export interface ItemWithId extends Item {
  id: string;
}
