import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("en");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Benefits", href: "/benefits" },
    { name: "Contact", href: "/contact" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
    { code: "bn", name: "বাংলা" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-primary p-2 rounded-lg shadow-green">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">AgriCycle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button className="gradient-primary shadow-green" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <div className="gradient-primary p-2 rounded-lg shadow-green">
                    <Leaf className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-primary">AgriCycle</span>
                </div>
                
                <nav className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t space-y-3">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button className="w-full gradient-primary shadow-green" asChild>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;