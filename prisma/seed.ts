import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed Practice Areas
  console.log('📚 Seeding practice areas...');
  const practiceAreas = [
    { name: 'Criminal Law', description: 'Defense and prosecution in criminal cases', icon: 'scale' },
    { name: 'Civil Law', description: 'Civil disputes, contracts, and property matters', icon: 'file-text' },
    { name: 'Family Law', description: 'Marriage, divorce, custody, and family matters', icon: 'users' },
    { name: 'Corporate Law', description: 'Business formation, contracts, and corporate matters', icon: 'briefcase' },
    { name: 'Property Law', description: 'Real estate transactions and property disputes', icon: 'home' },
    { name: 'Tax Law', description: 'Tax disputes and compliance', icon: 'calculator' },
    { name: 'Labor Law', description: 'Employment and labor disputes', icon: 'user-check' },
    { name: 'Intellectual Property', description: 'Patents, trademarks, and copyrights', icon: 'lightbulb' },
    { name: 'Constitutional Law', description: 'Constitutional matters and fundamental rights', icon: 'book-open' },
    { name: 'Banking Law', description: 'Banking regulations and financial disputes', icon: 'landmark' },
    { name: 'Environmental Law', description: 'Environmental regulations and disputes', icon: 'tree' },
    { name: 'Immigration Law', description: 'Immigration and visa matters', icon: 'plane' },
  ];

  for (const area of practiceAreas) {
    await prisma.practiceArea.upsert({
      where: { name: area.name },
      update: {},
      create: area,
    });
  }

  // Seed Court Levels
  console.log('⚖️  Seeding court levels...');
  const courtLevels = [
    { name: 'Supreme Court', hierarchyLevel: 1 },
    { name: 'High Court Division', hierarchyLevel: 2 },
    { name: 'Appellate Division', hierarchyLevel: 3 },
    { name: 'District Court', hierarchyLevel: 4 },
    { name: 'Magistrate Court', hierarchyLevel: 5 },
    { name: 'Tribunal', hierarchyLevel: 6 },
    { name: 'Special Court', hierarchyLevel: 7 },
  ];

  for (const court of courtLevels) {
    await prisma.courtLevel.upsert({
      where: { name: court.name },
      update: {},
      create: court,
    });
  }

  // Seed Languages
  console.log('🗣️  Seeding languages...');
  const languages = [
    { name: 'Bengali' },
    { name: 'English' },
    { name: 'Sylheti' },
    { name: 'Hindi' },
    { name: 'Urdu' },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { name: language.name },
      update: {},
      create: language,
    });
  }

  // Seed Locations (Upazilas in Sylhet)
  console.log('📍 Seeding locations...');
  const locations = [
    { name: 'Sylhet Sadar', district: 'Sylhet' },
    { name: 'Beanibazar', district: 'Sylhet' },
    { name: 'Bishwanath', district: 'Sylhet' },
    { name: 'Companiganj', district: 'Sylhet' },
    { name: 'Fenchuganj', district: 'Sylhet' },
    { name: 'Golapganj', district: 'Sylhet' },
    { name: 'Gowainghat', district: 'Sylhet' },
    { name: 'Jaintiapur', district: 'Sylhet' },
    { name: 'Kanaighat', district: 'Sylhet' },
    { name: 'Zakiganj', district: 'Sylhet' },
    { name: 'Osmani Nagar', district: 'Sylhet' },
    { name: 'South Surma', district: 'Sylhet' },
  ];

  for (const location of locations) {
    await prisma.location.upsert({
      where: { name: location.name },
      update: {},
      create: location,
    });
  }

  // Seed Sample Advocates
  console.log('👨‍⚖️ Seeding sample advocates...');

  const sampleAdvocates = [
    {
      barCouncilId: 'SYL-2010-0001',
      fullName: 'Advocate Rahman Ahmed',
      email: 'rahman.ahmed@example.com',
      phone: '+880 1711-123456',
      photoUrl: '/avatars/advocate-1.jpg',
      enrollmentDate: new Date('2010-01-15'),
      experienceYears: 14,
      gender: 'Male',
      bio: 'Experienced criminal lawyer with expertise in high-profile cases. Successfully defended over 200 cases with a proven track record.',
      chamberAddress: 'Chamber No. 15, Sylhet Bar Association Building, Court Road, Sylhet',
      chamberLat: 24.8949,
      chamberLng: 91.8687,
      consultationFeeMin: 3000,
      consultationFeeMax: 10000,
      isAcceptingCases: true,
    },
    {
      barCouncilId: 'SYL-2015-0042',
      fullName: 'Advocate Fatima Khatun',
      email: 'fatima.khatun@example.com',
      phone: '+880 1712-234567',
      photoUrl: '/avatars/advocate-2.jpg',
      enrollmentDate: new Date('2015-06-10'),
      experienceYears: 9,
      gender: 'Female',
      bio: 'Specializing in family law and women\'s rights. Passionate advocate for justice and equality.',
      chamberAddress: 'Chamber No. 23, City Center, Zindabazar, Sylhet',
      chamberLat: 24.8917,
      chamberLng: 91.8697,
      consultationFeeMin: 2500,
      consultationFeeMax: 8000,
      isAcceptingCases: true,
    },
    {
      barCouncilId: 'SYL-2005-0018',
      fullName: 'Advocate Mohammad Hasan',
      email: 'mohammad.hasan@example.com',
      phone: '+880 1713-345678',
      photoUrl: '/avatars/advocate-3.jpg',
      enrollmentDate: new Date('2005-03-20'),
      experienceYears: 19,
      gender: 'Male',
      bio: 'Corporate and business law specialist. Advising startups and established businesses on legal compliance and contracts.',
      chamberAddress: 'Hasan Law Chambers, Chowhatta, Sylhet',
      chamberLat: 24.8978,
      chamberLng: 91.8714,
      consultationFeeMin: 5000,
      consultationFeeMax: 15000,
      isAcceptingCases: true,
    },
    {
      barCouncilId: 'SYL-2018-0089',
      fullName: 'Advocate Nadia Islam',
      email: 'nadia.islam@example.com',
      phone: '+880 1714-456789',
      photoUrl: '/avatars/advocate-4.jpg',
      enrollmentDate: new Date('2018-09-01'),
      experienceYears: 6,
      gender: 'Female',
      bio: 'Young and dynamic lawyer focusing on civil litigation and property disputes. Tech-savvy and client-oriented.',
      chamberAddress: 'Office 5B, Rikabibazar, Sylhet',
      chamberLat: 24.8956,
      chamberLng: 91.8701,
      consultationFeeMin: 2000,
      consultationFeeMax: 6000,
      isAcceptingCases: true,
    },
    {
      barCouncilId: 'SYL-2000-0003',
      fullName: 'Advocate Kamal Uddin',
      email: 'kamal.uddin@example.com',
      phone: '+880 1715-567890',
      photoUrl: '/avatars/advocate-5.jpg',
      enrollmentDate: new Date('2000-02-14'),
      experienceYears: 24,
      gender: 'Male',
      bio: 'Senior advocate with extensive experience in constitutional law and Supreme Court practice. Mentor to many young lawyers.',
      chamberAddress: 'Chamber No. 8, Bar Association Building, Sylhet',
      chamberLat: 24.8952,
      chamberLng: 91.8689,
      consultationFeeMin: 10000,
      consultationFeeMax: 25000,
      isAcceptingCases: true,
    },
  ];

  const createdAdvocates = [];
  for (const advocate of sampleAdvocates) {
    const created = await prisma.advocate.upsert({
      where: { barCouncilId: advocate.barCouncilId },
      update: {},
      create: advocate,
    });
    createdAdvocates.push(created);
  }

  // Assign practice areas to advocates
  console.log('🔗 Linking practice areas to advocates...');
  const allPracticeAreas = await prisma.practiceArea.findMany();
  const allCourtLevels = await prisma.courtLevel.findMany();
  const allLanguages = await prisma.language.findMany();
  const allLocations = await prisma.location.findMany();

  // Advocate 1: Criminal Law specialist
  await prisma.advocatePracticeArea.createMany({
    data: [
      { advocateId: createdAdvocates[0].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Criminal Law')!.id, isPrimary: true },
      { advocateId: createdAdvocates[0].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Constitutional Law')!.id, isPrimary: false },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateCourtAdmission.createMany({
    data: [
      { advocateId: createdAdvocates[0].id, courtLevelId: allCourtLevels.find(c => c.name === 'Supreme Court')!.id, admissionDate: new Date('2015-05-10') },
      { advocateId: createdAdvocates[0].id, courtLevelId: allCourtLevels.find(c => c.name === 'High Court Division')!.id, admissionDate: new Date('2012-03-15') },
      { advocateId: createdAdvocates[0].id, courtLevelId: allCourtLevels.find(c => c.name === 'District Court')!.id, admissionDate: new Date('2010-01-15') },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLanguage.createMany({
    data: [
      { advocateId: createdAdvocates[0].id, languageId: allLanguages.find(l => l.name === 'Bengali')!.id, proficiencyLevel: 'Native' },
      { advocateId: createdAdvocates[0].id, languageId: allLanguages.find(l => l.name === 'English')!.id, proficiencyLevel: 'Fluent' },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLocation.create({
    data: { advocateId: createdAdvocates[0].id, locationId: allLocations.find(l => l.name === 'Sylhet Sadar')!.id },
  });

  await prisma.education.create({
    data: {
      advocateId: createdAdvocates[0].id,
      degree: 'LL.B (Hons)',
      institution: 'University of Dhaka',
      graduationYear: 2009,
      specialization: 'Criminal Law',
    },
  });

  // Advocate 2: Family Law specialist
  await prisma.advocatePracticeArea.createMany({
    data: [
      { advocateId: createdAdvocates[1].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Family Law')!.id, isPrimary: true },
      { advocateId: createdAdvocates[1].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Civil Law')!.id, isPrimary: false },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateCourtAdmission.createMany({
    data: [
      { advocateId: createdAdvocates[1].id, courtLevelId: allCourtLevels.find(c => c.name === 'High Court Division')!.id, admissionDate: new Date('2018-06-20') },
      { advocateId: createdAdvocates[1].id, courtLevelId: allCourtLevels.find(c => c.name === 'District Court')!.id, admissionDate: new Date('2015-06-10') },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLanguage.createMany({
    data: [
      { advocateId: createdAdvocates[1].id, languageId: allLanguages.find(l => l.name === 'Bengali')!.id, proficiencyLevel: 'Native' },
      { advocateId: createdAdvocates[1].id, languageId: allLanguages.find(l => l.name === 'English')!.id, proficiencyLevel: 'Fluent' },
      { advocateId: createdAdvocates[1].id, languageId: allLanguages.find(l => l.name === 'Sylheti')!.id, proficiencyLevel: 'Native' },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLocation.create({
    data: { advocateId: createdAdvocates[1].id, locationId: allLocations.find(l => l.name === 'Sylhet Sadar')!.id },
  });

  await prisma.education.create({
    data: {
      advocateId: createdAdvocates[1].id,
      degree: 'LL.B (Hons), LL.M',
      institution: 'Sylhet International University',
      graduationYear: 2014,
      specialization: 'Family Law',
    },
  });

  // Advocate 3: Corporate Law specialist
  await prisma.advocatePracticeArea.createMany({
    data: [
      { advocateId: createdAdvocates[2].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Corporate Law')!.id, isPrimary: true },
      { advocateId: createdAdvocates[2].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Tax Law')!.id, isPrimary: false },
      { advocateId: createdAdvocates[2].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Banking Law')!.id, isPrimary: false },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateCourtAdmission.createMany({
    data: [
      { advocateId: createdAdvocates[2].id, courtLevelId: allCourtLevels.find(c => c.name === 'Supreme Court')!.id, admissionDate: new Date('2010-04-12') },
      { advocateId: createdAdvocates[2].id, courtLevelId: allCourtLevels.find(c => c.name === 'High Court Division')!.id, admissionDate: new Date('2008-02-20') },
      { advocateId: createdAdvocates[2].id, courtLevelId: allCourtLevels.find(c => c.name === 'District Court')!.id, admissionDate: new Date('2005-03-20') },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLanguage.createMany({
    data: [
      { advocateId: createdAdvocates[2].id, languageId: allLanguages.find(l => l.name === 'Bengali')!.id, proficiencyLevel: 'Native' },
      { advocateId: createdAdvocates[2].id, languageId: allLanguages.find(l => l.name === 'English')!.id, proficiencyLevel: 'Fluent' },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLocation.createMany({
    data: [
      { advocateId: createdAdvocates[2].id, locationId: allLocations.find(l => l.name === 'Sylhet Sadar')!.id },
    ],
    skipDuplicates: true,
  });

  await prisma.education.create({
    data: {
      advocateId: createdAdvocates[2].id,
      degree: 'LL.B (Hons), MBA',
      institution: 'Bangladesh University of Professionals',
      graduationYear: 2004,
      specialization: 'Corporate and Business Law',
    },
  });

  // Advocate 4: Civil Law and Property specialist
  await prisma.advocatePracticeArea.createMany({
    data: [
      { advocateId: createdAdvocates[3].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Civil Law')!.id, isPrimary: true },
      { advocateId: createdAdvocates[3].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Property Law')!.id, isPrimary: false },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateCourtAdmission.createMany({
    data: [
      { advocateId: createdAdvocates[3].id, courtLevelId: allCourtLevels.find(c => c.name === 'District Court')!.id, admissionDate: new Date('2018-09-01') },
      { advocateId: createdAdvocates[3].id, courtLevelId: allCourtLevels.find(c => c.name === 'Magistrate Court')!.id, admissionDate: new Date('2018-09-01') },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLanguage.createMany({
    data: [
      { advocateId: createdAdvocates[3].id, languageId: allLanguages.find(l => l.name === 'Bengali')!.id, proficiencyLevel: 'Native' },
      { advocateId: createdAdvocates[3].id, languageId: allLanguages.find(l => l.name === 'English')!.id, proficiencyLevel: 'Fluent' },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLocation.create({
    data: { advocateId: createdAdvocates[3].id, locationId: allLocations.find(l => l.name === 'Sylhet Sadar')!.id },
  });

  await prisma.education.create({
    data: {
      advocateId: createdAdvocates[3].id,
      degree: 'LL.B (Hons)',
      institution: 'Metropolitan University',
      graduationYear: 2017,
      specialization: 'Civil Law',
    },
  });

  // Advocate 5: Constitutional Law expert
  await prisma.advocatePracticeArea.createMany({
    data: [
      { advocateId: createdAdvocates[4].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Constitutional Law')!.id, isPrimary: true },
      { advocateId: createdAdvocates[4].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Criminal Law')!.id, isPrimary: false },
      { advocateId: createdAdvocates[4].id, practiceAreaId: allPracticeAreas.find(pa => pa.name === 'Civil Law')!.id, isPrimary: false },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateCourtAdmission.createMany({
    data: [
      { advocateId: createdAdvocates[4].id, courtLevelId: allCourtLevels.find(c => c.name === 'Supreme Court')!.id, admissionDate: new Date('2005-08-15') },
      { advocateId: createdAdvocates[4].id, courtLevelId: allCourtLevels.find(c => c.name === 'High Court Division')!.id, admissionDate: new Date('2003-05-10') },
      { advocateId: createdAdvocates[4].id, courtLevelId: allCourtLevels.find(c => c.name === 'District Court')!.id, admissionDate: new Date('2000-02-14') },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLanguage.createMany({
    data: [
      { advocateId: createdAdvocates[4].id, languageId: allLanguages.find(l => l.name === 'Bengali')!.id, proficiencyLevel: 'Native' },
      { advocateId: createdAdvocates[4].id, languageId: allLanguages.find(l => l.name === 'English')!.id, proficiencyLevel: 'Fluent' },
      { advocateId: createdAdvocates[4].id, languageId: allLanguages.find(l => l.name === 'Urdu')!.id, proficiencyLevel: 'Intermediate' },
    ],
    skipDuplicates: true,
  });

  await prisma.advocateLocation.create({
    data: { advocateId: createdAdvocates[4].id, locationId: allLocations.find(l => l.name === 'Sylhet Sadar')!.id },
  });

  await prisma.education.createMany({
    data: [
      {
        advocateId: createdAdvocates[4].id,
        degree: 'LL.B (Hons)',
        institution: 'University of Dhaka',
        graduationYear: 1999,
      },
      {
        advocateId: createdAdvocates[4].id,
        degree: 'LL.M',
        institution: 'University of London',
        graduationYear: 2002,
        specialization: 'Constitutional Law',
      },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log(`Created ${createdAdvocates.length} advocates with complete profiles.`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
