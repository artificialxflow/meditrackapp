import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container-fluid" dir="rtl">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-6 text-center">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h1 className="display-4 text-primary mb-4">
                <i className="fas fa-pills me-3"></i>
                دارویار
              </h1>
              <p className="lead text-muted mb-4">
                اپلیکیشن مدیریت دارو و یادآوری مصرف
              </p>
              <p className="text-secondary">
                به زودی در دسترس خواهد بود...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
