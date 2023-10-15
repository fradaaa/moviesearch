export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex">{children}</div>;
}
