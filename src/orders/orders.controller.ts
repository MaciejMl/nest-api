import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-orders-dto';
import { UpdateOrderDTO } from './dtos/update-orders-dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    return this.ordersService.getById(id);
  }

  @Delete('/:id')
  public delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.delete(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
