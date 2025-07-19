import Link from 'next/link'
import { FaPills, FaUsers, FaCalendarAlt, FaChartLine, FaShieldAlt, FaMobileAlt } from 'react-icons/fa'
import AppWrapper from '@/components/AppWrapper'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <AppWrapper>
      <div className="min-vh-100 bg-gradient-to-br home-page">
        <Navbar />

      {/* Hero Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold text-dark mb-4">
              مدیریت هوشمند
              <span className="text-primary"> داروها</span>
            </h1>
            <p className="fs-5 text-muted mb-5 mx-auto" style={{maxWidth: '800px'}}>
              اپلیکیشن دارویار به شما کمک می‌کند تا مصرف داروها را به‌صورت دقیق و منظم مدیریت کنید. 
              مناسب برای افراد، خانواده‌ها، کلینیک‌ها و بیمارستان‌ها.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                href="/register" 
                className="btn btn-primary btn-lg px-5 py-3 rounded-3 fw-semibold"
              >
                شروع رایگان
              </Link>
              <Link 
                href="#features" 
                className="btn btn-outline-primary btn-lg px-5 py-3 rounded-3 fw-semibold"
              >
                مشاهده ویژگی‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">ویژگی‌های کلیدی</h2>
            <p className="fs-5 text-muted">قابلیت‌های پیشرفته برای مدیریت بهتر داروها</p>
          </div>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-primary rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaPills className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">مدیریت داروها</h3>
                  <p className="text-muted">
                    ثبت و مدیریت داروها با قابلیت نصف کردن و یک چهارم کردن قرص‌ها. 
                    مدیریت موجودی و هشدار انقضا.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-success rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaCalendarAlt className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">یادآوری هوشمند</h3>
                  <p className="text-muted">
                    یادآوری دقیق مصرف داروها و ویزیت‌های پزشک. 
                    نوتیفیکیشن‌های پیشرفته و زمان‌بندی انعطاف‌پذیر.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-info rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaUsers className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">مدیریت خانواده</h3>
                  <p className="text-muted">
                    مدیریت چندین بیمار و اشتراک‌گذاری با اعضای خانواده. 
                    چت خانوادگی و تقویم مشترک.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-warning rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaChartLine className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">گزارش‌گیری</h3>
                  <p className="text-muted">
                    نمودارهای تحلیلی و گزارش‌های دقیق. 
                    خروجی PDF و Excel برای ارائه به پزشک.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-danger rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaShieldAlt className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">امنیت بالا</h3>
                  <p className="text-muted">
                    محافظت کامل از اطلاعات پزشکی. 
                    رمزگذاری داده‌ها و دسترسی امن.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm hover-shadow-lg">
                <div className="card-body p-4">
                  <div className="w-16 h-16 bg-secondary rounded-3 d-flex align-items-center justify-content-center mb-4">
                    <FaMobileAlt className="text-white fs-4" />
                  </div>
                  <h3 className="fs-4 fw-bold text-dark mb-3">دسترسی آسان</h3>
                  <p className="text-muted">
                    رابط کاربری ساده و ریسپانسیو. 
                    پشتیبانی از RTL و فونت فارسی.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">مناسب برای همه</h2>
            <p className="fs-5 text-muted">از افراد تا سازمان‌های بزرگ</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                <FaUsers className="text-primary fs-4" />
              </div>
              <h3 className="fs-6 fw-semibold text-dark mb-2">افراد و خانواده‌ها</h3>
              <p className="text-muted small">مدیریت شخصی و خانوادگی داروها</p>
            </div>

            <div className="col-lg-3 col-md-6 text-center">
              <div className="w-20 h-20 bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                <FaPills className="text-success fs-4" />
              </div>
              <h3 className="fs-6 fw-semibold text-dark mb-2">کلینیک‌ها</h3>
              <p className="text-muted small">مدیریت بیماران و داروها</p>
            </div>

            <div className="col-lg-3 col-md-6 text-center">
              <div className="w-20 h-20 bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                <FaChartLine className="text-info fs-4" />
              </div>
              <h3 className="fs-6 fw-semibold text-dark mb-2">بیمارستان‌ها</h3>
              <p className="text-muted small">مدیریت بخش‌ها و موجودی</p>
            </div>

            <div className="col-lg-3 col-md-6 text-center">
              <div className="w-20 h-20 bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                <FaShieldAlt className="text-warning fs-4" />
              </div>
              <h3 className="fs-6 fw-semibold text-dark mb-2">داروخانه‌ها</h3>
              <p className="text-muted small">مدیریت موجودی و مشاوره</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary">
        <div className="container text-center">
          <h2 className="display-5 fw-bold text-white mb-4">آماده شروع هستید؟</h2>
          <p className="fs-5 text-white-50 mb-5 mx-auto" style={{maxWidth: '600px'}}>
            همین الان ثبت‌نام کنید و مدیریت داروها را به سطح بالاتری ببرید
          </p>
          <Link 
            href="/register" 
            className="btn btn-light btn-lg px-5 py-3 rounded-3 fw-semibold"
          >
            شروع رایگان
          </Link>
        </div>
      </section>

      </div>
    </AppWrapper>
  )
}
