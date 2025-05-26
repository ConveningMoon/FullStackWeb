'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  Code, 
  Server, 
  Shield, 
  Database, 
  Cloud, 
  Smartphone, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Types for our data
interface ServiceType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialType {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
}

interface CaseStudyType {
  id: number;
  title: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
}

interface StatType {
  value: string;
  label: string;
}

export default function Home() {
  // Create refs for elements we want to animate
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  
  // Add elements to the section refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Services data
  const services: ServiceType[] = [
    { 
      icon: <Code className="h-10 w-10 text-cyan-400" />, 
      title: "Custom Software Development", 
      description: "Tailored solutions designed to address your unique business challenges and maximize operational efficiency."
    },
    { 
      icon: <Cloud className="h-10 w-10 text-cyan-400" />, 
      title: "Cloud Integration", 
      description: "Seamless migration and management of your infrastructure in the cloud for enhanced scalability and performance."
    },
    { 
      icon: <Shield className="h-10 w-10 text-cyan-400" />, 
      title: "Cybersecurity Solutions", 
      description: "Comprehensive protection for your digital assets with advanced threat detection and prevention systems."
    },
    { 
      icon: <Database className="h-10 w-10 text-cyan-400" />, 
      title: "Data Analytics", 
      description: "Transform raw data into actionable insights to drive strategic decision-making and business growth."
    },
    { 
      icon: <Smartphone className="h-10 w-10 text-cyan-400" />, 
      title: "Mobile Application Development", 
      description: "Cross-platform mobile solutions that deliver exceptional user experiences and business value."
    },
    { 
      icon: <Server className="h-10 w-10 text-cyan-400" />, 
      title: "IT Infrastructure Management", 
      description: "Proactive monitoring and management of your IT systems to ensure optimal performance and reliability."
    }
  ];

  // Case studies data
  const caseStudies: CaseStudyType[] = [
    {
      id: 1,
      title: "Enterprise Resource Planning System",
      client: "Global Manufacturing Corp",
      description: "Developed a comprehensive ERP solution that streamlined operations across 12 departments and increased productivity by 35%.",
      image: "/images/Planning.jpeg",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
    },
    {
      id: 2,
      title: "Secure Banking Platform",
      client: "NextGen Financial Services",
      description: "Implemented a secure digital banking platform with advanced encryption and multi-factor authentication, serving over 2 million customers.",
      image: "/images/Banking.jpeg",
      technologies: ["Angular", "Java Spring", "Kubernetes", "AWS"]
    },
    {
      id: 3,
      title: "IoT Fleet Management Solution",
      client: "TransGlobal Logistics",
      description: "Created an IoT-based fleet management system that reduced fuel costs by 22% and improved delivery times by 18%.",
      image: "/images/IoT.jpeg",
      technologies: ["Python", "TensorFlow", "AWS IoT", "React Native"]
    }
  ];

  // Testimonials data
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "InnovateX",
      content: "ITMANO transformed our digital infrastructure completely. Their team's technical expertise and strategic approach helped us not only solve immediate challenges but also build a foundation for future growth.",
      avatar: "/images/avatars/woman.jpeg"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "TechForward",
      content: "Working with ITMANO has been a game-changer for our business. Their cybersecurity solutions protected us from multiple threats and their proactive approach to IT management gives us peace of mind.",
      avatar: "/images/avatars/man.jpeg"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Director of Operations",
      company: "Global Systems Inc.",
      content: "The custom software ITMANO developed for us has revolutionized our workflow. We've seen a 40% increase in efficiency and our team loves the intuitive interface. I highly recommend their services.",
      avatar: "/images/avatars/girl.jpeg"
    }
  ];

  // Company stats
  const stats: StatType[] = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" },
    { value: "50+", label: "Tech Experts" }
  ];

  // Change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    // Hero animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelectorAll('.animate-hero'),
        { 
          opacity: 0,
          y: -50 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }

    // Create scroll animations for each section
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            section.querySelectorAll('.animate-in'),
            {
              opacity: 0,
              y: 50
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out'
            }
          );
        }
      });

      // Return a cleanup function to kill the ScrollTrigger instance
      return () => {
        scrollTrigger.kill();
      };
    });

    // Cleanup function to kill all ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div 
        ref={headerRef} 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
        }}
      >
        {/* Animated background elements - tech-inspired abstract shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-700 blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-blue-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <Image 
            src="/images/logoHeader.png" 
            alt="ITMANO Logo" 
            width={100} 
            height={80} 
            className="mx-auto mb-10 animate-hero"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 animate-hero">
            Transforming Business Through Technology
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10 animate-hero">
            We deliver cutting-edge IT solutions that drive innovation, efficiency, and growth for forward-thinking organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero">
            <Link 
              href="/services" 
              className="px-8 py-4 rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Explore Our Solutions
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-md border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-900 hover:bg-opacity-30 transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce animate-hero">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <section
        ref={addToRefs}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-in bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
              Our Technology Solutions
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-in">
              We deliver comprehensive IT services designed to address complex business challenges and drive digital transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="animate-in bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="mb-6 p-4 inline-flex rounded-lg bg-gray-900">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={addToRefs}
        className="py-16 bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        ref={addToRefs}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-in bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-in">
              Discover how we've helped organizations solve complex challenges and achieve their business goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className="animate-in bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-cyan-900/20 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image 
                    src={study.image} 
                    alt={study.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{study.title}</h3>
                  <div className="text-cyan-400 text-sm mb-4">Client: {study.client}</div>
                  <p className="text-gray-400 mb-4">{study.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* <Link 
                    href={`/case-studies/${study.id}`} 
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300"
                  >
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={addToRefs}
        className="py-20 bg-black relative overflow-hidden"
      >
        {/* Background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Image 
            src="/images/tech-pattern.svg" 
            alt="Technology Pattern" 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-in bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
                Why Choose ITMANO?
              </h2>
              
              <div className="space-y-6">
                <div className="flex animate-in">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-900 bg-opacity-30 flex items-center justify-center text-cyan-400">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Expert Team</h3>
                    <p className="text-gray-400">Our certified professionals bring deep expertise across a wide range of technologies and industries.</p>
                  </div>
                </div>
                
                <div className="flex animate-in">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-900 bg-opacity-30 flex items-center justify-center text-cyan-400">
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Security-First Approach</h3>
                    <p className="text-gray-400">We integrate robust security measures into every solution we deliver to protect your valuable data.</p>
                  </div>
                </div>
                
                <div className="flex animate-in">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-900 bg-opacity-30 flex items-center justify-center text-cyan-400">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Proven Track Record</h3>
                    <p className="text-gray-400">With hundreds of successful projects, we consistently deliver solutions that exceed expectations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 animate-in">
              <Image 
                src="/images/team.jpeg" 
                alt="IT Professionals" 
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={addToRefs}
        className="py-20 relative bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-in bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
              What Our Clients Say
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 p-8 md:p-10 rounded-xl animate-in">
              <div className="absolute -top-5 left-10 text-6xl text-cyan-500 opacity-50">"</div>
              
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                  style={{ display: index === activeTestimonial ? 'block' : 'none' }}
                >
                  <p className="text-lg text-gray-300 mb-8">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      width={60} 
                      height={60} 
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-cyan-400">{testimonial.position}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Testimonial navigation dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-cyan-400 w-6' : 'bg-gray-600'}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={addToRefs}
        className="py-20 relative"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-in">
              Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-gray-400 mb-10 animate-in">
              Contact us today to discuss how our technology solutions can help you achieve your business goals and overcome challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in">
              <Link 
                href="/contact" 
                className="px-8 py-4 rounded-md bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Schedule a Consultation
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-4 rounded-md border border-gray-600 text-white font-medium hover:bg-gray-800 transition-all"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

