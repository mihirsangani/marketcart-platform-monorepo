"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");
  const [cartCount] = useState(0); // This would come from a cart context in a real app

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      {/* Top Bar */}
      <div style={{
        backgroundColor: '#232f3e',
        color: 'white',
        padding: '8px 0',
        fontSize: '14px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ display: window.innerWidth >= 640 ? 'block' : 'none' }}>Welcome to MarketCart</span>
            <span style={{ display: window.innerWidth >= 768 ? 'block' : 'none' }}>Free shipping on orders over ₹499</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/help" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
              Help
            </Link>
            <Link href="/track" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Main Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: 'white' }}>
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '16px',
                height: '16px',
                backgroundColor: '#ffd700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'white' }}>!</span>
              </div>
            </div>
            <div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0
              }}>
                MarketCart
              </h1>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginTop: '-2px' }}>Your trusted shopping partner</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={submit} style={{ flex: 1, maxWidth: '600px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'border-color 0.2s'
              }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search for products, brands, and more..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                    aria-label="Search products"
                  />
                  {q && (
                    <button
                      type="button"
                      onClick={() => setQ("")}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                <button 
                  type="submit" 
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ display: window.innerWidth >= 640 ? 'block' : 'none' }}>Search</span>
                </button>
              </div>
            </div>
          </form>

          {/* Right Side Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Account */}
            <div style={{ 
              display: window.innerWidth >= 1024 ? 'flex' : 'none', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              transition: 'background-color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div style={{ fontSize: '14px' }}>
                <div style={{ fontWeight: '600' }}>Hello, Sign in</div>
                <div style={{ color: '#6b7280' }}>Account & Lists</div>
              </div>
            </div>

            {/* Wishlist */}
            <button style={{ 
              display: window.innerWidth >= 768 ? 'flex' : 'none', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              border: 'none',
              background: 'none',
              cursor: 'pointer', 
              transition: 'background-color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Wishlist</span>
            </button>

            {/* Cart */}
            <Link href="/cart" style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer', 
              transition: 'background-color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{ position: 'relative' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    fontSize: '10px',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '14px' }}>
                <div style={{ fontWeight: '600' }}>Cart</div>
                <div style={{ color: '#6b7280' }}>{cartCount} items</div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button style={{ 
              display: window.innerWidth < 1024 ? 'block' : 'none', 
              padding: '8px', 
              borderRadius: '8px', 
              border: 'none',
              background: 'none',
              cursor: 'pointer', 
              transition: 'background-color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Categories */}
        <div style={{ 
          display: window.innerWidth >= 1024 ? 'flex' : 'none', 
          alignItems: 'center', 
          gap: '32px', 
          padding: '12px 0', 
          borderTop: '1px solid #f3f4f6' 
        }}>
          <Link href="/electronics" style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
            Electronics
          </Link>
          <Link href="/fashion" style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
            Fashion
          </Link>
          <Link href="/home" style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
            Home & Garden
          </Link>
          <Link href="/sports" style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
            Sports
          </Link>
          <Link href="/books" style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ff6b35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
            Books
          </Link>
          <Link href="/deals" style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#ff6b35', 
            textDecoration: 'none',
            transition: 'color 0.2s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#e55a2b'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#ff6b35'}>
            Today's Deals
          </Link>
        </div>
      </div>
    </div>
  );
}
