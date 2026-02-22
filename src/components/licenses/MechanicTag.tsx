import { useState } from 'react';
import { MECHANICS_GLOSSARY, MechanicDefinition } from '../../data/mechanicsGlossary';

interface Props {
  mechanic: string;
  /** Override the definition label/color for CC types pulled from ccMoveMap */
  override?: Partial<MechanicDefinition>;
  size?: 'sm' | 'md';
}

const FALLBACK: MechanicDefinition = {
  id: 'unknown',
  label: 'Unknown',
  category: 'moveCategory',
  shortDescription: 'No description available.',
  fullDescription: 'No description available.',
  color: 'bg-slate-700 text-slate-300 border-slate-600',
};

export function MechanicTag({ mechanic, override, size = 'sm' }: Props) {
  const [open, setOpen] = useState(false);
  const def = { ...(MECHANICS_GLOSSARY[mechanic] ?? FALLBACK), ...override };

  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium cursor-help ${textSize} ${def.color} transition-opacity hover:opacity-90`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {def.label}
      </button>

      {open && (
        <div
          className="absolute bottom-full left-0 mb-1.5 z-50 w-64 p-3 rounded-xl bg-[#0d1b35] border border-[#1e3a6e] shadow-2xl text-left pointer-events-none"
          role="tooltip"
        >
          <div className={`font-semibold text-white mb-1 ${textSize}`}>{def.label}</div>
          <div className="text-xs text-slate-300 leading-relaxed">{def.shortDescription}</div>
          {(def.blockedByUnstoppable === false) && (
            <div className="mt-1.5 text-xs text-red-400 font-medium">
              Bypasses Unstoppable &amp; Hindrance Resistance
            </div>
          )}
          {def.blockedByUnstoppable === true && (
            <div className="mt-1.5 text-xs text-slate-500">Blocked by Unstoppable</div>
          )}
        </div>
      )}
    </span>
  );
}
