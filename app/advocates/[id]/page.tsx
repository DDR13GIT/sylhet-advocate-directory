import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Scale, MapPin, Phone, Mail, Briefcase, Calendar, GraduationCap, Languages, Building, CheckCircle, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface AdvocateData {
  id: number;
  barCouncilId: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  enrollmentDate: string | null;
  experienceYears: number | null;
  gender: string | null;
  bio: string | null;
  chamberAddress: string | null;
  consultationFeeMin: number | null;
  consultationFeeMax: number | null;
  isAcceptingCases: boolean;
  practiceAreas: Array<{ id: number; name: string; description: string | null; isPrimary: boolean }>;
  courtLevels: Array<{ id: number; name: string; admissionDate: string | null }>;
  languages: Array<{ id: number; name: string; proficiencyLevel: string | null }>;
  locations: Array<{ id: number; name: string; district: string }>;
  education: Array<{
    id: number;
    degree: string;
    institution: string;
    graduationYear: number | null;
    specialization: string | null;
  }>;
}

async function getAdvocate(id: string): Promise<AdvocateData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/advocates/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching advocate:', error);
    return null;
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function AdvocateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const advocate = await getAdvocate(id);

  if (!advocate) {
    notFound();
  }

  const primaryPracticeAreas = advocate.practiceAreas.filter((pa) => pa.isPrimary);
  const secondaryPracticeAreas = advocate.practiceAreas.filter((pa) => !pa.isPrimary);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Sylhet Advocates</span>
            </Link>
            <Link href="/search">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32 flex-shrink-0">
                    <AvatarImage src={advocate.photoUrl || undefined} alt={advocate.fullName} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl">
                      {getInitials(advocate.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{advocate.fullName}</h1>
                        <p className="text-gray-600 mb-2">Bar Council ID: {advocate.barCouncilId}</p>
                        {advocate.isAcceptingCases && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Currently Accepting Cases</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {primaryPracticeAreas.map((pa) => (
                        <Badge key={pa.id} variant="default" className="text-sm">
                          {pa.name}
                        </Badge>
                      ))}
                      {secondaryPracticeAreas.map((pa) => (
                        <Badge key={pa.id} variant="outline" className="text-sm">
                          {pa.name}
                        </Badge>
                      ))}
                    </div>

                    {advocate.bio && (
                      <p className="text-gray-700 leading-relaxed">{advocate.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Areas Details */}
            {advocate.practiceAreas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Practice Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {advocate.practiceAreas.map((pa) => (
                      <div key={pa.id} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-lg">
                          {pa.name}
                          {pa.isPrimary && (
                            <Badge variant="default" className="ml-2 text-xs">
                              Primary
                            </Badge>
                          )}
                        </h3>
                        {pa.description && (
                          <p className="text-gray-600 text-sm mt-1">{pa.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {advocate.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {advocate.education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          {edu.graduationYear && <span>{edu.graduationYear}</span>}
                          {edu.specialization && <span>• {edu.specialization}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Court Admissions */}
            {advocate.courtLevels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Court Admissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {advocate.courtLevels.map((court) => (
                      <div key={court.id} className="flex justify-between items-center">
                        <span className="font-medium">{court.name}</span>
                        {court.admissionDate && (
                          <span className="text-sm text-gray-500">
                            {formatDate(court.admissionDate)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            {advocate.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="h-5 w-5 mr-2" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {advocate.languages.map((lang) => (
                      <Badge key={lang.id} variant="outline">
                        {lang.name}
                        {lang.proficiencyLevel && ` (${lang.proficiencyLevel})`}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {advocate.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a href={`tel:${advocate.phone}`} className="text-blue-600 hover:underline">
                          {advocate.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {advocate.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${advocate.email}`} className="text-blue-600 hover:underline break-all">
                          {advocate.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {advocate.chamberAddress && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Chamber Address</p>
                        <p className="text-gray-900">{advocate.chamberAddress}</p>
                      </div>
                    </div>
                  )}

                  {advocate.locations.length > 0 && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Service Area</p>
                        <p className="text-gray-900">{advocate.locations.map((l) => l.name).join(', ')}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {advocate.experienceYears !== null && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-gray-900 font-medium">{advocate.experienceYears} years</p>
                      </div>
                    </div>
                  )}

                  {advocate.enrollmentDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Enrollment Date</p>
                        <p className="text-gray-900">{formatDate(advocate.enrollmentDate)}</p>
                      </div>
                    </div>
                  )}

                  {(advocate.consultationFeeMin !== null || advocate.consultationFeeMax !== null) && (
                    <div className="flex items-start gap-3">
                      <div className="h-5 w-5 text-gray-400 mt-0.5 flex items-center justify-center font-bold">৳</div>
                      <div>
                        <p className="text-sm text-gray-600">Consultation Fee</p>
                        <p className="text-gray-900 font-medium">
                          ৳{advocate.consultationFeeMin?.toLocaleString()} - ৳{advocate.consultationFeeMax?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact CTA */}
              {(advocate.phone || advocate.email) && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Ready to consult?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact {advocate.fullName.split(' ')[0]} to schedule a consultation.
                    </p>
                    <div className="space-y-2">
                      {advocate.phone && (
                        <a href={`tel:${advocate.phone}`} className="block">
                          <Button className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                        </a>
                      )}
                      {advocate.email && (
                        <a href={`mailto:${advocate.email}`} className="block">
                          <Button variant="outline" className="w-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
