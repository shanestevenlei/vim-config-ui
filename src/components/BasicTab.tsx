import type { BasicConfig } from '../types/config';
import type { Translation } from '../i18n/translations';
import { Toggle } from './Toggle';

interface BasicTabProps {
  config: BasicConfig;
  onChange: (_key: keyof BasicConfig, _value: BasicConfig[keyof BasicConfig]) => void;
  t: Translation['basic'];
}

export function BasicTab({ config, onChange, t }: BasicTabProps) {
  const updateNumberSetting = (key: keyof BasicConfig, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1) {
      onChange(key, Math.min(num, 8) as BasicConfig[keyof BasicConfig]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.general}</h3>
        <Toggle label={t.enableSyntax} checked={config.enable} onChange={() => onChange("enable", !config.enable)} />
        <Toggle label={t.nocompatible} checked={config.nocompatible} onChange={() => onChange("nocompatible", !config.nocompatible)} />
        <div className="py-2">
          <label className="text-gray-300 text-sm block mb-2">{t.mouseMode}</label>
          <select
            value={config.mouse}
            onChange={(e) => onChange("mouse", e.target.value)}
            className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700"
          >
            <option value="">{t.mouseOptions.disabled}</option>
            <option value="n">{t.mouseOptions.normal}</option>
            <option value="v">{t.mouseOptions.visual}</option>
            <option value="i">{t.mouseOptions.insert}</option>
            <option value="a">{t.mouseOptions.all}</option>
          </select>
        </div>
      </div>

      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.lineNumbers}</h3>
        <Toggle label={t.lineNumbers} checked={config.number} onChange={() => onChange("number", !config.number)} />
        <Toggle label={t.relativeNumbers} checked={config.relativenumber} onChange={() => onChange("relativenumber", !config.relativenumber)} />
        <Toggle label={t.cursorLine} checked={config.cursorline} onChange={() => onChange("cursorline", !config.cursorline)} />
        <Toggle label={t.wordWrap} checked={config.wrap} onChange={() => onChange("wrap", !config.wrap)} />
      </div>

      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.indentation}</h3>
        <Toggle label={t.autoIndent} checked={config.autoindent} onChange={() => onChange("autoindent", !config.autoindent)} />
        <Toggle label={t.smartIndent} checked={config.smartindent} onChange={() => onChange("smartindent", !config.smartindent)} />
        <Toggle label={t.expandTab} checked={config.expandtab} onChange={() => onChange("expandtab", !config.expandtab)} />
        <div className="grid grid-cols-2 gap-4 py-2">
          <div>
            <label className="text-gray-300 text-sm block mb-2">{t.tabStop}</label>
            <input
              type="number"
              value={config.tabstop}
              onChange={(e) => updateNumberSetting("tabstop", e.target.value)}
              className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700"
              min={1}
              max={8}
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm block mb-2">{t.shiftWidth}</label>
            <input
              type="number"
              value={config.shiftwidth}
              onChange={(e) => updateNumberSetting("shiftwidth", e.target.value)}
              className="w-full bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-700"
              min={1}
              max={8}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.search}</h3>
        <Toggle label={t.hlSearch} checked={config.hlsearch} onChange={() => onChange("hlsearch", !config.hlsearch)} />
        <Toggle label={t.incSearch} checked={config.incsearch} onChange={() => onChange("incsearch", !config.incsearch)} />
        <Toggle label={t.ignoreCase} checked={config.ignorecase} onChange={() => onChange("ignorecase", !config.ignorecase)} />
        <Toggle label={t.smartCase} checked={config.smartcase} onChange={() => onChange("smartcase", !config.smartcase)} />
      </div>

      <div className="border-b border-gray-700 pb-4">
        <h3 className="text-emerald-400 font-semibold mb-3">{t.ui}</h3>
        <Toggle label={t.showCmd} checked={config.showcmd} onChange={() => onChange("showcmd", !config.showcmd)} />
        <Toggle label={t.showMode} checked={config.showmode} onChange={() => onChange("showmode", !config.showmode)} />
        <Toggle label={t.showMatch} checked={config.showmatch} onChange={() => onChange("showmatch", !config.showmatch)} />
        <Toggle label={t.wildMenu} checked={config.wildmenu} onChange={() => onChange("wildmenu", !config.wildmenu)} />
      </div>

      <div>
        <h3 className="text-emerald-400 font-semibold mb-3">{t.files}</h3>
        <Toggle label={t.backup} checked={config.backup} onChange={() => onChange("backup", !config.backup)} />
        <Toggle label={t.write} checked={config.write} onChange={() => onChange("write", !config.write)} />
        <Toggle label={t.swapFile} checked={config.swapfile} onChange={() => onChange("swapfile", !config.swapfile)} />
      </div>
    </div>
  );
}
