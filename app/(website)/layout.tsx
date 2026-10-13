import SiteChrome from "@/components/layout/SiteChrome";
import AIChatbot from "@/components/chatbot/AIChatbot";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteChrome>
      {children}
      <AIChatbot />
    </SiteChrome>
  );
}