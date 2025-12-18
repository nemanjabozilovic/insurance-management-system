import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const policies = [
    {
      id: randomUUID(),
      name: 'Car Insurance',
      shortDescription: 'Complete coverage for your vehicle including collision, theft, and liability protection.',
      monthlyPremium: 89.99,
    },
    {
      id: randomUUID(),
      name: 'Home Insurance',
      shortDescription: 'Protect your home and belongings with complete property and liability coverage.',
      monthlyPremium: 125.50,
    },
    {
      id: randomUUID(),
      name: 'Life Insurance',
      shortDescription: 'Health and life insurance providing financial security for you and your family.',
      monthlyPremium: 75.00,
    },
    {
      id: randomUUID(),
      name: 'Device Insurance',
      shortDescription: 'Coverage for your electronic devices including laptops, mobile phones, and tablets.',
      monthlyPremium: 19.99,
    },
    {
      id: randomUUID(),
      name: 'Travel Insurance',
      shortDescription: 'Travel protection covering medical emergencies, trip cancellations, and lost luggage.',
      monthlyPremium: 45.00,
    },
  ];

  const createdPolicies = await Promise.all(
    policies.map(async (policy) => {
      const existing = await prisma.policy.findFirst({
        where: { name: policy.name },
      });

      if (existing) {
        return existing;
      }

      return prisma.policy.create({
        data: policy,
      });
    })
  );

  const users = [
    {
      id: randomUUID(),
      username: 'jsmith',
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-03-15'),
      address: '123 Main Street, New York, NY 10001',
      phoneNumber: '+1-555-0101',
      email: 'john.smith@email.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      id: randomUUID(),
      username: 'ewilson',
      firstName: 'Emma',
      lastName: 'Wilson',
      dateOfBirth: new Date('1990-07-22'),
      address: '456 Oak Avenue, Los Angeles, CA 90001',
      phoneNumber: '+1-555-0102',
      email: 'emma.wilson@email.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      id: randomUUID(),
      username: 'dbrown',
      firstName: 'David',
      lastName: 'Brown',
      dateOfBirth: new Date('1988-11-08'),
      address: '789 Pine Road, Chicago, IL 60601',
      phoneNumber: '+1-555-0103',
      email: 'david.brown@email.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
    {
      id: randomUUID(),
      username: 'smartinez',
      firstName: 'Sophia',
      lastName: 'Martinez',
      dateOfBirth: new Date('1992-05-30'),
      address: '321 Elm Street, Houston, TX 77001',
      phoneNumber: '+1-555-0104',
      email: 'sophia.martinez@email.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
      id: randomUUID(),
      username: 'jtaylor',
      firstName: 'James',
      lastName: 'Taylor',
      dateOfBirth: new Date('1987-12-10'),
      address: '654 Maple Drive, Phoenix, AZ 85001',
      phoneNumber: '+1-555-0105',
      email: 'james.taylor@email.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
  ];

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      const existing = await prisma.user.findFirst({
        where: { username: user.username },
      });

      if (existing) {
        return existing;
      }

      return prisma.user.create({
        data: user,
      });
    })
  );

  const userPolicies = [
    { userId: createdUsers[0].id, policyId: createdPolicies[0].id },
    { userId: createdUsers[0].id, policyId: createdPolicies[2].id },
    { userId: createdUsers[1].id, policyId: createdPolicies[1].id },
    { userId: createdUsers[1].id, policyId: createdPolicies[4].id },
    { userId: createdUsers[2].id, policyId: createdPolicies[3].id },
    { userId: createdUsers[3].id, policyId: createdPolicies[0].id },
    { userId: createdUsers[3].id, policyId: createdPolicies[1].id },
    { userId: createdUsers[3].id, policyId: createdPolicies[3].id },
  ];

  for (const userPolicy of userPolicies) {
    const existing = await prisma.userPolicy.findFirst({
      where: {
        userId: userPolicy.userId,
        policyId: userPolicy.policyId,
      },
    });

    if (!existing) {
      await prisma.userPolicy.create({
        data: {
          id: randomUUID(),
          userId: userPolicy.userId,
          policyId: userPolicy.policyId,
        },
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
