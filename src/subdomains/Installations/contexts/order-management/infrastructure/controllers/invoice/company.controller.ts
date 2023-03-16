import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateCompanyUseCase,
  DeleteCompanyUserCase,
  GetCompanyUserCase,
  UpdateCompanyBankAccountUserCase,
  UpdateCompanyNameUserCase,
} from '../../../application/use-cases/invoice';
import {
  BankAccountUpdatedCompanyPublisher,
  CreatedCompanyPublisher,
  DeletedCompanyPublisher,
  GettedCompanyPublisher,
  NameUpdatedCompanyPublisher,
} from '../../messaging/publisher/invoice';
import { CompanyService } from '../../persistence/services/invoice';
import {
  CreateCompanyCommand,
  DeleteCompanyCommand,
  GetCompanyCommand,
  UpdateCompanyBankAccountCommand,
  UpdateCompanyNameCommand,
} from '../../utils/commands/invoice';

@ApiTags('invoice/company')
@Controller('api/invoice/company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly createdCompanyPublisher: CreatedCompanyPublisher,
    private readonly gettedCompanyPublisher: GettedCompanyPublisher,
    private readonly deletedCompanyPublisher: DeletedCompanyPublisher,
    private readonly nameUpdatedCompanyPublisher: NameUpdatedCompanyPublisher,
    private readonly bankAccountUpdatedCompanyPublisher: BankAccountUpdatedCompanyPublisher,
  ) {}

  @Post('/create')
  async createCompany(@Body() command: CreateCompanyCommand) {
    const useCase = new CreateCompanyUseCase(
      this.companyService,
      this.createdCompanyPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getCompany(@Body() command: GetCompanyCommand) {
    const useCase = new GetCompanyUserCase(
      this.companyService,
      this.gettedCompanyPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteCompany(@Body() command: DeleteCompanyCommand) {
    const useCase = new DeleteCompanyUserCase(
      this.companyService,
      this.deletedCompanyPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-name')
  async updateCompanyName(@Body() command: UpdateCompanyNameCommand) {
    const useCase = new UpdateCompanyNameUserCase(
      this.companyService,
      this.nameUpdatedCompanyPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/update-bank-account')
  async updateCompanyBankAccount(
    @Body() command: UpdateCompanyBankAccountCommand,
  ) {
    const useCase = new UpdateCompanyBankAccountUserCase(
      this.companyService,
      this.bankAccountUpdatedCompanyPublisher,
    );
    return await useCase.execute(command);
  }
}
