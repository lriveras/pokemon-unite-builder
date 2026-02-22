import { Link } from 'react-router-dom';

interface Props {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; to?: string; onClick?: () => void };
}

export function EmptyState({ icon = '⊕', title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-5xl mb-4 opacity-30">{icon}</div>
      <h3 className="text-lg font-bold text-slate-300 mb-2">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-md mb-5">{description}</p>}
      {action && (
        action.to ? (
          <Link
            to={action.to}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
