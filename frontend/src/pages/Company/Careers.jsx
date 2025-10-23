import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import background9 from '../../assets/images/background9.jpg';
import { showToast } from '../../utils/toast';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Chennai, India',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build amazing user experiences with React and modern web technologies',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design and implement scalable backend services using Node.js',
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Drive product strategy and roadmap for our HR solutions',
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Chennai, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create intuitive and beautiful user interfaces',
    },
    {
      id: 5,
      title: 'HR Business Partner',
      department: 'People Operations',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Support our growing team and build great workplace culture',
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'Customer Support',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Help our customers succeed with our platform',
    },
    {
      id: 7,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Pune, India',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build and maintain our cloud infrastructure',
    },
    {
      id: 8,
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Delhi, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Drive new business and grow our customer base',
    },
  ];

  const departments = ['All', 'Engineering', 'Product', 'Design', 'People Operations', 'Customer Support', 'Sales'];

  const filteredJobs = selectedDepartment === 'All' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const handleApply = (jobTitle) => {
    showToast.success(`Application submitted for ${jobTitle}! Our team will contact you soon.`);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url(${background9})` }}>
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20"></div>
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Company Logo" className="h-12" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              HR Leave Tracker
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link to="/company" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Company
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64"></div>
            </div>
          </div>
        ) : (
          <>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We're building the future of HR technology. Come be part of our journey!
          </p>
        </div>

        {/* Why Join Us */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Why Work With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Work on cutting-edge technology solving real problems
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Growth</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Continuous learning and career development opportunities
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Benefits</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Competitive salary, health insurance, and flexible work
              </p>
            </div>
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-500'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Openings Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Position</th>
                  <th className="px-6 py-4 text-left font-semibold">Department</th>
                  <th className="px-6 py-4 text-left font-semibold">Location</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Experience</th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{job.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{job.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{job.department}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{job.experience}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleApply(job.title)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                      >
                        Apply Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No openings in {selectedDepartment} department at the moment.
            </p>
          </div>
        )}
        </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 HR Leave Tracker. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Careers;
