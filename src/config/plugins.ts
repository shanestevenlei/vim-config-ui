export interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  plug: string; // vim-plug repository URL
  branch?: string; // optional branch for vim-plug
}

export const PLUGINS: Plugin[] = [
  { id: "nerdtree", name: "NERDTree", description: "File tree explorer", category: "ui", plug: "preservim/nerdtree" },
  { id: "fzf", name: "fzf.vim", description: "Fuzzy finder", category: "search", plug: "junegunn/fzf.vim" },
  { id: "coc", name: "coc.nvim", description: "Intellisense engine", category: "completion", plug: "neoclide/coc.nvim", branch: "release" },
  { id: "airline", name: "vim-airline", description: "Status bar", category: "ui", plug: "vim-airline/vim-airline" },
  { id: "lightline", name: "lightline.vim", description: "Lightweight status bar", category: "ui", plug: "itchyny/lightline.vim" },
  { id: "surround", name: "vim-surround", description: "Surround manipulations", category: "editing", plug: "tpope/vim-surround" },
  { id: "comment", name: "vim-commentary", description: "Comment toggling", category: "editing", plug: "tpope/vim-commentary" },
  { id: "gitgutter", name: "vim-gitgutter", description: "Git diff signs", category: "git", plug: "airblade/vim-gitgutter" },
  { id: "fugitive", name: "vim-fugitive", description: "Git wrapper", category: "git", plug: "tpope/vim-fugitive" },
  { id: "lazygit", name: "lazygit.nvim", description: "LazyGit integration", category: "git", plug: "kdheepak/lazygit.nvim" },
  { id: "gitsigns", name: "gitsigns.nvim", description: "Git signs", category: "git", plug: "lewis6991/gitsigns.nvim" },
  { id: "telescope", name: "Telescope", description: "Fuzzy finder", category: "search", plug: "nvim-telescope/telescope.nvim" },
  { id: "treesitter", name: "TreeSitter", description: "Syntax highlighting", category: "syntax", plug: "nvim-treesitter/nvim-treesitter" },
  { id: "typescript", name: "typescript.nvim", description: "TS support", category: "lang", plug: "jose-elias-alvarez/typescript.nvim" },
];

// Color scheme plugins for vim-plug
export const COLOR_SCHEME_PLUGINS: Record<string, string> = {
  gruvbox: "morhetz/gruvbox",
  dracula: "dracula/vim",
  tokyonight: "folke/tokyo-night.nvim",
  onedark: "joshdick/onedark.vim",
  nord: "arcticicestudio/nord-vim",
};
