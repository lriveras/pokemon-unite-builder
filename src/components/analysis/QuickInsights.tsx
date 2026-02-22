interface Props {
  tips: string[];
}

export function QuickInsights({ tips }: Props) {
  if (tips.length === 0) {
    return <p className="text-xs text-slate-500">Fill your team to get coaching tips</p>;
  }

  return (
    <ul className="space-y-2">
      {tips.map((tip, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <span className="text-purple-400 shrink-0 mt-0.5">💡</span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}
