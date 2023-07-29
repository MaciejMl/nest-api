import { Injectable } from '@nestjs/common';
// import { db, Order } from './../db';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public delete(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: orderData,
    });
  }

  public updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: orderData,
    });
  }
}
