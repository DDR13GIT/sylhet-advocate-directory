'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface FilterOptions {
  practiceAreas: Array<{ id: number; name: string }>;
  courtLevels: Array<{ id: number; name: string }>;
  locations: Array<{ id: number; name: string }>;
  languages: Array<{ id: number; name: string }>;
}

interface FilterSidebarProps {
  filterOptions: FilterOptions;
  currentFilters: Record<string, string>;
  onFilterChange: (filters: Record<string, any>) => void;
}

export function FilterSidebar({ filterOptions, currentFilters, onFilterChange }: FilterSidebarProps) {
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);
  const [selectedCourtLevels, setSelectedCourtLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [experienceMin, setExperienceMin] = useState<string>('');
  const [experienceMax, setExperienceMax] = useState<string>('');
  const [feeMin, setFeeMin] = useState<string>('');
  const [feeMax, setFeeMax] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    if (currentFilters.practiceAreas) {
      setSelectedPracticeAreas(currentFilters.practiceAreas.split(','));
    }
    if (currentFilters.courtLevels) {
      setSelectedCourtLevels(currentFilters.courtLevels.split(','));
    }
    if (currentFilters.locations) {
      setSelectedLocations(currentFilters.locations.split(','));
    }
    if (currentFilters.languages) {
      setSelectedLanguages(currentFilters.languages.split(','));
    }
    if (currentFilters.experienceMin) {
      setExperienceMin(currentFilters.experienceMin);
    }
    if (currentFilters.experienceMax) {
      setExperienceMax(currentFilters.experienceMax);
    }
    if (currentFilters.feeMin) {
      setFeeMin(currentFilters.feeMin);
    }
    if (currentFilters.feeMax) {
      setFeeMax(currentFilters.feeMax);
    }
    if (currentFilters.gender) {
      setGender(currentFilters.gender);
    }
    if (currentFilters.availableOnly) {
      setAvailableOnly(currentFilters.availableOnly === 'true');
    }
  }, [currentFilters]);

  const handlePracticeAreaToggle = (areaName: string) => {
    const updated = selectedPracticeAreas.includes(areaName)
      ? selectedPracticeAreas.filter((a) => a !== areaName)
      : [...selectedPracticeAreas, areaName];
    setSelectedPracticeAreas(updated);
  };

  const handleCourtLevelToggle = (courtName: string) => {
    const updated = selectedCourtLevels.includes(courtName)
      ? selectedCourtLevels.filter((c) => c !== courtName)
      : [...selectedCourtLevels, courtName];
    setSelectedCourtLevels(updated);
  };

  const handleLocationToggle = (locationName: string) => {
    const updated = selectedLocations.includes(locationName)
      ? selectedLocations.filter((l) => l !== locationName)
      : [...selectedLocations, locationName];
    setSelectedLocations(updated);
  };

  const handleLanguageToggle = (languageName: string) => {
    const updated = selectedLanguages.includes(languageName)
      ? selectedLanguages.filter((l) => l !== languageName)
      : [...selectedLanguages, languageName];
    setSelectedLanguages(updated);
  };

  const applyFilters = () => {
    const filters: Record<string, any> = {};

    if (selectedPracticeAreas.length > 0) {
      filters.practiceAreas = selectedPracticeAreas;
    }
    if (selectedCourtLevels.length > 0) {
      filters.courtLevels = selectedCourtLevels;
    }
    if (selectedLocations.length > 0) {
      filters.locations = selectedLocations;
    }
    if (selectedLanguages.length > 0) {
      filters.languages = selectedLanguages;
    }
    if (experienceMin) {
      filters.experienceMin = experienceMin;
    }
    if (experienceMax) {
      filters.experienceMax = experienceMax;
    }
    if (feeMin) {
      filters.feeMin = feeMin;
    }
    if (feeMax) {
      filters.feeMax = feeMax;
    }
    if (gender && gender !== 'Any') {
      filters.gender = gender;
    }
    if (availableOnly) {
      filters.availableOnly = 'true';
    }

    onFilterChange(filters);
  };

  const clearAllFilters = () => {
    setSelectedPracticeAreas([]);
    setSelectedCourtLevels([]);
    setSelectedLocations([]);
    setSelectedLanguages([]);
    setExperienceMin('');
    setExperienceMax('');
    setFeeMin('');
    setFeeMax('');
    setGender('');
    setAvailableOnly(false);
    onFilterChange({});
  };

  const hasActiveFilters =
    selectedPracticeAreas.length > 0 ||
    selectedCourtLevels.length > 0 ||
    selectedLocations.length > 0 ||
    selectedLanguages.length > 0 ||
    experienceMin ||
    experienceMax ||
    feeMin ||
    feeMax ||
    (gender && gender !== 'Any') ||
    availableOnly;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Practice Areas */}
          <div>
            <h4 className="font-medium mb-3">Practice Area</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filterOptions.practiceAreas.map((area) => (
                <label key={area.id} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selectedPracticeAreas.includes(area.name)}
                    onCheckedChange={() => handlePracticeAreaToggle(area.name)}
                  />
                  <span className="text-sm">{area.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h4 className="font-medium mb-3">Experience (years)</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={experienceMin}
                onChange={(e) => setExperienceMin(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={experienceMax}
                onChange={(e) => setExperienceMax(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                min="0"
              />
            </div>
          </div>

          {/* Court Levels */}
          <div>
            <h4 className="font-medium mb-3">Court Level</h4>
            <div className="space-y-2">
              {filterOptions.courtLevels.map((court) => (
                <label key={court.id} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCourtLevels.includes(court.name)}
                    onCheckedChange={() => handleCourtLevelToggle(court.name)}
                  />
                  <span className="text-sm">{court.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-medium mb-3">Location</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filterOptions.locations.map((location) => (
                <label key={location.id} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selectedLocations.includes(location.name)}
                    onCheckedChange={() => handleLocationToggle(location.name)}
                  />
                  <span className="text-sm">{location.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-medium mb-3">Languages</h4>
            <div className="space-y-2">
              {filterOptions.languages.map((language) => (
                <label key={language.id} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selectedLanguages.includes(language.name)}
                    onCheckedChange={() => handleLanguageToggle(language.name)}
                  />
                  <span className="text-sm">{language.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h4 className="font-medium mb-3">Gender</h4>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Consultation Fee */}
          <div>
            <h4 className="font-medium mb-3">Consultation Fee (৳)</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={feeMin}
                onChange={(e) => setFeeMin(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={feeMax}
                onChange={(e) => setFeeMax(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                min="0"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={availableOnly}
                onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
              />
              <span className="text-sm">Currently accepting cases</span>
            </label>
          </div>

          {/* Apply Button */}
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
