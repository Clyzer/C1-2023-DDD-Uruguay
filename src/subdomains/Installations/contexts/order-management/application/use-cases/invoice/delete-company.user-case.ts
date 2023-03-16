import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { InvoiceCompanyDeletedEventPublisherBase } from '../../../domain/events/publishers/invoice';
import { IDeleteCompanyCommand } from '../../../domain/interfaces/commands';
import { IDeleteCompanyResponse } from '../../../domain/interfaces/responses';
import { ICompanyDomainService } from '../../../domain/services/invoice';

export class DeleteCompanyUserCase<
    Command extends IDeleteCompanyCommand = IDeleteCompanyCommand,
    Response extends IDeleteCompanyResponse = IDeleteCompanyResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly companyService: ICompanyDomainService,
    private readonly invoiceCompanyDeletedEventPublisherBase: InvoiceCompanyDeletedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      companyService,
      invoiceCompanyDeletedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(command: Command): Promise<boolean | null> {
    return this.executeInvoiceAggregateRoot(command.companyId.valueOf());
  }

  private async executeInvoiceAggregateRoot(
    companyId: string,
  ): Promise<boolean | null> {
    return this.invoiceAggregateRoot.deleteCompany(companyId);
  }
}
