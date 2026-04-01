export function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="px-3 py-1 bg-backgroundPrimary/70 border border-secondary/80 backdrop-blur-sm rounded-md text-xs text-text/90">
      {children}
    </span>
  );
}
