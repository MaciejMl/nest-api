import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @Length(10, 20)
  name: string;

  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : value))
  description: string;
}
