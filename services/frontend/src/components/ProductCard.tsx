"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic would go here
    console.log("Added to cart:", product.title);
  };

  return (
    <article 
      className="card card-hover group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="ratio-4-3 bg-gray-100 relative">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-2">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">No image available</span>
            </div>
          )}
          
          {/* Overlay with quick actions */}
          <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center`}>
            <div className={`transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex gap-2`}>
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100 transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Badge for special offers */}
          <div className="absolute top-2 left-2">
            <span className="badge badge-error text-xs font-semibold">
              -20%
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors leading-tight">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={i < 4 ? "#fbbf24" : "none"}
                className="text-yellow-400"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(128)</span>
        </div>

        {/* Price and Actions */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.25).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-success text-xs">In stock</span>
              <span className="text-xs text-gray-500">Free delivery</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={addToCart}
            className="flex-1 btn btn-primary btn-sm hover-scale"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add to Cart
          </button>
          <Link 
            href={`/product/${product.id}`}
            className="btn btn-outline btn-sm hover-scale"
          >
            View
          </Link>
        </div>

        {/* Quick Features */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verified
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Top Rated
          </span>
        </div>
      </div>
    </article>
  );
}
