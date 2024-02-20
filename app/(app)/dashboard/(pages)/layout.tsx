export default function DashboardPagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="grid grid-cols-5 h-full">
            <div className="h-full col-span-1">
                Hello
            </div>
            <section className="col-span-4">
                {children}
            </section>
        </div>
    )}
    