import { BaseEntity } from "./base.type";

export type Budget = BaseEntity & {
  month: string; // "2026-04"
  name?: string;

  isTemplate?: boolean;
};
