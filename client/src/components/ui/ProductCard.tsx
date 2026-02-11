import { Link } from "wouter";
import { motion } from "framer-motion";
import { Product, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-secondary relative mb-4">
        <Link href={`/product/${product.id}`}>
          <a className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </a>
        </Link>
        
        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 h-10 w-10 bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.id}`}>
            <a className="font-serif text-lg group-hover:text-primary transition-colors">
              {product.name}
            </a>
          </Link>
          <span className="font-sans text-sm font-bold opacity-80">${product.price}</span>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
      </div>
    </motion.div>
  );
}
