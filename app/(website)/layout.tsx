import SiteChrome from "@/components/layout/SiteChrome";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}