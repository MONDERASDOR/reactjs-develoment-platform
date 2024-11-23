import React from 'react';
import { ArrowRight, Code, Users, Lock, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Where Developers Build Together
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Host and manage your code with powerful collaboration tools, CI/CD pipelines, and enterprise-grade security.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGetStarted}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 flex items-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/pricing"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Amazing Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you manage, collaborate, and deploy your code with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8 text-indigo-600" />,
                title: 'Code Hosting',
                description: 'Host your code with unlimited public and private repositories.',
              },
              {
                icon: <Users className="h-8 w-8 text-indigo-600" />,
                title: 'Team Collaboration',
                description: 'Work together seamlessly with built-in code review tools.',
              },
              {
                icon: <Lock className="h-8 w-8 text-indigo-600" />,
                title: 'Enterprise Security',
                description: 'Keep your code safe with advanced security features.',
              },
              {
                icon: <Zap className="h-8 w-8 text-indigo-600" />,
                title: 'CI/CD Pipeline',
                description: 'Automate your workflow with powerful CI/CD tools.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/register')}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who trust DevHub for their projects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;