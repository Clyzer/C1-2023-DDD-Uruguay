import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateKitUseCase } from '../../../application/use-cases/order';
import { CreatedKitPublisher } from '../../messaging/publisher/order';
import { KitService } from '../../persistence/services/order';
import { CreateKitCommand } from '../../utils/commands/order';

@ApiTags('order')
@Controller('api/order/kit')
export class KitController {
  constructor(
    private readonly kitService: KitService,
    private readonly createdKitEventPublisher: CreatedKitPublisher,
  ) {}

  @Post('/create-kit')
  async createKit(@Body() command: CreateKitCommand) {
    const useCase = new CreateKitUseCase(
      this.kitService,
      this.createdKitEventPublisher,
    );
    return await useCase.execute(command);
  }
}
