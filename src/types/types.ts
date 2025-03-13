export type ThemeLiteral = 'light' | 'dark';
export type ThemeContextValue = {
  theme: ThemeLiteral;
  setTheme: (theme: ThemeLiteral) => void;
  toggleTheme: () => void;
};

// Types definition
export type SortOption = {
  label: string;
  value: string;
};
