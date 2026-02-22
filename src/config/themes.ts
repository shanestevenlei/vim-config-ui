export interface ThemeColorScheme {
  dark: { bg: string; fg: string; colors: string[] };
  light: { bg: string; fg: string; colors: string[] };
}

export const THEME_COLORS: Record<string, ThemeColorScheme> = {
  gruvbox: {
    dark: { bg: "#282828", fg: "#ebdbb2", colors: ["#cc241d", "#98971a", "#d79921", "#458588", "#b16286", "#689d6a", "#a89984", "#928374"] },
    light: { bg: "#fbf1c7", fg: "#3c3836", colors: ["#cc241d", "#98971a", "#d79921", "#458588", "#b16286", "#689d6a", "#7c6f64", "#928374"] }
  },
  dracula: {
    dark: { bg: "#282a36", fg: "#f8f8f2", colors: ["#ff5555", "#50fa7b", "#f1fa8c", "#bd93f9", "#ff79c6", "#8be9fd", "#6272a4", "#44475a"] },
    light: { bg: "#f8f8f2", fg: "#282a36", colors: ["#ff5555", "#50fa7b", "#f1fa8c", "#bd93f9", "#ff79c6", "#8be9fd", "#6272a4", "#44475a"] }
  },
  tokyonight: {
    dark: { bg: "#1a1b26", fg: "#c0caf5", colors: ["#f7768e", "#9ece6a", "#e0af68", "#7aa2f7", "#bb9af7", "#7dcfff", "#7aa2f7", "#414868"] },
    light: { bg: "#e8e8e8", fg: "#3760b8", colors: ["#f7768e", "#9ece6a", "#e0af68", "#7aa2f7", "#bb9af7", "#7dcfff", "#7aa2f7", "#414868"] }
  },
  onedark: {
    dark: { bg: "#282c34", fg: "#abb2bf", colors: ["#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#5c6370", "#282c34"] },
    light: { bg: "#ffffff", fg: "#383a42", colors: ["#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#5c6370", "#a0a0a0"] }
  },
  nord: {
    dark: { bg: "#2e3440", fg: "#eceff4", colors: ["#bf616a", "#a3be8c", "#ebcb8b", "#81a1c1", "#b48ead", "#88c0d0", "#4c566a", "#3b4252"] },
    light: { bg: "#eceff4", fg: "#2e3440", colors: ["#bf616a", "#a3be8c", "#ebcb8b", "#81a1c1", "#b48ead", "#88c0d0", "#4c566a", "#d8dee9"] }
  },
  default: {
    dark: { bg: "#000000", fg: "#ffffff", colors: ["#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#808080", "#c0c0c0"] },
    light: { bg: "#ffffff", fg: "#000000", colors: ["#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#808080", "#c0c0c0"] }
  }
};
