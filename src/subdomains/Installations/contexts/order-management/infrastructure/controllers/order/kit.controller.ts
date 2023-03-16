import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateKitUseCase,
  DeleteKitUserCase,
  GetKitUserCase,
  UpdateKitModelUserCase,
} from '../../../application/use-cases/order';
import {
  CreatedKitPublisher,
  DeletedKitPublisher,
  GettedKitPublisher,
  ModelUpdatedKitPublisher,
} from '../../messaging/publisher/order';
import { KitService } from '../../persistence/services/order';
import {
  CreateKitCommand,
  DeleteKitCommand,
  GetKitCommand,
  UpdateKitModelCommand,
} from '../../utils/commands/order';

@ApiTags('order/kit')
@Controller('api/order/kit')
export class KitController {
  constructor(
    private readonly kitService: KitService,
    private readonly createdKitPublisher: CreatedKitPublisher,
    private readonly gettedKitPublisher: GettedKitPublisher,
    private readonly deletedKitPublisher: DeletedKitPublisher,
    private readonly modelUpdatedKitPublisher: ModelUpdatedKitPublisher,
  ) {}

  @Post('/create')
  async createKit(@Body() command: CreateKitCommand) {
    const useCase = new CreateKitUseCase(
      this.kitService,
      this.createdKitPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getKit(@Body() command: GetKitCommand) {
    const useCase = new GetKitUserCase(
      this.kitService,
      this.gettedKitPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteKit(@Body() command: DeleteKitCommand) {
    const useCase = new DeleteKitUserCase(
      this.kitService,
      this.deletedKitPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-model')
  async updateKitModel(@Body() command: UpdateKitModelCommand) {
    const useCase = new UpdateKitModelUserCase(
      this.kitService,
      this.modelUpdatedKitPublisher,
      this.gettedKitPublisher
    );
    return await useCase.execute(command);
  }
}
