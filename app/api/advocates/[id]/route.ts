import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const advocateId = parseInt(id);

    if (isNaN(advocateId)) {
      return NextResponse.json(
        { error: 'Invalid advocate ID' },
        { status: 400 }
      );
    }

    const advocate = await prisma.advocate.findUnique({
      where: { id: advocateId },
      include: {
        practiceAreas: {
          include: {
            practiceArea: true,
          },
          orderBy: {
            isPrimary: 'desc',
          },
        },
        courtAdmissions: {
          include: {
            courtLevel: true,
          },
          orderBy: {
            admissionDate: 'desc',
          },
        },
        languages: {
          include: {
            language: true,
          },
        },
        locations: {
          include: {
            location: true,
          },
        },
        education: {
          orderBy: {
            graduationYear: 'desc',
          },
        },
      },
    });

    if (!advocate) {
      return NextResponse.json(
        { error: 'Advocate not found' },
        { status: 404 }
      );
    }

    const formattedAdvocate = {
      id: advocate.id,
      barCouncilId: advocate.barCouncilId,
      fullName: advocate.fullName,
      email: advocate.email,
      phone: advocate.phone,
      photoUrl: advocate.photoUrl,
      enrollmentDate: advocate.enrollmentDate,
      experienceYears: advocate.experienceYears,
      gender: advocate.gender,
      bio: advocate.bio,
      chamberAddress: advocate.chamberAddress,
      chamberLat: advocate.chamberLat ? parseFloat(advocate.chamberLat.toString()) : null,
      chamberLng: advocate.chamberLng ? parseFloat(advocate.chamberLng.toString()) : null,
      consultationFeeMin: advocate.consultationFeeMin,
      consultationFeeMax: advocate.consultationFeeMax,
      isAcceptingCases: advocate.isAcceptingCases,
      practiceAreas: advocate.practiceAreas.map((pa: typeof advocate.practiceAreas[number]) => ({
        id: pa.practiceArea.id,
        name: pa.practiceArea.name,
        description: pa.practiceArea.description,
        icon: pa.practiceArea.icon,
        isPrimary: pa.isPrimary,
      })),
      courtLevels: advocate.courtAdmissions.map((ca: typeof advocate.courtAdmissions[number]) => ({
        id: ca.courtLevel.id,
        name: ca.courtLevel.name,
        hierarchyLevel: ca.courtLevel.hierarchyLevel,
        admissionDate: ca.admissionDate,
      })),
      languages: advocate.languages.map((l: typeof advocate.languages[number]) => ({
        id: l.language.id,
        name: l.language.name,
        proficiencyLevel: l.proficiencyLevel,
      })),
      locations: advocate.locations.map((l: typeof advocate.locations[number]) => ({
        id: l.location.id,
        name: l.location.name,
        district: l.location.district,
      })),
      education: advocate.education,
    };

    return NextResponse.json(formattedAdvocate);
  } catch (error) {
    console.error('Error fetching advocate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch advocate' },
      { status: 500 }
    );
  }
}
