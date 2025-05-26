'use client';

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success response simulation
      setSubmitStatus({
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Have questions or want to work with us? Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <FadeIn direction="left" delay={0.1}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-500 mt-1">contact@example.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-500 mt-1">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Office</p>
                        <p className="text-sm text-gray-500 mt-1">
                          123 Business Ave, Suite 100<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-900">Follow Us</h3>
                    <div className="mt-4 flex space-x-4">
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <FadeIn direction="right" delay={0.2}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  
                  {submitStatus && (
                    <div 
                      className={`mb-6 p-4 rounded-md ${
                        submitStatus.success 
                          ? 'bg-green-50 text-green-800' 
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number (Optional)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <div className="mt-1">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="block w-full shadow-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3"
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Support">Technical Support</option>
                            <option value="Billing">Billing Questions</option>
                            <option value="Partnership">Partnership Opportunities</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Your Message
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
