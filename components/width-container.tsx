export function WidthContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-(--breakpoint-md) mx-auto">{children}</div>
}
