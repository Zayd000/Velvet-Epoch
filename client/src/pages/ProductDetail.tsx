import { useRoute } from "wouter";
import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === params?.id);

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-[3/4] bg-secondary relative overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary font-sans text-xs uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
              <h1 className="font-serif text-5xl md:text-6xl mb-4">{product.name}</h1>
              <p className="text-2xl font-sans font-light">${product.price}</p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg font-light">
              {product.description}
            </p>
            
            <div className="pt-8 border-t border-white/10 space-y-6">
              <Button 
                onClick={() => addToCart(product)}
                size="lg" 
                className="w-full md:w-auto rounded-none bg-white text-black hover:bg-primary hover:text-black transition-all px-12 py-8 text-sm uppercase tracking-widest"
              >
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground uppercase tracking-wider">
                <div>
                  <span className="block text-white mb-1">Material</span>
                  Silk / Carbon Fiber
                </div>
                <div>
                  <span className="block text-white mb-1">Origin</span>
                  Handcrafted in Italy
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
