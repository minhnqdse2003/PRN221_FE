import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import SidebarProvider from "@/context/SidebarContext";
import SessionWrapper from "@/context/SessionWrapper";
import Provider from "@/utils/Providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="flex overflow-hidden" suppressHydrationWarning={true}>
          <SidebarProvider>
            <Sidebar />
          </SidebarProvider>
          <div className="w-full bg-slate-50">
            <Provider>{children}</Provider>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
