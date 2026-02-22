import type { Language } from '../types/config';
import type { Translation } from '../i18n/translations';

interface HeaderProps {
  lang: Language;
  t: Translation;
  onLangChange: () => void;
}

export function Header({ lang, t, onLangChange }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <h1 className="text-xl font-bold">{t.title}</h1>
        </div>
        <button
          onClick={onLangChange}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          type="button"
        >
          {lang === "zh" ? "EN" : "中文"}
        </button>
      </div>
    </header>
  );
}
