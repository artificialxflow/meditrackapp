'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { 
  FaPills, 
  FaUser, 
  FaCalendarAlt, 
  FaHeartbeat, 
  FaUsers, 
  FaFileAlt, 
  FaBell, 
  FaChartLine,
  FaShare,
  FaDownload,
  FaMobileAlt,
  FaDesktop,
  FaShieldAlt,
  FaQuestionCircle,
  FaPlay,
  FaCheck,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa'

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', title: 'معرفی اپلیکیشن', icon: FaPills },
    { id: 'getting-started', title: 'شروع کار', icon: FaPlay },
    { id: 'features', title: 'ویژگی‌ها', icon: FaCheck },
    { id: 'sharing', title: 'اشتراک‌گذاری', icon: FaShare },
    { id: 'faq', title: 'سوالات متداول', icon: FaQuestionCircle }
  ]

  return (
    <div className="bg-light">
      <Navbar />
      
      <main className="bg-light">
        <div className="container py-5">
          {/* Header */}
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="display-4 text-primary fw-bold mb-3">راهنمای کامل دارویار</h1>
              <p className="lead text-muted">آموزش قدم به قدم استفاده از اپلیکیشن مدیریت دارو</p>
            </div>
          </div>

          <div className="row">
            {/* Sidebar Navigation */}
            <div className="col-lg-3 mb-4">
              <div className="card border-0 shadow-sm sticky-top" style={{ top: '2rem' }}>
                <div className="card-header bg-white border-0">
                  <h5 className="card-title mb-0">فهرست مطالب</h5>
                </div>
                <div className="card-body p-0">
                  <nav className="nav flex-column">
                    {sections.map((section) => {
                      const Icon = section.icon
                      return (
                        <button
                          key={section.id}
                          className={`nav-link text-start border-0 rounded-0 ${
                            activeSection === section.id ? 'active bg-primary text-white' : 'text-muted'
                          }`}
                          onClick={() => setActiveSection(section.id)}
                        >
                          <Icon className="me-2" />
                          {section.title}
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  
                  {/* Overview Section */}
                  {activeSection === 'overview' && (
                    <div>
                      <h2 className="text-primary fw-bold mb-4">
                        <FaPills className="me-2" />
                        معرفی اپلیکیشن دارویار
                      </h2>
                      
                      <div className="row g-4 mb-5">
                        <div className="col-md-6">
                          <div className="card border-0 bg-primary bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <FaPills className="text-primary mb-3" style={{ fontSize: '3rem' }} />
                              <h4 className="fw-bold">مدیریت هوشمند داروها</h4>
                              <p className="text-muted">ثبت، مدیریت و یادآوری مصرف داروها به صورت دقیق و منظم</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border-0 bg-success bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <FaUsers className="text-success mb-3" style={{ fontSize: '3rem' }} />
                              <h4 className="fw-bold">مدیریت خانواده</h4>
                              <p className="text-muted">مدیریت چندین بیمار و اشتراک‌گذاری با اعضای خانواده</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="fw-bold mb-3">دارویار چیست؟</h3>
                      <p className="text-muted mb-4">
                        دارویار یک اپلیکیشن پیشرفته برای مدیریت داروها و سلامتی است که به افراد، خانواده‌ها، 
                        کلینیک‌ها و بیمارستان‌ها کمک می‌کند تا مصرف داروها را به صورت دقیق و منظم مدیریت کنند.
                      </p>

                      <h3 className="fw-bold mb-3">برای چه کسانی مناسب است؟</h3>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaUser className="text-primary me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">افراد و خانواده‌ها</h6>
                              <small className="text-muted">مدیریت شخصی و خانوادگی داروها</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaPills className="text-success me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">کلینیک‌ها</h6>
                              <small className="text-muted">مدیریت بیماران و داروها</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaChartLine className="text-info me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">بیمارستان‌ها</h6>
                              <small className="text-muted">مدیریت بخش‌ها و موجودی</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaShieldAlt className="text-warning me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">داروخانه‌ها</h6>
                              <small className="text-muted">مدیریت موجودی و مشاوره</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Getting Started Section */}
                  {activeSection === 'getting-started' && (
                    <div>
                      <h2 className="text-primary fw-bold mb-4">
                        <FaPlay className="me-2" />
                        شروع کار با دارویار
                      </h2>

                      <div className="row g-4 mb-5">
                        <div className="col-md-4">
                          <div className="card border-0 bg-primary bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                <span className="fw-bold">1</span>
                              </div>
                              <h5 className="fw-bold">ثبت‌نام</h5>
                              <p className="text-muted small">حساب کاربری خود را ایجاد کنید</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card border-0 bg-success bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                <span className="fw-bold">2</span>
                              </div>
                              <h5 className="fw-bold">افزودن بیمار</h5>
                              <p className="text-muted small">اطلاعات بیمار را وارد کنید</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card border-0 bg-info bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                <span className="fw-bold">3</span>
                              </div>
                              <h5 className="fw-bold">مدیریت داروها</h5>
                              <p className="text-muted small">داروها و برنامه مصرف را تنظیم کنید</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="fw-bold mb-3">مرحله 1: ثبت‌نام و ورود</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">روی دکمه "شروع رایگان" در صفحه اصلی کلیک کنید</li>
                          <li className="mb-2">فرم ثبت‌نام را با اطلاعات خود تکمیل کنید</li>
                          <li className="mb-2">ایمیل خود را تایید کنید</li>
                          <li>وارد داشبورد شوید</li>
                        </ol>
                      </div>

                      <h3 className="fw-bold mb-3">مرحله 2: افزودن بیمار</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">از منوی سمت چپ "مدیریت بیماران" را انتخاب کنید</li>
                          <li className="mb-2">روی دکمه "افزودن بیمار جدید" کلیک کنید</li>
                          <li className="mb-2">اطلاعات کامل بیمار را وارد کنید (نام، سن، جنسیت، تاریخ تولد)</li>
                          <li>بیمار را ذخیره کنید</li>
                        </ol>
                      </div>

                      <h3 className="fw-bold mb-3">مرحله 3: افزودن داروها</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">از منوی "مدیریت داروها" را انتخاب کنید</li>
                          <li className="mb-2">روی دکمه "افزودن داروی جدید" کلیک کنید</li>
                          <li className="mb-2">اطلاعات دارو را وارد کنید (نام، دوز، تعداد)</li>
                          <li className="mb-2">بیمار مصرف‌کننده را انتخاب کنید</li>
                          <li>دارو را ذخیره کنید</li>
                        </ol>
                      </div>

                      <h3 className="fw-bold mb-3">مرحله 4: تنظیم برنامه مصرف</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">از منوی "برنامه‌ها" را انتخاب کنید</li>
                          <li className="mb-2">روی دکمه "افزودن برنامه جدید" کلیک کنید</li>
                          <li className="mb-2">دارو و بیمار را انتخاب کنید</li>
                          <li className="mb-2">زمان‌های مصرف را تنظیم کنید</li>
                          <li>برنامه را فعال کنید</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Features Section */}
                  {activeSection === 'features' && (
                    <div>
                      <h2 className="text-primary fw-bold mb-4">
                        <FaCheck className="me-2" />
                        ویژگی‌های اپلیکیشن
                      </h2>

                      <div className="row g-4 mb-5">
                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaUser className="text-primary" />
                                </div>
                                <h5 className="fw-bold mb-0">مدیریت بیماران</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>ثبت اطلاعات کامل بیماران</li>
                                <li>مدیریت چندین بیمار</li>
                                <li>اشتراک‌گذاری با خانواده</li>
                                <li>تاریخچه کامل بیمار</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaPills className="text-success" />
                                </div>
                                <h5 className="fw-bold mb-0">مدیریت داروها</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>ثبت داروها با جزئیات کامل</li>
                                <li>مدیریت موجودی دارو</li>
                                <li>هشدار انقضای دارو</li>
                                <li>نصف کردن و یک چهارم کردن قرص‌ها</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaCalendarAlt className="text-info" />
                                </div>
                                <h5 className="fw-bold mb-0">قرار ملاقات‌ها</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>برنامه‌ریزی ویزیت‌های پزشک</li>
                                <li>یادآوری قرار ملاقات‌ها</li>
                                <li>مدیریت چندین پزشک</li>
                                <li>تاریخچه ویزیت‌ها</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaHeartbeat className="text-danger" />
                                </div>
                                <h5 className="fw-bold mb-0">علائم حیاتی</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>ثبت فشار خون، قند خون و وزن</li>
                                <li>نمودارهای تحلیلی</li>
                                <li>پیگیری روند سلامتی</li>
                                <li>گزارش‌های پزشکی</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaBell className="text-warning" />
                                </div>
                                <h5 className="fw-bold mb-0">یادآوری هوشمند</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>یادآوری مصرف دارو</li>
                                <li>نوتیفیکیشن‌های پیشرفته</li>
                                <li>زمان‌بندی انعطاف‌پذیر</li>
                                <li>یادآوری ویزیت‌ها</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                              <div className="d-flex align-items-center mb-3">
                                <div className="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                                  <FaChartLine className="text-secondary" />
                                </div>
                                <h5 className="fw-bold mb-0">گزارش‌گیری</h5>
                              </div>
                              <ul className="text-muted mb-0">
                                <li>نمودارهای تحلیلی</li>
                                <li>گزارش‌های PDF و Excel</li>
                                <li>آمار مصرف دارو</li>
                                <li>گزارش‌های پزشکی</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sharing Section */}
                  {activeSection === 'sharing' && (
                    <div>
                      <h2 className="text-primary fw-bold mb-4">
                        <FaShare className="me-2" />
                        اشتراک‌گذاری و همکاری
                      </h2>

                      <div className="row g-4 mb-5">
                        <div className="col-md-6">
                          <div className="card border-0 bg-primary bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <FaUsers className="text-primary mb-3" style={{ fontSize: '3rem' }} />
                              <h4 className="fw-bold">اشتراک‌گذاری خانوادگی</h4>
                              <p className="text-muted">اطلاعات بیماران را با اعضای خانواده به اشتراک بگذارید</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border-0 bg-success bg-opacity-10 h-100">
                            <div className="card-body text-center p-4">
                              <FaDownload className="text-success mb-3" style={{ fontSize: '3rem' }} />
                              <h4 className="fw-bold">خروجی گزارش‌ها</h4>
                              <p className="text-muted">گزارش‌های کامل را برای پزشک آماده کنید</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="fw-bold mb-3">نحوه اشتراک‌گذاری با خانواده</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">از منوی "خانواده" را انتخاب کنید</li>
                          <li className="mb-2">روی دکمه "افزودن عضو جدید" کلیک کنید</li>
                          <li className="mb-2">ایمیل عضو خانواده را وارد کنید</li>
                          <li className="mb-2">سطح دسترسی را تعیین کنید (مشاهده، ویرایش)</li>
                          <li>دعوت‌نامه ارسال کنید</li>
                        </ol>
                      </div>

                      <h3 className="fw-bold mb-3">اشتراک‌گذاری با پزشک</h3>
                      <div className="bg-light p-4 rounded mb-4">
                        <ol className="mb-0">
                          <li className="mb-2">از منوی "گزارش‌ها" را انتخاب کنید</li>
                          <li className="mb-2">بیمار مورد نظر را انتخاب کنید</li>
                          <li className="mb-2">بازه زمانی گزارش را تعیین کنید</li>
                          <li className="mb-2">روی "دانلود PDF" کلیک کنید</li>
                          <li>فایل را برای پزشک ارسال کنید</li>
                        </ol>
                      </div>

                      <h3 className="fw-bold mb-3">ویژگی‌های اشتراک‌گذاری</h3>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaUsers className="text-primary me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">چت خانوادگی</h6>
                              <small className="text-muted">ارتباط مستقیم با اعضای خانواده</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaBell className="text-success me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">یادآوری مشترک</h6>
                              <small className="text-muted">یادآوری برای همه اعضا</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaFileAlt className="text-info me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">مستندات مشترک</h6>
                              <small className="text-muted">اشتراک فایل‌های پزشکی</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex align-items-center p-3 bg-light rounded">
                            <FaShieldAlt className="text-warning me-3" />
                            <div>
                              <h6 className="fw-bold mb-1">امنیت بالا</h6>
                              <small className="text-muted">محافظت از اطلاعات خصوصی</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQ Section */}
                  {activeSection === 'faq' && (
                    <div>
                      <h2 className="text-primary fw-bold mb-4">
                        <FaQuestionCircle className="me-2" />
                        سوالات متداول
                      </h2>

                      <div className="accordion" id="faqAccordion">
                        <div className="accordion-item border-0 mb-3">
                          <h3 className="accordion-header">
                            <button className="accordion-button bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                              آیا استفاده از دارویار رایگان است؟
                            </button>
                          </h3>
                          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                              بله، استفاده از دارویار کاملاً رایگان است. شما می‌توانید تمام ویژگی‌های اصلی را بدون هیچ هزینه‌ای استفاده کنید.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item border-0 mb-3">
                          <h3 className="accordion-header">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                              آیا اطلاعات من امن است؟
                            </button>
                          </h3>
                          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                              بله، تمام اطلاعات شما با استفاده از تکنولوژی‌های پیشرفته رمزگذاری می‌شود و فقط شما و افراد مجاز می‌توانید به آن‌ها دسترسی داشته باشید.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item border-0 mb-3">
                          <h3 className="accordion-header">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                              آیا می‌توانم از موبایل استفاده کنم؟
                            </button>
                          </h3>
                          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                              بله، دارویار کاملاً ریسپانسیو است و می‌توانید از آن در موبایل، تبلت و کامپیوتر استفاده کنید.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item border-0 mb-3">
                          <h3 className="accordion-header">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                              چگونه می‌توانم با پشتیبانی تماس بگیرم؟
                            </button>
                          </h3>
                          <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                              می‌توانید از طریق ایمیل، تلفن یا چت آنلاین با تیم پشتیبانی ما در ارتباط باشید. اطلاعات تماس در فوتر سایت موجود است.
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item border-0 mb-3">
                          <h3 className="accordion-header">
                            <button className="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                              آیا می‌توانم اطلاعات را پشتیبان‌گیری کنم؟
                            </button>
                          </h3>
                          <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                              بله، تمام اطلاعات شما به صورت خودکار در سرورهای امن ذخیره می‌شود و می‌توانید گزارش‌های کامل را دانلود کنید.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 p-4 bg-primary bg-opacity-10 rounded">
                        <h4 className="fw-bold mb-3">نیاز به کمک بیشتر دارید؟</h4>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="d-flex align-items-center">
                              <FaEnvelope className="text-primary me-2" />
                              <span>ایمیل: info@daruyar.com</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex align-items-center">
                              <FaPhone className="text-primary me-2" />
                              <span>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex align-items-center">
                              <FaMapMarkerAlt className="text-primary me-2" />
                              <span>تهران، ایران</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 