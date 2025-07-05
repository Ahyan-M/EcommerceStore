'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Different from other pages */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text font-sans">Contact Us</h1>
            <p className="text-xl text-text/70 font-sans max-w-2xl mx-auto">
              Get in touch with our team. We&apos;re here to help with all your office supply needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Split layout */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Left side */}
            <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-8">
              <h2 className="text-2xl font-bold text-text mb-8 font-sans">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-secondary/10 border border-secondary/20 text-secondary px-4 py-3 rounded-lg mb-6">
                  Thank you for your message! We&apos;ll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="order">Order Status</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information - Right side */}
            <div className="space-y-8">
              {/* Company Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-8">
                <h2 className="text-2xl font-bold text-text mb-8 font-sans">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-2 font-sans">Email Us</h3>
                      <p className="text-text/70 font-sans">General: info@amsupply.com<br />Support: support@amsupply.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-8">
                <h2 className="text-2xl font-bold text-text mb-8 font-sans">Online Support</h2>
                <div className="mt-2 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-primary">
                    <strong>24/7 Online Support:</strong> Our website is always open for orders and inquiries!
                  </p>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-2xl shadow-sm border border-border-muted p-8">
                <h2 className="text-2xl font-bold text-text mb-8 font-sans">Quick Help</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold text-text mb-2 font-sans">Order Status</h3>
                    <p className="text-text/70 text-sm font-sans">Track your order and get real-time updates on delivery.</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold text-text mb-2 font-sans">Returns & Exchanges</h3>
                    <p className="text-text/70 text-sm font-sans">Easy returns within 30 days for most items.</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold text-text mb-2 font-sans">Bulk Orders</h3>
                    <p className="text-text/70 text-sm font-sans">Special pricing and support for large orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 