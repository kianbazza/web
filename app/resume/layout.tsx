export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="m-auto flex min-h-screen max-w-screen-md flex-col p-4">
      {children}
    </div>
  )
}
