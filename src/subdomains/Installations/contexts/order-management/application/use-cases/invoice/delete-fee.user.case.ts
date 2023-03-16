import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { InvoiceFeeDeletedEventPublisherBase } from '../../../domain/events/publishers/invoice';
import { IDeleteFeeCommand } from '../../../domain/interfaces/commands/invoice';
import { IDeleteFeeResponse } from '../../../domain/interfaces/responses/invoice';
import { IFeeDomainService } from '../../../domain/services/invoice';

export class DeleteFeeUserCase<
    Command extends IDeleteFeeCommand = IDeleteFeeCommand,
    Response extends IDeleteFeeResponse = IDeleteFeeResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeDeletedEventPublisherBase: InvoiceFeeDeletedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      feeService,
      invoiceFeeDeletedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(command: Command): Promise<boolean | null> {
    return await this.executeInvoiceAggregateRoot(command.feeId.valueOf());
  }

  private async executeInvoiceAggregateRoot(
    feeId: string,
  ): Promise<boolean | null> {
    return this.invoiceAggregateRoot.deleteFee(feeId);
  }
}
