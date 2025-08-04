import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary p-2 rounded-lg shadow-green">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">AgriCycle</span>
            </div>
            <p className="text-muted-foreground">
              Transforming agricultural waste into valuable resources through smart technology and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/benefits" className="text-muted-foreground hover:text-primary transition-colors">Benefits</Link></li>
              <li><Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/partnerships" className="text-muted-foreground hover:text-primary transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Waste Management</li>
              <li className="text-muted-foreground">AI-Powered Recommendations</li>
              <li className="text-muted-foreground">Marketplace Platform</li>
              <li className="text-muted-foreground">GPS Pickup Service</li>
              <li className="text-muted-foreground">FPO Partnerships</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@agricycle.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Bangalore, Karnataka, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} AgriCycle. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;