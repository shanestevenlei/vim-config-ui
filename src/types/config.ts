export interface BasicConfig {
  enable: boolean;
  nocompatible: boolean;
  mouse: string;
  number: boolean;
  relativenumber: boolean;
  cursorline: boolean;
  wrap: boolean;
  tabstop: number;
  shiftwidth: number;
  expandtab: boolean;
  autoindent: boolean;
  smartindent: boolean;
  hlsearch: boolean;
  incsearch: boolean;
  ignorecase: boolean;
  smartcase: boolean;
  showcmd: boolean;
  showmode: boolean;
  showmatch: boolean;
  wildmenu: boolean;
  backup: boolean;
  write: boolean;
  swapfile: boolean;
}

export interface ThemeConfig {
  colorscheme: string;
  background: string;
  terminalColor0: string;
  terminalColor1: string;
  terminalColor2: string;
  terminalColor3: string;
  terminalColor4: string;
  terminalColor5: string;
  terminalColor6: string;
  terminalColor7: string;
}

export interface PluginConfig {
  [key: string]: boolean | string;
}

export interface ImportedPlugin {
  id: string;
  name: string;
  description: string;
  source: 'github' | 'manual';
}

export type TabType = "basic" | "theme" | "plugin";
export type Language = "en" | "zh";

export type PreviewTabType = "live" | "guide" | "config";

