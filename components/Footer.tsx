import Link from 'next/link'
import { FaPills, FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r rounded d-flex align-items-center justify-content-center me-2">
                <FaPills className="text-white small" />
              </div>
              <span className="fs-5 fw-bold">دارویار</span>
            </div>
            <p className="text-muted mb-3">
              مدیریت هوشمند داروها برای زندگی بهتر. اپلیکیشن دارویار به شما کمک می‌کند تا مصرف داروها را به‌صورت دقیق و منظم مدیریت کنید.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted hover-text-white text-decoration-none">
                <FaGithub className="fs-5" />
              </a>
              <a href="#" className="text-muted hover-text-white text-decoration-none">
                <FaTwitter className="fs-5" />
              </a>
              <a href="#" className="text-muted hover-text-white text-decoration-none">
                <FaLinkedin className="fs-5" />
              </a>
              <a href="mailto:info@daruyar.com" className="text-muted hover-text-white text-decoration-none">
                <FaEnvelope className="fs-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fs-6 fw-semibold mb-3">محصول</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="#features" className="text-muted text-decoration-none hover-text-white">
                  ویژگی‌ها
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#pricing" className="text-muted text-decoration-none hover-text-white">
                  قیمت‌گذاری
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#api" className="text-muted text-decoration-none hover-text-white">
                  API
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#integrations" className="text-muted text-decoration-none hover-text-white">
                  یکپارچه‌سازی
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fs-6 fw-semibold mb-3">پشتیبانی</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/help" className="text-muted text-decoration-none hover-text-white">
                  راهنما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-muted text-decoration-none hover-text-white">
                  تماس با ما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-muted text-decoration-none hover-text-white">
                  سوالات متداول
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/community" className="text-muted text-decoration-none hover-text-white">
                  انجمن کاربران
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fs-6 fw-semibold mb-3">شرکت</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none hover-text-white">
                  درباره ما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" className="text-muted text-decoration-none hover-text-white">
                  فرصت‌های شغلی
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-muted text-decoration-none hover-text-white">
                  وبلاگ
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/press" className="text-muted text-decoration-none hover-text-white">
                  مطبوعات
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fs-6 fw-semibold mb-3">قوانین</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/privacy" className="text-muted text-decoration-none hover-text-white">
                  حریم خصوصی
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="text-muted text-decoration-none hover-text-white">
                  شرایط استفاده
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/security" className="text-muted text-decoration-none hover-text-white">
                  امنیت
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/compliance" className="text-muted text-decoration-none hover-text-white">
                  انطباق
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-top border-secondary mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                &copy; 2024 دارویار. تمامی حقوق محفوظ است.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex gap-3 justify-content-md-end">
                <Link href="/privacy" className="text-muted text-decoration-none small hover-text-white">
                  حریم خصوصی
                </Link>
                <Link href="/terms" className="text-muted text-decoration-none small hover-text-white">
                  شرایط استفاده
                </Link>
                <Link href="/cookies" className="text-muted text-decoration-none small hover-text-white">
                  کوکی‌ها
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 