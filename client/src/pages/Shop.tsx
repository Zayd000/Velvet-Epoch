import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Shop() {
  const { products } = useStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-16 px-6 border-b border-white/5">
        <div className="container mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl mb-4">The Collection</h1>
          <div className="flex gap-4 text-sm text-muted-foreground uppercase tracking-widest">
            <button className="text-primary">All</button>
            <button className="hover:text-foreground transition-colors">Womenswear</button>
            <button className="hover:text-foreground transition-colors">Menswear</button>
            <button className="hover:text-foreground transition-colors">Accessories</button>
          </div>
        </div>
      </div>

      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
