"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Eye } from "lucide-react"

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$299.99",
      originalPrice: "$349.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 124,
      category: "Electronics",
      inStock: true,
      discount: 14,
      features: ["Noise Cancelling", "Wireless", "30hr Battery"],
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 89,
      category: "Wearables",
      inStock: true,
      discount: 20,
      features: ["Heart Rate Monitor", "GPS", "Waterproof"],
    },
    {
      id: 3,
      name: "Ergonomic Laptop Stand",
      price: "$79.99",
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 67,
      category: "Accessories",
      inStock: true,
      discount: 0,
      features: ["Adjustable Height", "Aluminum", "Portable"],
    },
    {
      id: 4,
      name: "USB-C Hub with HDMI",
      price: "$49.99",
      originalPrice: "$69.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.4,
      reviews: 156,
      category: "Accessories",
      inStock: false,
      discount: 29,
      features: ["4K HDMI", "USB 3.0", "Compact Design"],
    },
    {
      id: 5,
      name: "Mechanical Gaming Keyboard",
      price: "$159.99",
      originalPrice: "$199.99",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 203,
      category: "Gaming",
      inStock: true,
      discount: 20,
      features: ["RGB Backlight", "Cherry MX", "Programmable"],
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: "$39.99",
      originalPrice: null,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      reviews: 78,
      category: "Accessories",
      inStock: true,
      discount: 0,
      features: ["Ergonomic", "Long Battery", "Precision"],
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
    <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{product.name.charAt(0)}</span>
          </div>
        </div>

        {product.discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white rounded-xl">-{product.discount}%</Badge>
        )}

        {!product.inStock && (
          <Badge className="absolute top-3 right-3 bg-gray-500 text-white rounded-xl">Out of Stock</Badge>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full w-8 h-8">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs rounded-lg">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 rounded-2xl" disabled={!product.inStock}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" size="icon" className="rounded-2xl">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Browse Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover our latest collection of premium products</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="rounded-2xl"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="rounded-2xl"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="wearables">Wearables</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-2xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-2xl">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="rounded-2xl px-8">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
