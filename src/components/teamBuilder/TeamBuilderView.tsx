import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useTeamStore } from '../../store/useTeamStore';
import { useUIStore } from '../../store/useUIStore';
import { TeamSlotCard } from './TeamSlot';
import { SlotConfigPanel } from './SlotConfigPanel';
import { LiveAnalysisPanel } from '../analysis/LiveAnalysisPanel';
import { PokemonPicker } from './PokemonPicker';
import { TeamRoleBar } from './TeamRoleBar';
import { useSavedCompsStore } from '../../store/useSavedCompsStore';
import { useTeamAnalysis } from '../../hooks/useTeamAnalysis';
import { Link } from 'react-router-dom';

export function TeamBuilderView() {
  const { slots, activeSlotIndex, setActiveSlot, reorderSlots, clearAll } = useTeamStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { saveComposition } = useSavedCompsStore();
  const analysis = useTeamAnalysis();

  const pokemon = slots.map(s => s.pokemon);
  const filledCount = pokemon.filter(Boolean).length;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = parseInt(String(active.id).split('-')[1]);
    const toIndex = parseInt(String(over.id).split('-')[1]);
    reorderSlots(fromIndex, toIndex);
  }

  function handleSave() {
    const name = prompt('Name this composition:') || `Comp ${new Date().toLocaleTimeString()}`;
    saveComposition({ name, slots, compositeScore: analysis.compositeScore });
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 flex gap-6">
      {/* Main area */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Team Builder
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{filledCount}/5 Pokémon selected</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearAll}
              className="px-3 py-1.5 rounded-lg border border-[#0f3460] text-slate-400 hover:text-white hover:border-red-500/50 text-sm transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleSave}
              disabled={filledCount === 0}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save Comp
            </button>
            <Link
              to="/report"
              className="px-3 py-1.5 rounded-lg border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white text-sm transition-colors"
            >
              View Report →
            </Link>
          </div>
        </div>

        {/* Role bar */}
        <TeamRoleBar pokemon={pokemon} />

        {/* Slots */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={slots.map(s => `slot-${s.slotIndex}`)} strategy={horizontalListSortingStrategy}>
            <div className="grid grid-cols-5 gap-3">
              {slots.map(slot => (
                <TeamSlotCard
                  key={slot.slotIndex}
                  slot={slot}
                  isActive={activeSlotIndex === slot.slotIndex}
                  onSelect={() => setActiveSlot(slot.slotIndex)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Config Panel */}
        <div className="bg-[#16213e] border border-[#0f3460] rounded-xl">
          <div className="flex border-b border-[#0f3460]">
            {slots.map(slot => (
              <button
                key={slot.slotIndex}
                onClick={() => setActiveSlot(slot.slotIndex)}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  activeSlotIndex === slot.slotIndex
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {slot.pokemon ? slot.pokemon.name : `Slot ${slot.slotIndex + 1}`}
              </button>
            ))}
          </div>
          <SlotConfigPanel slot={slots[activeSlotIndex]} />
        </div>
      </div>

      {/* Analysis Sidebar */}
      <div className={`shrink-0 transition-all ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        <div className="w-72">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-300">Live Analysis</h2>
            <button onClick={toggleSidebar} className="text-slate-500 hover:text-white text-xs">Hide</button>
          </div>
          <LiveAnalysisPanel />
        </div>
      </div>
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed right-4 bottom-4 px-3 py-2 rounded-lg bg-purple-600 text-white text-xs shadow-lg"
        >
          Analysis ▶
        </button>
      )}

      {/* Pokemon Picker Modal */}
      <PokemonPicker />
    </div>
  );
}
