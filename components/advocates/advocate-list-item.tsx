import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, CheckCircle } from 'lucide-react';

interface Advocate {
  id: number;
  barCouncilId: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  experienceYears: number | null;
  bio: string | null;
  chamberAddress: string | null;
  consultationFeeMin: number | null;
  consultationFeeMax: number | null;
  isAcceptingCases: boolean;
  practiceAreas: Array<{ id: number; name: string; isPrimary: boolean }>;
  locations: Array<{ id: number; name: string }>;
}

export function AdvocateListItem({ advocate }: { advocate: Advocate }) {
  const primaryPracticeArea = advocate.practiceAreas.find((pa) => pa.isPrimary);
  const otherPracticeAreas = advocate.practiceAreas.filter((pa) => !pa.isPrimary);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={advocate.photoUrl || undefined} alt={advocate.fullName} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(advocate.fullName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{advocate.fullName}</h3>
                  <p className="text-sm text-gray-500">{advocate.barCouncilId}</p>
                </div>
                {advocate.isAcceptingCases && (
                  <div className="flex items-center text-green-600 text-sm ml-4">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Accepting Cases</span>
                  </div>
                )}
              </div>

              {advocate.bio && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{advocate.bio}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {primaryPracticeArea && (
                  <Badge variant="default">{primaryPracticeArea.name}</Badge>
                )}
                {otherPracticeAreas.slice(0, 3).map((pa) => (
                  <Badge key={pa.id} variant="outline">
                    {pa.name}
                  </Badge>
                ))}
                {otherPracticeAreas.length > 3 && (
                  <Badge variant="outline">+{otherPracticeAreas.length - 3} more</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {advocate.experienceYears !== null && (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{advocate.experienceYears} years</span>
                  </div>
                )}
                {advocate.locations.length > 0 && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{advocate.locations[0].name}</span>
                  </div>
                )}
                {(advocate.consultationFeeMin !== null || advocate.consultationFeeMax !== null) && (
                  <div>
                    <span className="font-medium">Fee:</span> ৳
                    {advocate.consultationFeeMin?.toLocaleString()} - ৳
                    {advocate.consultationFeeMax?.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:flex-col gap-2 md:items-end">
            <Link href={`/advocates/${advocate.id}`}>
              <Button variant="default">View Profile</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
