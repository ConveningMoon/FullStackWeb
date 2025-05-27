
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Award, Users, Rocket, Calendar } from 'lucide-react';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Types for team members and milestones
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
}

// Dummy team and milestone data
const team: TeamMember[] = [
  {
    id: 1,
    name: 'Dylan Vergara',
    position: 'CEO & Founder',
    image: '/images/me.jpg',
    bio: 'Alice provides strategic guidance, ensuring ITMANO’s mission is at the forefront of every project.'
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'CTO',
    image: '/images/jhon.jpeg',
    bio: 'John spearheads technological innovation and is the architect of ITMANO’s cutting-edge solutions.'
  },
  {
    id: 3,
    name: 'Lisa Brown',
    position: 'Operations Manager',
    image: '/images/women.jpeg',
    bio: 'Lisa ensures seamless project delivery and customer satisfaction with precision and attention to detail.'
  }
];

const milestones: Milestone[] = [
  {
    id: 1,
    year: "2010",
    title: "Founded ITMANO",
    description: "ITMANO was born with a mission to empower businesses through technological innovation."
  },
  {
    id: 2,
    year: "2015",
    title: "Major Milestone",
    description: "Achieved our 100th successful project, delivering state-of-the-art solutions to global clients."
  },
  {
    id: 3,
    year: "2023",
    title: "AI and Cloud Focus",
    description: "Expanded our expertise in AI and cloud technologies, revolutionizing industries worldwide."
  }
];

export default function AboutPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from(section.querySelectorAll('.animate-in'), {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }
      });

      return () => scrollTrigger.kill();
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
        }}
      >
        <div>
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 animate-in">
            About ITMANO
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mt-4 animate-in">
            Revolutionizing businesses with cutting-edge technology and innovation since 2010.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={addToRefs} className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-cyan-400 animate-in">
              Our Mission & Vision
            </h2>
            <p className="text-gray-300 text-lg mb-4 animate-in">
              At ITMANO, our mission is to harness technology to empower businesses, ensuring unparalleled growth and innovation. 
              We envision a world where businesses thrive by seamlessly integrating technology into their operations.
            </p>
          </div>
          <div className="relative animate-in">
            <Image
              src="/images/mission.jpeg"
              alt="Mission and Vision"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={addToRefs} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-12 animate-in">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md animate-in">
              <Award className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">Excellence</h3>
              <p className="text-gray-400">
                Striving for the highest quality in every solution we deliver.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md animate-in">
              <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">Collaboration</h3>
              <p className="text-gray-400">
                Working closely with clients to create tailor-made solutions.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md animate-in">
              <Rocket className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">Innovation</h3>
              <p className="text-gray-400">
                Harnessing technology to create groundbreaking solutions.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md animate-in">
              <Calendar className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">Accountability</h3>
              <p className="text-gray-400">
                Upholding a standard of integrity in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section ref={addToRefs} className="py-20 container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-cyan-400 mb-12 animate-in">
          Our History
        </h2>
        <div className="space-y-12 max-w-4xl mx-auto">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-col md:flex-row items-center md:items-start md:gap-8 animate-in">
              <div className="text-center md:text-right">
                <div className="text-3xl font-bold text-cyan-400">{milestone.year}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{milestone.title}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section ref={addToRefs} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-12 animate-in">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member) => (
              <div key={member.id} className="bg-gray-800 p-6 rounded-lg shadow-md animate-in">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-cyan-400 text-sm">{member.position}</p>
                <p className="text-gray-400 mt-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6 animate-in">
          Ready to Partner with ITMANO?
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6 animate-in">
          Unlock the potential of your business by leveraging our expertise in cutting-edge technology and innovation. Talk to us today!
        </p>
        <a
          href="/contact"
          className="px-8 py-4 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-600 transition-colors animate-in"
        >
          Contact Us Now
        </a>
      </section>
    </main>
  );
}

