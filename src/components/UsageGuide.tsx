import { useState } from 'react';
import { toast } from 'sonner';
import type { Translation } from '../i18n/translations';

interface UsageGuideProps {
  t: Translation;
  needsPlugInstall: boolean;
  hasThemePlugin: boolean;
  hasPlugins: boolean;
}

function CodeBlock({ code, command = true }: { code: string; command?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('已复制！');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('已复制！');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full text-left rounded-lg p-3 font-mono transition-all cursor-pointer overflow-x-auto ${
        command ? 'text-xs' : 'text-sm'
      } ${
        copied
          ? 'bg-emerald-900 border border-emerald-600'
          : 'bg-gray-900 border border-gray-700 hover:border-gray-600'
      }`}
      type="button"
    >
      <div className={copied ? 'text-emerald-400' : 'text-gray-400'}>{command && '$ '}{code}</div>
    </button>
  );
}

export function UsageGuide({ t, needsPlugInstall, hasThemePlugin, hasPlugins }: UsageGuideProps) {
  const vimPlugInstallCommand = "curl -fLo ~/.vim/autoload/plug.vim --create-dirs \\\n  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim";

  return (
    <div className="space-y-4">
      {/* Step 1: Install vim-plug - Only show if vim-plug is needed */}
      {needsPlugInstall && (
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            1
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-medium text-gray-200">
              {t.usageGuide?.step1?.title || 'Install vim-plug'}
            </h3>
            <p className="text-gray-400 text-sm">
              {t.usageGuide?.step1?.desc || 'Run this command in your terminal:'}
            </p>
            <CodeBlock code={vimPlugInstallCommand} />
          </div>
        </div>
      )}

      {/* Step 2: Copy Configuration - Always show */}
      <div className="flex gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${needsPlugInstall ? 'bg-emerald-600' : 'bg-blue-600'}`}>
          {needsPlugInstall ? 2 : 1}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-200">
            {t.usageGuide?.step2?.title || 'Copy Configuration'}
          </h3>
          <p className="text-gray-400 text-sm">
            {t.usageGuide?.step2?.desc || 'Click on the configuration content in Config tab to copy it, then paste into ~/.vimrc file'}
          </p>
        </div>
      </div>

      {/* Step 3: Install Plugins - Only show if vim-plug is needed */}
      {needsPlugInstall && (
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            3
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-medium text-gray-200">
              {t.usageGuide?.step3?.title || 'Install Plugins'}
            </h3>
            <p className="text-gray-400 text-sm">
              {t.usageGuide?.step3?.desc || 'Open Vim and run:'}
            </p>
            <CodeBlock code=":PlugInstall" command={false} />
          </div>
        </div>
      )}

      {/* Final Step: Restart - Always show */}
      <div className="flex gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${needsPlugInstall ? 'bg-emerald-600' : 'bg-blue-600'}`}>
          {needsPlugInstall ? 4 : 2}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-200">
            {t.usageGuide?.step4?.title || 'Restart Vim'}
          </h3>
          <p className="text-gray-400 text-sm">
            {t.usageGuide?.step4?.desc || 'Close and reopen Vim to apply all settings.'}
          </p>
        </div>
      </div>
    </div>
  );
}
