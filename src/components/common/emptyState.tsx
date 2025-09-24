export function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex justify-center items-center h-60">
      <div className="p-6 bg-primary/80 border border-slate-400 backdrop-blur rounded-lg text-center">
        <div className="text-4xl mb-4">🎮</div>
        <p className="text-lg">
          {hasSearch
            ? "Nenhum jogo encontrado com esse nome."
            : "Nenhum jogo disponível no momento."}
        </p>
        {hasSearch && (
          <p className="text-sm text-text/70 mt-2">Tente uma busca diferente</p>
        )}
      </div>
    </div>
  );
}
