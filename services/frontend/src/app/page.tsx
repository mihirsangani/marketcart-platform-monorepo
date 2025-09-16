"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000/api";

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/products`);
        const data = (await res.json()).data.products;

        // ✅ ensure it's always an array
        if (mounted) {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("Expected array, got:", data);
            setProducts([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(query.toLowerCase());
    
    const matchesPrice = priceRange === "all" || 
      (priceRange === "under-500" && p.price < 500) ||
      (priceRange === "500-1000" && p.price >= 500 && p.price <= 1000) ||
      (priceRange === "1000-2000" && p.price >= 1000 && p.price <= 2000) ||
      (priceRange === "over-2000" && p.price > 2000);
    
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc' }}>
      <Header onSearch={setQuery} />
      
      {/* Hero Banner - Flipkart Style */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
        color: 'white',
        padding: '60px 0',
        marginBottom: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              lineHeight: '1.1'
            }}>
              THE BIG BILLION DAYS
            </h1>
            <p style={{ 
              fontSize: '1.5rem', 
              marginBottom: '30px',
              opacity: 0.9
            }}>
              STARTS 23RD SEP - 24 Hrs early access for Plus & BLACK members
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button style={{
                backgroundColor: 'white',
                color: '#ff6b35',
                padding: '15px 30px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Shop Now
              </button>
              <button style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                border: '2px solid white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                View Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Deals Section - Flipkart Style */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px 0',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '30px',
            color: '#1f2937'
          }}>
            Top Deals
          </h2>

        {loading ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
            }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  backgroundColor: '#f3f4f6',
                  borderRadius: '12px',
                  padding: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  <div style={{
                    height: '150px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}></div>
                  <div style={{
                    height: '20px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}></div>
                  <div style={{
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    width: '60%'
                  }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
            }}>
              {sortedProducts.slice(0, 6).map((prod) => (
                <div key={prod.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}>
                  <div style={{
                    height: '150px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
                      <div style={{ fontSize: '12px' }}>No image</div>
                    </div>
                  </div>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>
                    {prod.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    marginBottom: '10px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ 
                        color: i < 4 ? '#fbbf24' : '#d1d5db',
                        fontSize: '12px'
                      }}>★</span>
                    ))}
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>(128)</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: '8px',
                    marginBottom: '10px'
                  }}>
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      ₹{prod.price.toFixed(2)}
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      textDecoration: 'line-through'
                    }}>
                      ₹{(prod.price * 1.25).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px'
                  }}>
                    <button style={{
                      flex: 1,
                      backgroundColor: '#ff6b35',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e55a2b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff6b35';
                    }}>
                      Add to Cart
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Products Section */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px 0',
        marginBottom: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                {query ? `Search results for "${query}"` : "Our Products"}
              </h2>
              <p style={{ 
                color: '#6b7280',
                fontSize: '14px'
              }}>
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {sortedProducts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '10px',
                color: '#1f2937'
              }}>
                No products found
              </h3>
              <p style={{ marginBottom: '20px' }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setPriceRange("all");
                }}
                style={{
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '20px' 
            }}>
              {sortedProducts.map((prod) => (
                <div key={prod.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}>
                  <div style={{
                    height: '200px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    position: 'relative'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
                      <div style={{ fontSize: '12px' }}>No image available</div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      -20%
                    </div>
                  </div>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>
                    {prod.title}
                  </h3>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#6b7280',
                    marginBottom: '10px',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {prod.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    marginBottom: '10px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ 
                        color: i < 4 ? '#fbbf24' : '#d1d5db',
                        fontSize: '12px'
                      }}>★</span>
                    ))}
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>(128)</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: '8px',
                    marginBottom: '15px'
                  }}>
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      ₹{prod.price.toFixed(2)}
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      textDecoration: 'line-through'
                    }}>
                      ₹{(prod.price * 1.25).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      flex: 1,
                      backgroundColor: '#ff6b35',
                      color: 'white',
                      border: 'none',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e55a2b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff6b35';
                    }}>
                      Add to Cart
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}>
                      View
                    </button>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#6b7280'
                  }}>
                    <span>✓ Verified</span>
                    <span>⭐ Top Rated</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Stay Updated with Our Latest Offers
          </h2>
          <p style={{ 
            color: '#6b7280',
            marginBottom: '30px',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special promotions.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button style={{
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e55a2b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6b35';
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
