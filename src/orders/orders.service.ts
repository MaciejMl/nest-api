import { Injectable, BadRequestException } from '@nestjs/common';
// import { db, Order } from './../db';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        product: true,
        client: true,
      },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public delete(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;

    const productExists = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      throw new BadRequestException("Product doesn't exist");
    }

    const clientExists = await this.prismaService.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new BadRequestException("Client doesn't exist");
    }

    try {
      return this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      console.error('Prisma error:', error);
      throw error;
    }
  }

  public async updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;

    const productExists = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      throw new BadRequestException("Product doesn't exist");
    }

    const clientExists = await this.prismaService.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new BadRequestException("Client doesn't exist");
    }

    try {
      return this.prismaService.order.update({
        where: { id },
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') console.error('Prisma error:', error);
      throw error;
    }
  }
}
