export default function Footer() {
  return (
    <footer className="footer-wrapper bg-gray-800">
      <div className="footer-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="footer-brand md:col-span-1">
            <a href="#" className="footer-logo text-2xl font-bold text-white">
              EduMate
            </a>
            <p className="footer-tagline mt-2 text-sm text-gray-300">
              האיצו את מסע הלמידה שלכם עם קורסי ההשלמה הרב-לשוניים מבוססי הבינה
              המלאכותית שלנו.
            </p>
          </div>
          {/* Company Column */}
          <div className="footer-company">
            <h3 className="footer-heading text-sm font-semibold text-gray-400 tracking-wider uppercase">
              חברה
            </h3>
            <ul className="footer-company-links mt-4 space-y-4">
              <li className="footer-company-item">
                <a
                  href="#"
                  className="footer-company-link text-base text-gray-300 hover:text-white"
                >
                  אודות
                </a>
              </li>
              <li className="footer-company-item">
                <a
                  href="#"
                  className="footer-company-link text-base text-gray-300 hover:text-white"
                >
                  קריירה
                </a>
              </li>
              <li className="footer-company-item">
                <a
                  href="#"
                  className="footer-company-link text-base text-gray-300 hover:text-white"
                >
                  בלוג
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-support">
            <h3 className="footer-heading text-sm font-semibold text-gray-400 tracking-wider uppercase">
              תמיכה
            </h3>
            <ul className="footer-support-links mt-4 space-y-4">
              <li className="footer-support-item">
                <a
                  href="#"
                  className="footer-support-link text-base text-gray-300 hover:text-white"
                >
                  מרכז עזרה
                </a>
              </li>
              <li className="footer-support-item">
                <a
                  href="#"
                  className="footer-support-link text-base text-gray-300 hover:text-white"
                >
                  צרו קשר
                </a>
              </li>
              <li className="footer-support-item">
                <a
                  href="#"
                  className="footer-support-link text-base text-gray-300 hover:text-white"
                >
                  שאלות נפוצות
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-legal">
            <h3 className="footer-heading text-sm font-semibold text-gray-400 tracking-wider uppercase">
              משפטי
            </h3>
            <ul className="footer-legal-links mt-4 space-y-4">
              <li className="footer-legal-item">
                <a
                  href="#"
                  className="footer-legal-link text-base text-gray-300 hover:text-white"
                >
                  פרטיות
                </a>
              </li>
              <li className="footer-legal-item">
                <a
                  href="#"
                  className="footer-legal-link text-base text-gray-300 hover:text-white"
                >
                  תנאים
                </a>
              </li>
              <li className="footer-legal-item">
                <a
                  href="#"
                  className="footer-legal-link text-base text-gray-300 hover:text-white"
                >
                  מדיניות קובצי Cookie
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          {/* Social Links */}
          <div className="footer-social flex space-x-6 md:order-2">
            <a
              href="#"
              className="footer-social-link text-gray-400 hover:text-gray-300"
            >
              <i className="footer-social-icon fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="footer-social-link text-gray-400 hover:text-gray-300"
            >
              <i className="footer-social-icon fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="footer-social-link text-gray-400 hover:text-gray-300"
            >
              <i className="footer-social-icon fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="footer-social-link text-gray-400 hover:text-gray-300"
            >
              <i className="footer-social-icon fab fa-youtube"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="footer-copyright mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            © 2025 EduMate, Inc. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
