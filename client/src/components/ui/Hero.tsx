import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Parallax Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/images/hero-luxury.png" 
          alt="Luxury Fashion Hero" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Abstract Gold Element */}
      <motion.img
        src="/images/gold-abstract.png"
        className="absolute top-1/4 right-0 w-[800px] h-[800px] object-contain opacity-60 z-5 mix-blend-screen pointer-events-none"
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Content */}
      <div className="container relative z-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-primary font-sans text-sm uppercase tracking-[0.3em] mb-6">
            Spring / Summer 2026
          </h2>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight mb-8 leading-[0.9]">
            The New <br/> <span className="italic font-light">Elegance</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            Where heritage meets the horizon. Discover a collection designed for the architects of the future.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/shop">
              <Button size="lg" className="rounded-none bg-white text-black hover:bg-primary hover:text-black transition-all px-8 py-6 text-sm uppercase tracking-widest">
                Shop Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-none border-white/20 hover:bg-white/5 hover:border-white px-8 py-6 text-sm uppercase tracking-widest gap-2">
                Discover The Story <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </div>
  );
}
