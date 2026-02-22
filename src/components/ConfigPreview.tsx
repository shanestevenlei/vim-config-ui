import { toast } from 'sonner';
import type { Translation } from '../i18n/translations';
import { VimrcHighlighter } from './VimrcHighlighter';

interface ConfigPreviewProps {
  vimrc: string;
  t: Translation;
}

export function ConfigPreview({ vimrc, t }: ConfigPreviewProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vimrc);
      toast.success(t.copied || 'Copied!');
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = vimrc;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success(t.copied || 'Copied!');
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-600 p-4 font-mono text-sm h-full overflow-y-auto"
    >
      <VimrcHighlighter content={vimrc} />
    </div>
  );
}
