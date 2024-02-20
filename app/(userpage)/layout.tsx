import Footer from '@/components/ui/footer';
import styles from './user-layout.module.css';
import PromoSection from './promo-section';
export default function UserPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.userPageLayout}>
      <main className='container'>{children}</main>
      <div>
        <PromoSection />
        <Footer />
      </div>
    </div>
  );
}
