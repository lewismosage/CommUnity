import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import lewis from '../assets/images/team/lewis.jpeg';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Lewis Mosage',
      role: 'Lead Developer & Founder',
      bio: 'Full-stack developer with a passion for building community-driven platforms.',
      image: lewis,
      social: {
        github: 'https://github.com/lewismosage',
        linkedin: 'https://linkedin.com/in/lewismosage',
        email: 'maendalewis20@gmail.com'
      }
    }
    // Add more team members here
  ];

  const techStack = [
    { name: 'React', description: 'Frontend UI library' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Python/Flask', description: 'Backend API' },
    { name: 'PostgreSQL', description: 'Database' },
    { name: 'Redis', description: 'Caching & Real-time features' },
    { name: 'TailwindCSS', description: 'Styling' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mission Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            CommUnity is built on the belief that technology can bring people together and create meaningful connections. 
            Our platform empowers communities to organize, collaborate, and make a positive impact in their local areas 
            and beyond. We're committed to building tools that foster genuine engagement and facilitate real-world actions 
            that strengthen community bonds.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Community First',
              description: "Every feature we build starts with our community's needs"
            },
            {
              title: 'Transparency',
              description: 'We believe in open communication and honest relationships'
            },
            {
              title: 'Innovation',
              description: 'Continuously improving and adapting to serve our users better'
            }
          ].map((value) => (
            <div key={value.title} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                  }}
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div key={tech.name} className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <div className="max-w-2xl">
          <p className="text-lg text-gray-700 mb-6">
            We're always looking to improve and would love to hear from you. Whether you have questions,
            feedback, or just want to say hello, don't hesitate to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-primary-600" size={20} />
              <a href="mailto:contact@community.com" className="text-primary-600 hover:text-primary-700">
                contact@community.com
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 