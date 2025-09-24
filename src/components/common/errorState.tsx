export function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex items-center justify-center w-[1280px] h-[470px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-red-500 text-6xl">⚠️</div>
        <h3 className="text-xl font-semibold text-text">
          Ops! Algo deu errado
        </h3>
        <p className="text-text/80">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
