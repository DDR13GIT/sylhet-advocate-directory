'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, Grid, List, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdvocateCard } from '@/components/advocates/advocate-card';
import { AdvocateListItem } from '@/components/advocates/advocate-list-item';
import { FilterSidebar } from '@/components/search/filter-sidebar';
import { Skeleton } from '@/components/ui/skeleton';

type ViewMode = 'grid' | 'list';

interface FilterOptions {
  practiceAreas: Array<{ id: number; name: string }>;
  courtLevels: Array<{ id: number; name: string }>;
  locations: Array<{ id: number; name: string }>;
  languages: Array<{ id: number; name: string }>;
}

interface Advocate {
  id: number;
  barCouncilId: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  experienceYears: number | null;
  gender: string | null;
  bio: string | null;
  chamberAddress: string | null;
  consultationFeeMin: number | null;
  consultationFeeMax: number | null;
  isAcceptingCases: boolean;
  practiceAreas: Array<{ id: number; name: string; isPrimary: boolean }>;
  locations: Array<{ id: number; name: string }>;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch filter options
  useEffect(() => {
    fetch('/api/filter-options')
      .then((res) => res.json())
      .then((data) => setFilterOptions(data))
      .catch((error) => console.error('Error fetching filter options:', error));
  }, []);

  // Fetch advocates
  useEffect(() => {
    const fetchAdvocates = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        const response = await fetch(`/api/advocates/search?${params.toString()}`);
        const data = await response.json();

        setAdvocates(data.advocates);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching advocates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, [searchParams, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    const params = new URLSearchParams();

    // Keep the search query
    if (searchQuery) {
      params.set('q', searchQuery);
    }

    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    setPage(1);
    router.push(`/search?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Sylhet Advocates</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search advocates by name, specialization, or Bar Council ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base"
            />
          </div>
        </form>

        {/* Filters and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <div className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${total} advocates found`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">View:</span>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && filterOptions && (
            <div className="w-64 flex-shrink-0">
              <FilterSidebar
                filterOptions={filterOptions}
                currentFilters={Object.fromEntries(searchParams.entries())}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            ) : advocates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No advocates found matching your criteria.</p>
                <Button onClick={() => router.push('/search')}>Clear all filters</Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advocates.map((advocate) => (
                      <AdvocateCard key={advocate.id} advocate={advocate} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {advocates.map((advocate) => (
                      <AdvocateListItem key={advocate.id} advocate={advocate} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
