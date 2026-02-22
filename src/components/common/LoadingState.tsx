interface Props {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-2 border-[#0f3460] border-t-purple-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl px-8 py-6 flex items-center gap-4">
        <div className="w-6 h-6 border-2 border-[#0f3460] border-t-purple-500 rounded-full animate-spin" />
        <span className="text-white font-medium">Fetching latest data...</span>
      </div>
    </div>
  );
}
