import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import type { PriceRequest, PriceResponse } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  @HttpCode(200)
  estimate(@Body() body: PriceRequest): Promise<PriceResponse> {
    return this.priceService.estimate(body);
  }
}
