import Image from 'next/image';
import { SITE } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__bar">
        <div className="footer__brand">
          <Image src="/logo.png" alt="" width={53} height={36} style={{ width: "auto", height: 36 }} />
          <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
        </div>
        <div className="footer__links">
          <a href={SITE.privacy}>Privacy policy</a>
          <a href={SITE.verify}>Verify certificate</a>
          <a href={SITE.global}>G-TEC Global</a>
        </div>
      </div>
    </footer>
  );
}
