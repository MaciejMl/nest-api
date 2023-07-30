import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '9d9b5f16-94e5-4e96-8916-17941a74c5c5',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '9d9b5f16-94e5-4e96-8916-17941a74c5c5',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'd1f6a2db-85b0-4df7-9b5a-51859c2f13e6',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
    {
      id: 'e4c726ae-2e7c-4f94-b042-7e9e29a0a9bb',
      clientId: '3e5cfdd7-9e21-4d8b-bb3a-0a84b6f5296c',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
    },
  ];
}

function getClients() {
  return [
    {
      id: '9d9b5f16-94e5-4e96-8916-17941a74c5c5',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'd1f6a2db-85b0-4df7-9b5a-51859c2f13e6',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
    {
      id: '3e5cfdd7-9e21-4d8b-bb3a-0a84b6f5296c',
      name: 'Edd Harris',
      address: 'Hudson Street 221, New Jersey',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();
