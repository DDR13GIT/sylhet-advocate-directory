import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const q = searchParams.get('q') || '';
    const practiceAreas = searchParams.get('practiceAreas')?.split(',').filter(Boolean) || [];
    const experienceMin = searchParams.get('experienceMin') ? parseInt(searchParams.get('experienceMin')!) : undefined;
    const experienceMax = searchParams.get('experienceMax') ? parseInt(searchParams.get('experienceMax')!) : undefined;
    const courtLevels = searchParams.get('courtLevels')?.split(',').filter(Boolean) || [];
    const locations = searchParams.get('locations')?.split(',').filter(Boolean) || [];
    const languages = searchParams.get('languages')?.split(',').filter(Boolean) || [];
    const gender = searchParams.get('gender') || undefined;
    const feeMin = searchParams.get('feeMin') ? parseInt(searchParams.get('feeMin')!) : undefined;
    const feeMax = searchParams.get('feeMax') ? parseInt(searchParams.get('feeMax')!) : undefined;
    const availableOnly = searchParams.get('availableOnly') === 'true';
    const sortBy = searchParams.get('sortBy') || 'relevance';
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;

    // Build where clause
    const where: Prisma.AdvocateWhereInput = {
      AND: [],
    };

    // Search query
    if (q && q.length >= 3) {
      where.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { barCouncilId: { contains: q, mode: 'insensitive' } },
        { chamberAddress: { contains: q, mode: 'insensitive' } },
        { bio: { contains: q, mode: 'insensitive' } },
      ];
    }

    // Practice areas filter
    if (practiceAreas.length > 0) {
      where.AND!.push({
        practiceAreas: {
          some: {
            practiceArea: {
              name: { in: practiceAreas },
            },
          },
        },
      });
    }

    // Experience filter
    if (experienceMin !== undefined || experienceMax !== undefined) {
      where.AND!.push({
        experienceYears: {
          ...(experienceMin !== undefined && { gte: experienceMin }),
          ...(experienceMax !== undefined && { lte: experienceMax }),
        },
      });
    }

    // Court levels filter
    if (courtLevels.length > 0) {
      where.AND!.push({
        courtAdmissions: {
          some: {
            courtLevel: {
              name: { in: courtLevels },
            },
          },
        },
      });
    }

    // Locations filter
    if (locations.length > 0) {
      where.AND!.push({
        locations: {
          some: {
            location: {
              name: { in: locations },
            },
          },
        },
      });
    }

    // Languages filter
    if (languages.length > 0) {
      where.AND!.push({
        languages: {
          some: {
            language: {
              name: { in: languages },
            },
          },
        },
      });
    }

    // Gender filter
    if (gender && gender !== 'Any') {
      where.AND!.push({ gender });
    }

    // Consultation fee filter
    if (feeMin !== undefined || feeMax !== undefined) {
      where.AND!.push({
        AND: [
          ...(feeMin !== undefined
            ? [{ consultationFeeMax: { gte: feeMin } }]
            : []),
          ...(feeMax !== undefined
            ? [{ consultationFeeMin: { lte: feeMax } }]
            : []),
        ],
      });
    }

    // Availability filter
    if (availableOnly) {
      where.AND!.push({ isAcceptingCases: true });
    }

    // Clean up empty AND array
    if (where.AND!.length === 0) {
      delete where.AND;
    }

    // Build orderBy clause
    let orderBy: Prisma.AdvocateOrderByWithRelationInput = {};
    switch (sortBy) {
      case 'experience':
        orderBy = { experienceYears: 'desc' };
        break;
      case 'name':
        orderBy = { fullName: 'asc' };
        break;
      case 'fee':
        orderBy = { consultationFeeMin: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [advocates, total] = await Promise.all([
      prisma.advocate.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          practiceAreas: {
            include: {
              practiceArea: true,
            },
          },
          courtAdmissions: {
            include: {
              courtLevel: true,
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
          education: true,
        },
      }),
      prisma.advocate.count({ where }),
    ]);

    // Format response
    const formattedAdvocates = advocates.map((advocate) => ({
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
      practiceAreas: advocate.practiceAreas.map((pa) => ({
        id: pa.practiceArea.id,
        name: pa.practiceArea.name,
        isPrimary: pa.isPrimary,
      })),
      courtLevels: advocate.courtAdmissions.map((ca) => ({
        id: ca.courtLevel.id,
        name: ca.courtLevel.name,
        admissionDate: ca.admissionDate,
      })),
      languages: advocate.languages.map((l) => ({
        id: l.language.id,
        name: l.language.name,
        proficiencyLevel: l.proficiencyLevel,
      })),
      locations: advocate.locations.map((l) => ({
        id: l.location.id,
        name: l.location.name,
      })),
      education: advocate.education,
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      advocates: formattedAdvocates,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Error searching advocates:', error);
    return NextResponse.json(
      { error: 'Failed to search advocates' },
      { status: 500 }
    );
  }
}
