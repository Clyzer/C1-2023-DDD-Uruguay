import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateFeeUseCase,
  DeleteFeeUserCase,
  GetFeeUserCase,
  UpdateFeeChargeUserCase,
  UpdateFeeTaxUserCase,
} from '../../../application/use-cases/invoice';
import {
  ChargeUpdatedFeePublisher,
  CreatedFeePublisher,
  DeletedFeePublisher,
  GettedFeePublisher,
  TaxUpdatedFeePublisher,
} from '../../messaging/publisher/invoice';
import { FeeService } from '../../persistence/services/invoice';
import {
  CreateFeeCommand,
  DeleteFeeCommand,
  GetFeeCommand,
  UpdateFeeChargeCommand,
  UpdateFeeTaxCommand,
} from '../../utils/commands/invoice';

@ApiTags('invoice/fee')
@Controller('api/invoice/fee')
export class FeeController {
  constructor(
    private readonly feeService: FeeService,
    private readonly createdFeePublisher: CreatedFeePublisher,
    private readonly gettedFeePublisher: GettedFeePublisher,
    private readonly deletedFeePublisher: DeletedFeePublisher,
    private readonly taxUpdatedFeePublisher: TaxUpdatedFeePublisher,
    private readonly chargeUpdatedFeePublisher: ChargeUpdatedFeePublisher,
  ) {}

  @Post('/create')
  async createFee(@Body() command: CreateFeeCommand) {
    const useCase = new CreateFeeUseCase(
      this.feeService,
      this.createdFeePublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getFee(@Body() command: GetFeeCommand) {
    const useCase = new GetFeeUserCase(
      this.feeService,
      this.gettedFeePublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteFee(@Body() command: DeleteFeeCommand) {
    const useCase = new DeleteFeeUserCase(
      this.feeService,
      this.deletedFeePublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-tax')
  async updateFeeTax(@Body() command: UpdateFeeTaxCommand) {
    const useCase = new UpdateFeeTaxUserCase(
      this.feeService,
      this.taxUpdatedFeePublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-charge')
  async updateFeeCharge(@Body() command: UpdateFeeChargeCommand) {
    const useCase = new UpdateFeeChargeUserCase(
      this.feeService,
      this.chargeUpdatedFeePublisher,
    );
    return await useCase.execute(command);
  }
}
