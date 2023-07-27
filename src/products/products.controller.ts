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
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-products.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');
    this.productsService.delete(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }
}
