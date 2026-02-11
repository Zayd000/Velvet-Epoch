import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/ui/Hero";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <span className="text-primary font-sans text-xs uppercase tracking-[0.2em] mb-2 block">Curated Selection</span>
              <h2 className="font-serif text-4xl md:text-5xl">Featured Pieces</h2>
            </div>
            <a href="/shop" className="text-sm border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors mt-6 md:mt-0">
              View Full Collection
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy / Manifesto */}
      <section className="py-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-6xl leading-tight max-w-4xl mx-auto mb-8">
              "We don't design for the moment. We design for the era that follows."
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto font-sans tracking-wide">
              SUSTAINABLE LUXURY • 2026 • PARIS / TOKYO
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
