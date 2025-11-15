'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Scale, Users, Briefcase, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const quickFilters = [
    { label: 'Criminal Lawyers', filter: 'practiceAreas=Criminal Law', icon: Scale },
    { label: 'Family Lawyers', filter: 'practiceAreas=Family Law', icon: Users },
    { label: 'Corporate Law', filter: 'practiceAreas=Corporate Law', icon: Briefcase },
    { label: 'Property Law', filter: 'practiceAreas=Property Law', icon: HomeIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Sylhet Advocates</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
                How it Works
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition">
                About
              </a>
              <Button variant="outline" size="sm">
                For Advocates
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-blue-600"> Legal Advocate</span>
            <br />
            in Sylhet
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with experienced legal professionals specializing in your specific needs.
            Search, filter, and find the right advocate for your case.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name, specialization, or Bar Council ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-sm text-gray-600 self-center mr-2">Popular:</span>
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.label}
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/search?${filter.filter}`)}
                  className="rounded-full hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Registered Advocates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Practice Areas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Finding the right legal advocate is simple with our platform
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Search & Filter</h3>
                <p className="text-gray-600">
                  Use our advanced search and filtering system to find advocates by practice area,
                  experience, location, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Review Profiles</h3>
                <p className="text-gray-600">
                  Browse detailed profiles including education, experience, specializations,
                  and consultation fees.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Connect</h3>
                <p className="text-gray-600">
                  Contact your chosen advocate directly via phone or email to schedule a
                  consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6" />
                <span className="text-lg font-bold">Sylhet Advocates</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted platform for finding legal advocates in Sylhet, Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/search" className="hover:text-white transition">Find Advocates</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                Sylhet, Bangladesh<br />
                Email: info@sylhetadvocates.com<br />
                Phone: +880 1XXX-XXXXXX
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sylhet Advocates Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
