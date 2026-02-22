interface StatusMessageProps {
  message: { text: string; type: 'success' | 'error' } | null;
}

export function StatusMessage({ message }: StatusMessageProps) {
  if (!message) return null;

  return (
    <div className={`p-3 rounded text-sm ${
      message.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
    }`}>
      {message.text}
    </div>
  );
}
