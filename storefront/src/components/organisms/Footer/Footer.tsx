import Image from "next/image"

import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import footerLinks from "@/data/footerLinks"

export function Footer() {
  return (
    <footer className="bg-primary container" data-testid="footer">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Support Column */}
        <div className="p-6 border rounded-sm" data-testid="footer-customer-services">
          <h2 className="heading-sm text-primary mb-3 uppercase">
            Support
          </h2>
          <nav className="space-y-3" aria-label="Support navigation">
            {footerLinks.support.map(({ label, path }) => (
              <LocalizedClientLink
                key={label}
                href={path}
                className="block label-md"
                data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* Ecosystem Column */}
        <div className="p-6 border rounded-sm" data-testid="footer-about">
          <h2 className="heading-sm text-primary mb-3 uppercase">Ecosystem</h2>
          <nav className="space-y-3" aria-label="Ecosystem navigation">
            {footerLinks.ecosystem.map(({ label, path, external }) => (
              external ? (
                <a
                  key={label}
                  href={path}
                  className="block label-md"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                </a>
              ) : (
                <LocalizedClientLink
                  key={label}
                  href={path}
                  className="block label-md"
                  data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                </LocalizedClientLink>
              )
            ))}
          </nav>
        </div>

        {/* Connect Column */}
        <div className="p-6 border rounded-sm" data-testid="footer-connect">
          <h2 className="heading-sm text-primary mb-3 uppercase">Connect</h2>
          <nav className="space-y-3" aria-label="Social and community navigation">
            {footerLinks.connect.map(({ label, path }) => (
              <a
                aria-label={`Go to ${label}`}
                title={`Go to ${label}`}
                key={label}
                href={path}
                className="block label-md"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="py-6 border rounded-sm" data-testid="footer-copyright">
        <p className="text-md text-secondary text-center">
          © {new Date().getFullYear()} interflow · powered by Holochain &amp; Unyt
        </p>
      </div>
    </footer>
  )
}
