import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Phone, Mail, CheckCircle } from 'lucide-react';

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

export function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const primaryPracticeArea = advocate.practiceAreas.find((pa) => pa.isPrimary);
  const otherPracticeAreas = advocate.practiceAreas.filter((pa) => !pa.isPrimary).slice(0, 2);

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
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={advocate.photoUrl || undefined} alt={advocate.fullName} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {getInitials(advocate.fullName)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg mb-1">{advocate.fullName}</h3>
          <p className="text-sm text-gray-500 mb-2">{advocate.barCouncilId}</p>
          {advocate.isAcceptingCases && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Accepting Cases</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {primaryPracticeArea && (
            <div>
              <Badge variant="default" className="mb-2">
                {primaryPracticeArea.name}
              </Badge>
              {otherPracticeAreas.map((pa) => (
                <Badge key={pa.id} variant="outline" className="ml-1 mb-2">
                  {pa.name}
                </Badge>
              ))}
            </div>
          )}

          {advocate.experienceYears !== null && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{advocate.experienceYears} years experience</span>
            </div>
          )}

          {advocate.locations.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{advocate.locations[0].name}</span>
            </div>
          )}

          {(advocate.consultationFeeMin !== null || advocate.consultationFeeMax !== null) && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Consultation Fee:</span> ৳
              {advocate.consultationFeeMin?.toLocaleString()} - ৳
              {advocate.consultationFeeMax?.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/advocates/${advocate.id}`} className="flex-1">
          <Button variant="default" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
