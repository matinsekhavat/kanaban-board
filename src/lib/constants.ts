import { SortOption, PriorityLevel, PirorityStatus } from '@/types/types';

export const SORT_CONSTANTS = {
  DEFAULT_SORT: 'name-asc',
  OPTIONS: [
    { label: 'A - Z', value: 'name-asc' },
    { label: 'Z - A', value: 'name-desc' },
    { label: 'Newest', value: 'date-desc' },
    { label: 'Oldest', value: 'date-asc' },
  ] as const satisfies readonly SortOption[],
} as const;

export const PRIORITY_COLORS = {
  low: 'success',
  mid: 'warning',
  high: 'error',
} as const satisfies Record<PriorityLevel, PirorityStatus>;
