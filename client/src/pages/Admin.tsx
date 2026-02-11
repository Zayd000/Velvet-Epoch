import { useStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, LayoutDashboard, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  image: z.string().min(1, "Image URL is required"),
  category: z.string().min(1, "Category is required"),
});

export default function Admin() {
  const { products, addProduct, deleteProduct, isAdmin } = useStore();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
    },
  });

  const onSubmit = (data: any) => {
    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      ...data,
    });
    form.reset();
    toast({
      title: "Product Added",
      description: "The product has been successfully added to the catalog.",
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-serif mb-4">Access Restricted</h1>
        <p className="mb-6 text-muted-foreground">You do not have permission to view this page.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-6 py-32">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-serif text-4xl">Admin Dashboard</h1>
          <div className="flex gap-4">
             <Button variant="outline">Settings</Button>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-8">
          <TabsList className="bg-secondary">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Product Form */}
              <Card className="lg:col-span-1 border-white/10 bg-card/50 backdrop-blur-sm h-fit">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" {...form.register("name")} className="bg-background border-white/10" />
                      {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" {...form.register("description")} className="bg-background border-white/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input type="number" id="price" {...form.register("price")} className="bg-background border-white/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" {...form.register("category")} className="bg-background border-white/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input id="image" {...form.register("image")} className="bg-background border-white/10" placeholder="/images/product-bag.png" />
                    </div>
                    
                    <Button type="submit" className="w-full mt-4">Add Product</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Product List */}
              <div className="lg:col-span-2 space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-white/5 bg-card/30 rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                      <div>
                        <h3 className="font-serif font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">${product.price}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteProduct(product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="border-white/10 bg-card/50">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No orders yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
