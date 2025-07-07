import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Browse Schemes", href: "/scheme-search-and-browse" },
        { name: "Check Eligibility", href: "/user-dashboard" },
        { name: "My Applications", href: "/user-dashboard" },
        { name: "AI Assistant", href: "/ai-chatbot-interface" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Agriculture & Farmers", href: "/scheme-search-and-browse?category=agriculture" },
        { name: "Education", href: "/scheme-search-and-browse?category=education" },
        { name: "Healthcare", href: "/scheme-search-and-browse?category=healthcare" },
        { name: "Women Empowerment", href: "/scheme-search-and-browse?category=women" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "User Guide", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Contact Us", href: "#" }
      ]
    },
    {
      title: "Government",
      links: [
        { name: "Digital India", href: "#" },
        { name: "MyGov", href: "#" },
        { name: "India.gov.in", href: "#" },
        { name: "Data Portal", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "YouTube", icon: "Youtube", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('/')) {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground rounded-md">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">myScheme Portal</h3>
                <p className="text-primary-foreground/80 text-sm">Government of India</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
              Empowering citizens to discover, access, and benefit from government schemes through technology and innovation. Making governance accessible to all.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary-foreground/80" />
                <span className="text-sm">1800-11-1234 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary-foreground/80" />
                <span className="text-sm">support@myscheme.gov.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-primary-foreground/80" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="font-heading font-semibold text-primary-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Button
                      variant="ghost"
                      onClick={() => handleLinkClick(link.href)}
                      className="text-primary-foreground/80 hover:text-primary-foreground text-sm p-0 h-auto font-normal justify-start"
                    >
                      {link.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-heading font-semibold text-primary-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Get notifications about new schemes and updates directly in your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-md bg-primary-foreground text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button
                variant="secondary"
                iconName="Send"
                iconPosition="right"
                className="px-6 py-2"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-primary-foreground/80 text-sm text-center md:text-left">
              <p>© {currentYear} myScheme Portal, Government of India. All rights reserved.</p>
              <p className="mt-1">
                Developed under Digital India Initiative
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-primary-foreground/80 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleLinkClick(social.href)}
                  className="w-8 h-8 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Government Links */}
          <div className="mt-6 pt-4 border-t border-primary-foreground/20">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-primary-foreground/70">
              <Button variant="ghost" className="text-xs p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground">
                Privacy Policy
              </Button>
              <span>•</span>
              <Button variant="ghost" className="text-xs p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground">
                Terms of Service
              </Button>
              <span>•</span>
              <Button variant="ghost" className="text-xs p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground">
                Accessibility
              </Button>
              <span>•</span>
              <Button variant="ghost" className="text-xs p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground">
                RTI
              </Button>
              <span>•</span>
              <Button variant="ghost" className="text-xs p-0 h-auto text-primary-foreground/70 hover:text-primary-foreground">
                Sitemap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;