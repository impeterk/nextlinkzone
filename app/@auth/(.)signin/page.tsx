'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginCard from '@/components/auth/login-card';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AuthModalPage() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  function handleCloseModal() {
    router.back();
  }
  useEffect(() => {
    if (modalRef.current?.childNodes?.length! > 1) {
      modalRef.current?.removeChild(modalRef.current?.lastChild!);
    }
  }, []);

  return (
    <Dialog defaultOpen>
      <DialogContent
        ref={modalRef}
        onInteractOutside={handleCloseModal}
        onEscapeKeyDown={handleCloseModal}
      >
        <LoginCard />
      </DialogContent>
    </Dialog>
  );
}
