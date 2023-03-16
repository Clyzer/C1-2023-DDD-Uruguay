import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../domain/aggregates';
import { DeletedInvoiceEventPublisherBase } from '../../domain/events/publishers';
import { IDeleteInvoiceCommand } from '../../domain/interfaces/commands';
import { IDeleteInvoiceResponse } from '../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../domain/services';

export class DeleteInvoiceUserCase<
    Command extends IDeleteInvoiceCommand = IDeleteInvoiceCommand,
    Response extends IDeleteInvoiceResponse = IDeleteInvoiceResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly invoiceService: IInvoiceDomainService,
    private readonly deletedInvoiceEventPublisherBase: DeletedInvoiceEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      invoiceService,
      deletedInvoiceEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(command: Command): Promise<boolean | null> {
    return await this.executeInvoiceAggregateRoot(command.invoiceId.valueOf());
  }

  private async executeInvoiceAggregateRoot(
    invoiceId: string,
  ): Promise<boolean | null> {
    return this.invoiceAggregateRoot.deleteInvoice(invoiceId);
  }
}
