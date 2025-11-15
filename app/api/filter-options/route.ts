import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [practiceAreas, courtLevels, locations, languages] = await Promise.all([
      prisma.practiceArea.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.courtLevel.findMany({
        orderBy: { hierarchyLevel: 'asc' },
      }),
      prisma.location.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.language.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);

    return NextResponse.json({
      practiceAreas: practiceAreas.map((pa) => ({
        id: pa.id,
        name: pa.name,
        description: pa.description,
        icon: pa.icon,
      })),
      courtLevels: courtLevels.map((cl) => ({
        id: cl.id,
        name: cl.name,
        hierarchyLevel: cl.hierarchyLevel,
      })),
      locations: locations.map((l) => ({
        id: l.id,
        name: l.name,
        district: l.district,
      })),
      languages: languages.map((l) => ({
        id: l.id,
        name: l.name,
      })),
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
