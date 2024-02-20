import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import styles from "./layout.module.css"
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.mainLayout}>
          <Header />
          <main className="container">
            {children}
          </main>
          <Footer />
          </div>
  );
}
