import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">AURA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Defining the future of luxury through architectural silhouettes and advanced textiles.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-primary">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop"><a className="hover:text-primary transition-colors">Collection</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary transition-colors">Atelier</a></Link></li>
              <li><Link href="/journal"><a className="hover:text-primary transition-colors">Journal</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-primary">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-primary">Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-4">Join the inner circle.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-b border-white/20 py-2 px-0 text-sm focus:outline-none focus:border-primary w-full"
              />
              <button className="text-xs uppercase font-bold hover:text-primary transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <p>© 2026 AURA Fashion House. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-serif italic">Designed for the bold.</p>
        </div>
      </div>
    </footer>
  );
}
