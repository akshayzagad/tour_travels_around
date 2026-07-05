const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">
              TourGo
            </h2>

            <p className="leading-7 text-gray-400">
              Discover breathtaking destinations, unforgettable adventures,
              and unique travel experiences around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="/" className="transition hover:text-emerald-400">
                  Home
                </a>
              </li>

              <li>
                <a href="/tours" className="transition hover:text-emerald-400">
                  Tours
                </a>
              </li>

              <li>
                <a href="/about" className="transition hover:text-emerald-400">
                  About
                </a>
              </li>

              <li>
                <a href="/contact" className="transition hover:text-emerald-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Destinations
            </h3>

            <ul className="space-y-3">
              <li>Switzerland</li>
              <li>Italy</li>
              <li>Norway</li>
              <li>Japan</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-3">
              <li>📍 Pune, Maharashtra</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@tourgo.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-700"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TourGo. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-emerald-400">
              Facebook
            </a>

            <a href="#" className="transition hover:text-emerald-400">
              Instagram
            </a>

            <a href="#" className="transition hover:text-emerald-400">
              Twitter
            </a>

            <a href="#" className="transition hover:text-emerald-400">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;