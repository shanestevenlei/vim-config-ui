import type { BasicConfig, PluginConfig } from '../types/config';
import { THEME_COLORS } from '../config/themes';

interface LivePreviewProps {
  basicConfig: BasicConfig;
  themeConfig: { colorscheme: string; background: string };
  pluginConfig: PluginConfig;
}

export function LivePreview({ basicConfig, themeConfig, pluginConfig }: LivePreviewProps) {
  const code = `function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
const x = fib(10); // git diff demo`;
  const lines = code.split("\n");

  // Check for different plugin categories
  const hasGitPlugin = pluginConfig.gitgutter || pluginConfig.fugitive || pluginConfig.gitsigns || pluginConfig.lazygit;
  const hasStatusBar = pluginConfig.airline || pluginConfig.lightline;
  const hasFileTree = pluginConfig.nerdtree;
  const hasSearch = pluginConfig.fzf || pluginConfig.telescope;
  const hasCompletion = pluginConfig.coc;
  const hasEditing = pluginConfig.surround || pluginConfig.comment;

  // Helper to check any plugin is enabled
  const anyPlugin = Object.values(pluginConfig).some(v => v === true);

  const scheme = THEME_COLORS[themeConfig.colorscheme] || THEME_COLORS.default;
  const themeColors = themeConfig.background === 'light' ? scheme.light : scheme.dark;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-600 relative" style={{ overflow: 'hidden' }}>
      {/* File tree sidebar simulation - INSIDE the preview */}
      {hasFileTree && (
        <div
          className="absolute left-0 top-8 w-36 h-full bg-gray-800 border-r border-gray-700 p-2 text-xs font-mono z-10 overflow-hidden"
          style={{ maxHeight: '200px' }}
        >
          <div className="text-gray-400 mb-1">▼ project/</div>
          <div className="text-yellow-400 ml-2">📄 src/</div>
          <div className="text-gray-300 ml-4">📄 index.js</div>
          <div className="text-gray-300 ml-4">📄 utils.js</div>
          <div className="text-gray-300 ml-2">📄 package.json</div>
          <div className="text-gray-500 ml-2">📄 README.md</div>
        </div>
      )}

      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 flex items-center gap-2">
        <span>📄 sample.js</span>
        {hasGitPlugin && <span className="text-orange-400">✏️ +2 -1</span>}
        {hasCompletion && <span className="text-blue-400">💡</span>}
        <span className="ml-auto text-gray-500">
          {basicConfig.number ? (basicConfig.relativenumber ? "Rel" : "Abs") : ""}
          {basicConfig.cursorline ? " │ Cur" : ""}
        </span>
      </div>
      <div
        className="relative font-mono text-sm leading-5 p-2"
        style={{
          backgroundColor: themeColors.bg,
          color: themeColors.fg,
          minHeight: '180px',
          marginLeft: hasFileTree ? '9rem' : '0'
        }}
      >
        {/* Search overlay simulation */}
        {hasSearch && (
          <div className="absolute top-2 right-2 bg-purple-600 px-3 py-1 rounded text-xs text-white z-10">
            🔍 Search: fib
          </div>
        )}

        {/* Git gutter signs */}
        {hasGitPlugin && (
          <div
            className="absolute left-0 top-0 w-6 text-center text-xs text-orange-400 select-none"
            style={{ borderRight: `1px solid ${themeColors.colors[6]}22` }}
          >
            {lines.map((_, i) => (
              <div key={i} className={i === 3 ? "text-orange-400" : i === 4 ? "text-green-500" : ""}>
                {i === 3 ? "+" : i === 4 ? "-" : " "}
              </div>
            ))}
          </div>
        )}

        {/* Line numbers */}
        {basicConfig.number && (
          <div
            className="absolute left-0 top-0 text-right pr-2 text-gray-500 select-none"
            style={{
              left: hasGitPlugin ? '1.5rem' : '0',
              borderRight: `1px solid ${themeColors.colors[6]}22`
            }}
          >
            {lines.map((_, i) => (
              <div key={i} className={i === 2 && basicConfig.cursorline ? "text-emerald-400 font-bold" : ""}>
                {basicConfig.relativenumber ? (i === 2 ? 2 : i === 0 ? 0 : 1) : i + 1}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginLeft: (hasGitPlugin ? '1.5rem' : '0') + (basicConfig.number ? '2rem' : '0') }}>
          {lines.map((line, i) => {
            // Calculate indent based on expandtab and tabstop
            const indentMatch = line.match(/^(\s*)/);
            const indent = indentMatch ? indentMatch[1] : '';
            let displayIndent = indent;
            if (basicConfig.expandtab && indent.includes('\t')) {
              // Convert tabs to spaces
              displayIndent = indent.replace(/\t/g, ' '.repeat(basicConfig.tabstop));
            } else if (basicConfig.expandtab) {
              // Ensure correct number of spaces
              displayIndent = ' '.repeat(indent.length * basicConfig.tabstop);
            }
            const content = line.trim();

            return (
              <div
                key={i}
                style={{
                  backgroundColor: i === 2 && basicConfig.cursorline ? `${themeColors.fg}15` : 'transparent',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre'
                }}
              >
                <span style={{ visibility: 'hidden' }}>{displayIndent}</span>{content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      {(hasStatusBar || basicConfig.showmode) && (
        <div
          className="px-3 py-1 text-xs flex justify-between"
          style={{
            backgroundColor: hasStatusBar ? themeColors.colors[3] + '30' : themeColors.colors[0] + '40',
            borderTop: `1px solid ${themeColors.colors[6]}44`
          }}
        >
          <div className="flex items-center gap-3">
            {hasStatusBar && (
              <>
                <span style={{ color: themeColors.colors[3] }}>main*</span>
                <span style={{ color: themeColors.colors[2] }}>js</span>
                <span style={{ color: themeColors.colors[6] }}>UTF-8</span>
                {hasGitPlugin && <span style={{ color: themeColors.colors[1] }}>git</span>}
                {hasEditing && <span style={{ color: themeColors.colors[4] }}>✏️</span>}
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {basicConfig.showmode && <span style={{ color: themeColors.colors[5] }}>-- INSERT --</span>}
            <span style={{ color: themeColors.colors[6] }}>Ln 3, Col 15</span>
            {basicConfig.expandtab && <span style={{ color: themeColors.colors[1] }}>{basicConfig.tabstop} spaces</span>}
          </div>
        </div>
      )}

      {/* Plugin effects indicators - ALL plugins */}
      {anyPlugin && (
        <div className="bg-gray-800 px-3 py-2 text-xs border-t border-gray-700">
          <div className="flex flex-wrap gap-1">
            {pluginConfig.nerdtree && <span className="px-2 py-0.5 bg-yellow-600 rounded text-white">📁 NERDTree</span>}
            {pluginConfig.fzf && <span className="px-2 py-0.5 bg-purple-600 rounded text-white">🔍 fzf</span>}
            {pluginConfig.telescope && <span className="px-2 py-0.5 bg-pink-600 rounded text-white">🔭 Telescope</span>}
            {pluginConfig.coc && <span className="px-2 py-0.5 bg-blue-600 rounded text-white">💡 coc.nvim</span>}
            {(pluginConfig.airline || pluginConfig.lightline) && <span className="px-2 py-0.5 bg-cyan-600 rounded text-white">📊 Status Bar</span>}
            {(pluginConfig.gitgutter || pluginConfig.fugitive || pluginConfig.gitsigns || pluginConfig.lazygit) && <span className="px-2 py-0.5 bg-orange-600 rounded text-white">📦 Git</span>}
            {pluginConfig.surround && <span className="px-2 py-0.5 bg-green-600 rounded text-white">🔄 Surround</span>}
            {pluginConfig.comment && <span className="px-2 py-0.5 bg-teal-600 rounded text-white">💬 Comment</span>}
            {pluginConfig.treesitter && <span className="px-2 py-0.5 bg-indigo-600 rounded text-white">🌳 TreeSitter</span>}
            {pluginConfig.typescript && <span className="px-2 py-0.5 bg-blue-700 rounded text-white">📘 TypeScript</span>}
          </div>
        </div>
      )}
    </div>
  );
}
