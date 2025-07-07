'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Different from homepage */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 min-h-[320px] flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text font-sans break-words">About AM Supply</h1>
            <p className="text-xl text-text/70 font-sans max-w-2xl mx-auto">
              Your trusted partner for premium office supplies and equipment since 2024
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Company Story - Side by side layout */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-text font-sans">Our Story</h2>
                <div className="space-y-4 text-text/70 font-sans leading-relaxed">
                  <p>
                    Founded in 2024, AM Supply was born from a simple mission: to provide businesses 
                    with the highest quality office supplies and equipment they need to succeed.
                  </p>
                  <p>
                    What started as a small local supplier has grown into a trusted partner for businesses across 
                    the region, offering everything from ergonomic furniture to cutting-edge technology solutions.
                  </p>
                  <p>
                    We believe that the right tools and equipment can transform a workspace, boost productivity, 
                    and create an environment where people love to work.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-muted">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3 text-center font-sans">Quality First</h3>
                <p className="text-text/70 text-center font-sans">Every product we offer is carefully selected for quality, durability, and value.</p>
              </div>
            </div>
          </section>

          {/* Mission & Values - Card grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text mb-12 text-center font-sans">Our Mission & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-muted text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3 font-sans">Quality Assurance</h3>
                <p className="text-text/70 font-sans">We never compromise on quality. Every product meets our strict standards for durability and performance.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-muted text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3 font-sans">Fast Delivery</h3>
                <p className="text-text/70 font-sans">Quick and reliable shipping to get your supplies when you need them, not when it&apos;s convenient for us.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-muted text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-3 font-sans">24/7 Support</h3>
                <p className="text-text/70 font-sans">Our customer service team is always here to help you, whether it&apos;s 9 AM or 9 PM.</p>
              </div>
            </div>
          </section>

          {/* Why Choose Us - Two column layout */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text mb-12 text-center font-sans">Why Choose AM Supply?</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-text mb-6 font-sans">Expert Selection</h3>
                  <ul className="space-y-3 text-text/70 font-sans">
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Curated product selection by industry experts
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Only premium brands and quality products
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Regular quality testing and verification
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text mb-6 font-sans">Customer Focus</h3>
                  <ul className="space-y-3 text-text/70 font-sans">
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Personalized recommendations and support
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Flexible payment options and financing
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-3 mt-1">•</span>
                      Easy returns and warranty support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Team - Centered layout */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-text mb-12 text-center font-sans">Our Team</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-32 h-32 bg-background rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-border-muted">
                <svg className="w-16 h-16 text-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2 font-sans">AM Supply Team</h3>
              <p className="text-primary mb-3 font-sans">Founder & CEO</p>
              <p className="text-text/70 font-sans">Passionate about providing the best office solutions to businesses.</p>
            </div>
          </section>

          {/* CTA - Different style */}
          <section className="text-center mb-12">
            <div className="bg-white max-w-2xl mx-auto rounded-2xl p-6 text-black shadow-xl border border-border-muted flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-2 font-sans">Ready to Transform Your Workspace?</h2>
              <p className="text-lg mb-6 font-sans opacity-90">Discover our premium selection of office supplies and equipment.</p>
              <Link href="/" className="btn-primary text-lg px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200">
                Shop Now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 