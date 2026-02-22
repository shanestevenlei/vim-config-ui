import { useState } from 'react';
import type { PluginConfig, ImportedPlugin, Language } from '../types/config';
import { PLUGINS } from '../config/plugins';
import type { Translation } from '../i18n/translations';
import { StatusMessage } from './StatusMessage';
import { PluginCard } from './PluginCard';

interface PluginTabProps {
  pluginConfig: PluginConfig;
  importedPlugins: ImportedPlugin[];
  lang: Language;
  t: Translation['plugin'];
  onTogglePlugin: (_id: string) => void;
  onAddImportedPlugin: (_plugin: ImportedPlugin) => void;
  onShowStatus: (_text: string, _type: 'success' | 'error') => void;
}

export function PluginTab({
  pluginConfig,
  importedPlugins,
  lang,
  t,
  onTogglePlugin,
  onAddImportedPlugin,
  onShowStatus
}: PluginTabProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [importingGithub, setImportingGithub] = useState(false);
  const [manualPluginName, setManualPluginName] = useState("");
  const [manualConfig, setManualConfig] = useState("");
  const [statusMsg, setStatusMsg] = useState<{text: string; type: 'success' | 'error'} | null>(null);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg({ text, type });
    onShowStatus(text, type);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const importFromGithub = async () => {
    if (!githubUrl.trim()) return;
    const match = githubUrl.match(/github\.com[/:]([^/]+)\/([^/\s]+)/);
    if (!match) { showStatus(lang === "zh" ? "无效的 GitHub URL" : "Invalid GitHub URL", "error"); return; }
    const [, owner, repo] = match;
    const id = repo.replace(/\.git$/, '').toLowerCase().replace(/[-_]/g, '');

    setImportingGithub(true);
    try {
      onTogglePlugin(id);
      if (!importedPlugins.find(p => p.id === id)) {
        onAddImportedPlugin({
          id,
          name: `${owner}/${repo}`,
          description: 'Imported from GitHub',
          source: 'github'
        });
      }
      showStatus(`${owner}/${repo} ${lang === "zh" ? "已导入" : "imported"}`);
      setGithubUrl("");
    } catch { showStatus(lang === "zh" ? "导入失败" : "Import failed", "error"); }
    setImportingGithub(false);
  };

  const addManualPlugin = () => {
    if (!manualPluginName.trim()) return;
    const id = manualPluginName.toLowerCase().replace(/\s+/g, '-');
    onTogglePlugin(id);
    if (!importedPlugins.find(p => p.id === id)) {
      onAddImportedPlugin({
        id,
        name: manualPluginName,
        description: manualConfig || 'Custom plugin',
        source: 'manual'
      });
    }
    showStatus(`${manualPluginName} ${lang === "zh" ? "已添加" : "added"}`);
    setManualPluginName("");
    setManualConfig("");
  };

  const enabledCount = Object.values(pluginConfig).filter(v => v === true).length;

  return (
    <div className="space-y-4">
      <StatusMessage message={statusMsg} />

      <div className="space-y-2">
        <p className="text-gray-400 text-sm">🔗 {lang === "zh" ? "通过 GitHub URL 导入插件" : "Import plugin via GitHub URL"}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && importFromGithub()}
            placeholder="https://github.com/owner/repo"
            className="flex-1 bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700 text-sm"
          />
          <button
            onClick={importFromGithub}
            disabled={importingGithub || !githubUrl}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium disabled:opacity-50"
            type="button"
          >
            {importingGithub ? "..." : (lang === "zh" ? "导入" : "Import")}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-2">
        <p className="text-gray-400 text-sm">✏️ {lang === "zh" ? "手动添加插件" : "Manually add plugin"}</p>
        <input
          type="text"
          value={manualPluginName}
          onChange={(e) => setManualPluginName(e.target.value)}
          placeholder={lang === "zh" ? "插件名称 (如: owner/repo)" : "Plugin name (e.g., owner/repo)"}
          className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700 text-sm"
        />
        <textarea
          value={manualConfig}
          onChange={(e) => setManualConfig(e.target.value)}
          placeholder={lang === "zh" ? "配置内容 (可选)" : "Config content (optional)"}
          rows={2}
          className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700 text-sm font-mono"
        />
        <button
          onClick={addManualPlugin}
          disabled={!manualPluginName.trim()}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium disabled:opacity-50"
          type="button"
        >
          {lang === "zh" ? "添加插件" : "Add Plugin"}
        </button>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm mb-3">{t.select}</p>

        {PLUGINS.map((plugin) => (
          <PluginCard
            key={plugin.id}
            name={plugin.name}
            description={plugin.description}
            enabled={!!pluginConfig[plugin.id]}
            onToggle={() => onTogglePlugin(plugin.id)}
          />
        ))}

        {importedPlugins.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p className="text-blue-400 text-sm mb-3">📥 {lang === "zh" ? "已导入的插件" : "Imported Plugins"}</p>
            {importedPlugins.map((plugin) => (
              <PluginCard
                key={plugin.id}
                name={plugin.name}
                description={plugin.description}
                enabled={!!pluginConfig[plugin.id]}
                onToggle={() => onTogglePlugin(plugin.id)}
                sourceLabel={{
                  text: plugin.source === 'github' ? 'GH' : 'Manual',
                  color: plugin.source === 'github' ? 'bg-blue-600' : 'bg-purple-600'
                }}
              />
            ))}
          </div>
        )}

        <div className="text-gray-400 text-sm mt-3">
          {t.enabled}: <span className="text-emerald-400 font-semibold">{enabledCount}</span> {t.disabled}
        </div>
      </div>
    </div>
  );
}
