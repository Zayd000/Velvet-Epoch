import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { cart, isAdmin, toggleAdmin } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Journal", href: "/journal" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="font-serif text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
            AURA
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={`text-sm tracking-widest uppercase transition-colors hover:text-primary ${
                  location === link.href ? "text-primary border-b border-primary" : "text-foreground/80"
                }`}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAdmin}
            className={isAdmin ? "text-primary" : "text-foreground/60"}
          >
            <Shield className="h-4 w-4" />
          </Button>

          <Link href="/cart">
            <a className="relative group">
              <ShoppingBag className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                  {cartCount}
                </Badge>
              )}
            </a>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background border-l border-white/10">
              <nav className="flex flex-col space-y-6 mt-10">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a className="text-2xl font-serif hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  </Link>
                ))}
                {isAdmin && (
                  <Link href="/admin">
                    <a className="text-xl font-sans text-primary mt-4">Dashboard</a>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
