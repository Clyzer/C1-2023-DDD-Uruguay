import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateEmployedUseCase,
  DeleteEmployedUserCase,
  GetEmployedUserCase,
  UpdateEmployedNameUserCase,
  UpdateEmployedPhoneUserCase,
} from '../../../application/use-cases/order';
import {
  CreatedEmployedPublisher,
  DeletedEmployedPublisher,
  GettedEmployedPublisher,
  NameUpdatedEmployedPublisher,
  PhoneUpdatedEmployedPublisher,
} from '../../messaging/publisher/order';
import { EmployedService } from '../../persistence/services/order';
import {
  CreateEmployedCommand,
  DeleteEmployedCommand,
  GetEmployedCommand,
  UpdateEmployedNameCommand,
  UpdateEmployedPhoneCommand,
} from '../../utils/commands/order';

@ApiTags('order/employed')
@Controller('api/order/employed')
export class EmployedController {
  constructor(
    private readonly employedService: EmployedService,
    private readonly createdEmployedPublisher: CreatedEmployedPublisher,
    private readonly gettedEmployedPublisher: GettedEmployedPublisher,
    private readonly deletedEmployedPublisher: DeletedEmployedPublisher,
    private readonly nameUpdatedEmployedPublisher: NameUpdatedEmployedPublisher,
    private readonly phoneUpdatedEmployedPublisher: PhoneUpdatedEmployedPublisher,
  ) {}

  @Post('/create')
  async createEmployed(@Body() command: CreateEmployedCommand) {
    const useCase = new CreateEmployedUseCase(
      this.employedService,
      this.createdEmployedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getEmployed(@Body() command: GetEmployedCommand) {
    const useCase = new GetEmployedUserCase(
      this.employedService,
      this.gettedEmployedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteEmployed(@Body() command: DeleteEmployedCommand) {
    const useCase = new DeleteEmployedUserCase(
      this.employedService,
      this.deletedEmployedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-name')
  async updateEmployedName(@Body() command: UpdateEmployedNameCommand) {
    const useCase = new UpdateEmployedNameUserCase(
      this.employedService,
      this.nameUpdatedEmployedPublisher,
      this.gettedEmployedPublisher
    );
    return await useCase.execute(command);
  }

  @Post('/update-phone')
  async updateEmployedPhone(@Body() command: UpdateEmployedPhoneCommand) {
    const useCase = new UpdateEmployedPhoneUserCase(
      this.employedService,
      this.phoneUpdatedEmployedPublisher,
      this.gettedEmployedPublisher
    );
    return await useCase.execute(command);
  }
}
