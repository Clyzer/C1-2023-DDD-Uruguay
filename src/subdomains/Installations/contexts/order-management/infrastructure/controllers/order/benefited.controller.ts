import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateBenefitedUseCase,
  DeleteBenefitedUserCase,
  GetBenefitedUserCase,
  UpdateBenefitedAddressUserCase,
  UpdateBenefitedCompanyIdUserCase,
  UpdateBenefitedNameUserCase,
  UpdateBenefitedPhoneUserCase,
} from '../../../application/use-cases/order';
import {
  AddressUpdatedBenefitedPublisher,
  CompanyIdUpdatedBenefitedPublisher,
  CreatedBenefitedPublisher,
  DeletedBenefitedPublisher,
  GettedBenefitedPublisher,
  NameUpdatedBenefitedPublisher,
  PhoneUpdatedBenefitedPublisher,
} from '../../messaging/publisher/order';
import { BenefitedService } from '../../persistence/services/order';
import {
  CreateBenefitedCommand,
  DeleteBenefitedCommand,
  GetBenefitedCommand,
  UpdateBenefitedAddressCommand,
  UpdateBenefitedCompanyIdCommand,
  UpdateBenefitedNameCommand,
  UpdateBenefitedPhoneCommand,
} from '../../utils/commands/order';

@ApiTags('order/benefited')
@Controller('api/order/benefited')
export class BenefitedController {
  constructor(
    private readonly benefitedService: BenefitedService,
    private readonly createdBenefitedPublisher: CreatedBenefitedPublisher,
    private readonly gettedBenefitedPublisher: GettedBenefitedPublisher,
    private readonly deletedBenefitedPublisher: DeletedBenefitedPublisher,
    private readonly nameUpdatedBenefitedPublisher: NameUpdatedBenefitedPublisher,
    private readonly phoneUpdatedBenefitedPublisher: PhoneUpdatedBenefitedPublisher,
    private readonly addressUpdatedBenefitedPublisher: AddressUpdatedBenefitedPublisher,
    private readonly companyIdUpdatedBenefitedPublisher: CompanyIdUpdatedBenefitedPublisher,
  ) {}

  @Post('/create')
  async createBenefited(@Body() command: CreateBenefitedCommand) {
    const useCase = new CreateBenefitedUseCase(
      this.benefitedService,
      this.createdBenefitedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getBenefited(@Body() command: GetBenefitedCommand) {
    const useCase = new GetBenefitedUserCase(
      this.benefitedService,
      this.gettedBenefitedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteBenefited(@Body() command: DeleteBenefitedCommand) {
    const useCase = new DeleteBenefitedUserCase(
      this.benefitedService,
      this.deletedBenefitedPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-name')
  async updateBenefitedName(@Body() command: UpdateBenefitedNameCommand) {
    const useCase = new UpdateBenefitedNameUserCase(
      this.benefitedService,
      this.nameUpdatedBenefitedPublisher,
      this.gettedBenefitedPublisher
    );
    return await useCase.execute(command);
  }

  @Post('/update-phone')
  async updateBenefitedPhone(@Body() command: UpdateBenefitedPhoneCommand) {
    const useCase = new UpdateBenefitedPhoneUserCase(
      this.benefitedService,
      this.phoneUpdatedBenefitedPublisher,
      this.gettedBenefitedPublisher
    );
    return await useCase.execute(command);
  }

  @Post('/update-address')
  async updateBenefitedAddress(@Body() command: UpdateBenefitedAddressCommand) {
    const useCase = new UpdateBenefitedAddressUserCase(
      this.benefitedService,
      this.addressUpdatedBenefitedPublisher,
      this.gettedBenefitedPublisher
    );
    return await useCase.execute(command);
  }

  @Post('/update-companyid')
  async updateBenefitedCompanyId(
    @Body() command: UpdateBenefitedCompanyIdCommand,
  ) {
    const useCase = new UpdateBenefitedCompanyIdUserCase(
      this.benefitedService,
      this.companyIdUpdatedBenefitedPublisher,
      this.gettedBenefitedPublisher
    );
    return await useCase.execute(command);
  }
}
