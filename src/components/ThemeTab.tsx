import type { ThemeConfig } from '../types/config';
import { THEME_COLORS } from '../config/themes';
import type { Translation } from '../i18n/translations';

interface ThemeTabProps {
  config: ThemeConfig;
  themeColors: { bg: string; fg: string; colors: string[] };
  onChange: (_key: keyof ThemeConfig, _value: ThemeConfig[keyof ThemeConfig]) => void;
  t: Translation['theme'];
  lang: 'en' | 'zh';
}

export function ThemeTab({ config, themeColors, onChange, t, lang }: ThemeTabProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.colorScheme}</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(THEME_COLORS).map(([id]) => (
            <button
              key={id}
              onClick={() => onChange("colorscheme", id)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                config.colorscheme === id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              type="button"
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.background}</h3>
        <div className="flex gap-2">
          {["dark", "light"].map((bg) => (
            <button
              key={bg}
              onClick={() => onChange("background", bg)}
              className={`px-4 py-2 rounded text-sm capitalize transition-colors ${
                config.background === bg
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              type="button"
            >
              {bg === "dark" ? (lang === "zh" ? "深色" : "Dark") : (lang === "zh" ? "浅色" : "Light")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-emerald-400 font-semibold mb-3">{t.preview}</h3>
        <div className="p-4 rounded font-mono text-sm" style={{ backgroundColor: themeColors.bg, color: themeColors.fg }}>
          <div style={{ color: themeColors.colors[0] }}>Error</div>
          <div style={{ color: themeColors.colors[1] }}>Warning</div>
          <div style={{ color: themeColors.colors[2] }}>Info</div>
          <div style={{ color: themeColors.colors[3] }}>Link</div>
          <div style={{ color: themeColors.colors[4] }}>String</div>
          <div style={{ color: themeColors.colors[5] }}>Constant</div>
          <div style={{ color: themeColors.colors[6] }}>Comment</div>
        </div>
      </div>
    </div>
  );
}
