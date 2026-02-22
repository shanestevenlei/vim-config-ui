"use client";

import { useState, useMemo, useCallback } from "react";
import type { BasicConfig, ThemeConfig, PluginConfig, ImportedPlugin, TabType, Language, PreviewTabType } from '../types/config';
import { DEFAULT_BASIC, DEFAULT_THEME } from '../config/defaults';
import { THEME_COLORS } from '../config/themes';
import { translations, type Translation } from '../i18n/translations';
import { generateVimrc } from '../lib/vimrc-generator';
import { Header } from '../components/Header';
import { BasicTab } from '../components/BasicTab';
import { ThemeTab } from '../components/ThemeTab';
import { PluginTab } from '../components/PluginTab';
import { LivePreview } from '../components/LivePreview';
import { ConfigPreview } from '../components/ConfigPreview';
import { UsageGuide } from '../components/UsageGuide';

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [activePreviewTab, setActivePreviewTab] = useState<PreviewTabType>("live");
  const [basicConfig, setBasicConfig] = useState<BasicConfig>(DEFAULT_BASIC);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME);
  const [pluginConfig, setPluginConfig] = useState<PluginConfig>({});
  const [importedPlugins, setImportedPlugins] = useState<ImportedPlugin[]>([]);

  const t: Translation = translations[lang];

  const vimrc = useMemo(
    () => generateVimrc(basicConfig, themeConfig, pluginConfig, lang),
    [basicConfig, themeConfig, pluginConfig, lang]
  );

  const themeColors = useMemo(() => {
    const scheme = THEME_COLORS[themeConfig.colorscheme] || THEME_COLORS.default;
    return themeConfig.background === 'light' ? scheme.light : scheme.dark;
  }, [themeConfig.colorscheme, themeConfig.background]);

  const hasPlugins = useMemo(() => {
    const hasRegularPlugins = Object.values(pluginConfig).some(v => v === true);
    const hasColorSchemePlugin = themeConfig.colorscheme !== 'default';
    return hasRegularPlugins || hasColorSchemePlugin;
  }, [pluginConfig, themeConfig.colorscheme]);

  const updateBasic = useCallback((key: keyof BasicConfig, value: BasicConfig[keyof BasicConfig]) => {
    setBasicConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateTheme = useCallback((key: keyof ThemeConfig, value: ThemeConfig[keyof ThemeConfig]) => {
    setThemeConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const togglePlugin = useCallback((id: string) => {
    setPluginConfig(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const addImportedPlugin = useCallback((plugin: ImportedPlugin) => {
    setImportedPlugins(prev => [...prev, plugin]);
  }, []);

  const handleShowStatus = useCallback((text: string, type: 'success' | 'error') => {
    // Status messages are handled within PluginTab component
    console.log(`[${type}] ${text}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header
        lang={lang}
        t={t}
        onLangChange={() => setLang(lang === "zh" ? "en" : "zh")}
      />

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Settings */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex border-b border-gray-700">
              {(["basic", "theme", "plugin"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-gray-800 text-emerald-400 border-b-2 border-emerald-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  type="button"
                >
                  {t.tabs[tab]}
                </button>
              ))}
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {activeTab === "basic" && (
                <BasicTab config={basicConfig} onChange={updateBasic} t={t.basic} />
              )}
              {activeTab === "theme" && (
                <ThemeTab
                  config={themeConfig}
                  themeColors={themeColors}
                  onChange={updateTheme}
                  t={t.theme}
                  lang={lang}
                />
              )}
              {activeTab === "plugin" && (
                <PluginTab
                  pluginConfig={pluginConfig}
                  importedPlugins={importedPlugins}
                  lang={lang}
                  t={t.plugin}
                  onTogglePlugin={togglePlugin}
                  onAddImportedPlugin={addImportedPlugin}
                  onShowStatus={handleShowStatus}
                />
              )}
            </div>
          </div>

          {/* Right Column: Preview with Tabs */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex border-b border-gray-700">
              {(["live", "guide", "config"] as PreviewTabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePreviewTab(tab)}
                  className={`flex-1 px-4 py-3 font-medium transition-colors ${
                    activePreviewTab === tab
                      ? "bg-gray-800 text-emerald-400 border-b-2 border-emerald-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  type="button"
                >
                  {t.rightTabs[tab]}
                </button>
              ))}
            </div>
            <div className="p-4 h-139">
              {activePreviewTab === "live" && (
                <div className="h-full overflow-y-auto">
                  <LivePreview basicConfig={basicConfig} themeConfig={themeConfig} pluginConfig={pluginConfig} />
                </div>
              )}
              {activePreviewTab === "guide" && (
                <div className="h-full overflow-y-auto">
                  <UsageGuide
                  t={t}
                  needsPlugInstall={hasPlugins}
                  hasThemePlugin={themeConfig.colorscheme !== 'default'}
                  hasPlugins={Object.values(pluginConfig).some(v => v === true)}
                  />
                </div>
              )}
              {activePreviewTab === "config" && (
                <ConfigPreview vimrc={vimrc} t={t} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
