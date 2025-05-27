'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Code,
  Smartphone,
  Server,
  Workflow,
  MessageSquare,
  PenTool,
  TrendingUp,
  Settings,
} from 'lucide-react';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Mapping icons dynamically based on service title
const iconMap: Record<string, React.ReactNode> = {
  'Web Development': <Code className="w-6 h-6" />,
  'Mobile App Development': <Smartphone className="w-6 h-6" />,
  'Backend Development': <Server className="w-6 h-6" />,
  'Process Automation': <Workflow className="w-6 h-6" />,
  'Social Media Management': <MessageSquare className="w-6 h-6" />,
  'Content Creation': <PenTool className="w-6 h-6" />,
};

// Service card component
interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, features, image, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className={`flex flex-col lg:flex-row gap-8 items-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div className="w-full lg:w-1/2 overflow-hidden rounded-xl">
        <Image
          src={image || '/images/services/default-service.jpg'}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full lg:w-1/2 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        <ul className="space-y-2">
          {Array.isArray(features) && features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Process step component
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative"
    >
      <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {number}
      </div>
      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

// Main Service Page Component
const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, amount: 0.1 });
  const processControls = useAnimation();
  
  useEffect(() => {
    if (processInView) {
      processControls.start('visible');
    }
  }, [processInView, processControls]);
  
  // Default process steps
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, and challenges through in-depth consultation."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Based on our findings, we create a tailored strategy and roadmap for your digital success."
    },
    {
      number: "03",
      title: "Design",
      description: "Our creative team designs intuitive, engaging user experiences that align with your brand."
    },
    {
      number: "04",
      title: "Development",
      description: "We bring the designs to life with clean, efficient code and powerful functionality."
    },
    {
      number: "05",
      title: "Testing",
      description: "Rigorous quality assurance ensures your solution performs flawlessly across all scenarios."
    },
    {
      number: "06",
      title: "Launch",
      description: "We carefully deploy your solution and provide training to ensure a smooth transition."
    }
  ];

  useEffect(() => {
    // Fetch services from the Django API
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check the structure of the API response
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data.results && Array.isArray(data.results)) {
          // Handle paginated responses
          console.log(data.results);
          setServices(data.results);
        } else {
          console.error('Unexpected API response structure:', data);
          setError('Unexpected API response format');
          setServices([]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services. Please try again later.');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fallback services data when API fails or during development
  const fallbackServices = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom, responsive websites built to elevate your digital presence with the latest technologies and best practices.",
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Performance-focused development",
        "Content management systems",
        "E-commerce integration"
      ],
      image: "/images/services/web-development.jpg"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications designed to engage users and extend your business reach.",
      features: [
        "iOS and Android app development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store optimization",
        "Ongoing maintenance and updates"
      ],
      image: "/images/services/app-development.jpg"
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Scalable and secure server-side applications built with modern technologies to power your digital solutions.",
      features: [
        "API development",
        "Database design and optimization",
        "Cloud architecture",
        "Authentication and security",
        "Performance optimization"
      ],
      image: "/images/services/backend-development.jpg"
    }
  ];

  // Use fallback data if there's an error or no services
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/services/grid-pattern.svg')] opacity-20"></div>
        
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Our IT Services
            </h1>
            <p className="max-w-3xl mt-6 text-xl text-blue-100">
              Transforming businesses through innovative digital solutions tailored to your unique needs
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10"
          >
            <Link href="/contact" className="inline-flex items-center px-8 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md shadow hover:bg-blue-50">
              Get Started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Services section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive IT Services
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
            From development to digital marketing, we provide end-to-end solutions for your business needs
          </p>
          
          {/* Error message if API failed */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-300">
              <p>{error}</p>
              <p className="text-sm mt-2">Using fallback services data for display.</p>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-10 mt-12">
            {displayServices.map((service, index) => (
              <ServiceCard
                key={service.id || index}
                title={service.title}
                description={service.description}
                icon={iconMap[service.title] || <Settings className="w-6 h-6" />}
                features={service.features || []}
                image={service.image || `/images/services/default-service-${index + 1}.jpg`}
                index={index}
              />
            ))}
          </div>
        )}
        
        {/* Our process section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Process
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
            A structured approach to delivering exceptional results
          </p>
          
          <motion.div 
            ref={processRef}
            variants={containerVariants}
            initial="hidden"
            animate={processControls}
            className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-32">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="absolute inset-0 bg-[url('/images/services/dot-pattern.svg')] opacity-20"></div>
            
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-white">
                  Ready to transform your business?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Let's discuss how our services can help you achieve your goals and overcome challenges.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex rounded-md shadow">
                    <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-blue-50">
                      Contact Us
                    </Link>
                  </div>
                  <div className="ml-3 inline-flex">
                    <Link href="/portfolio" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-800 bg-opacity-30 border border-transparent rounded-md hover:bg-blue-800 hover:bg-opacity-40">
                      View Our Work
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

