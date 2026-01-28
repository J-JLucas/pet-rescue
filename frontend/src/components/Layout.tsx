import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function Layout({ children }: { children?: React.ReactNode }) {

  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
