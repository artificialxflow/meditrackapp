import Link from 'next/link'
import { FaPills, FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-light border-top">
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                <FaPills className="text-white" />
              </div>
              <span className="fs-4 fw-bold text-dark">دارویار</span>
            </div>
            <p className="text-muted mb-4">
              مدیریت هوشمند داروها برای زندگی بهتر. اپلیکیشن دارویار به شما کمک می‌کند تا مصرف داروها را به‌صورت دقیق و منظم مدیریت کنید.
            </p>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-muted text-decoration-none hover-text-primary" title="GitHub">
                <FaGithub className="fs-5" />
              </a>
              <a href="#" className="text-muted text-decoration-none hover-text-primary" title="Twitter">
                <FaTwitter className="fs-5" />
              </a>
              <a href="#" className="text-muted text-decoration-none hover-text-primary" title="LinkedIn">
                <FaLinkedin className="fs-5" />
              </a>
              <a href="mailto:info@daruyar.com" className="text-muted text-decoration-none hover-text-primary" title="ایمیل">
                <FaEnvelope className="fs-5" />
              </a>
            </div>
            <div className="d-flex align-items-center text-muted small mb-2">
              <FaPhone className="me-2" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="d-flex align-items-center text-muted small">
              <FaMapMarkerAlt className="me-2" />
              <span>تهران، ایران</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3 text-dark">محصول</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="#features" className="text-muted text-decoration-none hover-text-primary">
                  ویژگی‌ها
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#pricing" className="text-muted text-decoration-none hover-text-primary">
                  قیمت‌گذاری
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#api" className="text-muted text-decoration-none hover-text-primary">
                  API
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#integrations" className="text-muted text-decoration-none hover-text-primary">
                  یکپارچه‌سازی
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3 text-dark">پشتیبانی</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/help" className="text-muted text-decoration-none hover-text-primary">
                  راهنما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-muted text-decoration-none hover-text-primary">
                  تماس با ما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-muted text-decoration-none hover-text-primary">
                  سوالات متداول
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/community" className="text-muted text-decoration-none hover-text-primary">
                  انجمن کاربران
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3 text-dark">شرکت</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none hover-text-primary">
                  درباره ما
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" className="text-muted text-decoration-none hover-text-primary">
                  فرصت‌های شغلی
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-muted text-decoration-none hover-text-primary">
                  وبلاگ
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/press" className="text-muted text-decoration-none hover-text-primary">
                  مطبوعات
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3 text-dark">قوانین</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/privacy" className="text-muted text-decoration-none hover-text-primary">
                  حریم خصوصی
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="text-muted text-decoration-none hover-text-primary">
                  شرایط استفاده
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/security" className="text-muted text-decoration-none hover-text-primary">
                  امنیت
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/compliance" className="text-muted text-decoration-none hover-text-primary">
                  انطباق
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-top mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                &copy; ۱۴۰۳ دارویار. تمامی حقوق محفوظ است.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex gap-3 justify-content-md-end">
                <Link href="/privacy" className="text-muted text-decoration-none small hover-text-primary">
                  حریم خصوصی
                </Link>
                <Link href="/terms" className="text-muted text-decoration-none small hover-text-primary">
                  شرایط استفاده
                </Link>
                <Link href="/cookies" className="text-muted text-decoration-none small hover-text-primary">
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