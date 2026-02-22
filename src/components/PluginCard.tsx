interface PluginCardProps {
  name: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  sourceLabel?: { text: string; color: string };
}

export function PluginCard({ name, description, enabled, onToggle, sourceLabel }: PluginCardProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
      sourceLabel ? 'bg-gray-750 border border-gray-600' : 'bg-gray-800'
    }`}>
      <div>
        <div className="text-gray-200 font-medium flex items-center gap-2">
          {name}
          {sourceLabel && (
            <span className={`text-xs px-1.5 py-0.5 rounded ${sourceLabel.color}`}>
              {sourceLabel.text}
            </span>
          )}
        </div>
        <div className="text-gray-500 text-xs">{description}</div>
      </div>
      <button
        onClick={onToggle}
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-emerald-500" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
