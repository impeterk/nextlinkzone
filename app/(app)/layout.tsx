import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import styles from './layout.module.css';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.mainLayout}>
      <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      <Header />
      <main className='container'>{children}</main>
      <Footer />
    </div>
  );
}
