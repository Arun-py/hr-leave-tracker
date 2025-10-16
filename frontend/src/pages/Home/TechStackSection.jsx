import React from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJsonwebtokens } from 'react-icons/si';
import background4 from '../../assets/images/background4.jpg';

const TechStackSection = () => {
  const technologies = [
    {
      icon: <SiMongodb className="w-16 h-16" />,
      name: 'MongoDB',
      description: 'NoSQL database for flexible and scalable data storage',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <SiExpress className="w-16 h-16" />,
      name: 'Express.js',
      description: 'Fast, minimalist web framework for Node.js',
      color: 'text-gray-800 dark:text-gray-300'
    },
    {
      icon: <SiReact className="w-16 h-16" />,
      name: 'React.js',
      description: 'Modern UI library for building interactive interfaces',
      color: 'text-cyan-500 dark:text-cyan-400'
    },
    {
      icon: <SiNodedotjs className="w-16 h-16" />,
      name: 'Node.js',
      description: 'JavaScript runtime for scalable server-side applications',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <SiTailwindcss className="w-16 h-16" />,
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      color: 'text-sky-500 dark:text-sky-400'
    },
    {
      icon: <SiJsonwebtokens className="w-16 h-16" />,
      name: 'JWT Auth',
      description: 'Secure token-based authentication and authorization',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <section id="tech-stack" className="relative py-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background4})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-pink-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Powered by the MERN stack for performance, scalability, and maintainability
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`${tech.color} group-hover:scale-110 transition-transform`}>
                  {tech.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {tech.name}
              </h3>

              {/* Description */}
              <p className="text-gray-200 text-center leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Tech Info */}
        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">RESTful API</div>
              <p className="text-gray-200">Clean and documented API architecture</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">Responsive</div>
              <p className="text-gray-200">Works seamlessly on all devices</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">Secure</div>
              <p className="text-gray-200">Industry-standard security practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
