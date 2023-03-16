import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IBenefitedDomainEntity } from '../../../domain/entities/interfaces/';
import { BenefitedDomainEntityBase } from '../../../domain/entities/order';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IGetBenefitedCommand } from '../../../domain/interfaces/commands';
import { IGetBenefitedResponse } from '../../../domain/interfaces/responses';
import { IOrderDomainService } from '../../../domain/services';
import {
  BenefitedAddressValueObject,
  BenefitedCompanyIdValueObject,
  BenefitedIdValueObject,
  BenefitedNameValueObject,
  BenefitedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class GetBenefitedUserCase<
    Command extends IGetBenefitedCommand = IGetBenefitedCommand,
    Response extends IGetBenefitedResponse = IGetBenefitedResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
    private readonly createdOrderEventPublisherBase: CreatedOrderEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      orderService,
      createdOrderEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<BenefitedDomainEntityBase | null> {
    const benefited = await this.executeOrderAggregateRoot(
      command.benefitedId.valueOf(),
    );
    this.validateEntity(benefited);
    return benefited;
  }

  private validateEntity(benefited: IBenefitedDomainEntity): void {
    const { benefitedId, name, phone, address, companyId } = benefited;

    if (
      benefitedId instanceof BenefitedIdValueObject &&
      benefitedId.hasErrors()
    )
      this.setErrors(benefitedId.getErrors());

    if (name instanceof BenefitedNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (phone instanceof BenefitedPhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());

    if (address instanceof BenefitedAddressValueObject && address.hasErrors())
      this.setErrors(address.getErrors());

    if (
      companyId instanceof BenefitedCompanyIdValueObject &&
      companyId.hasErrors()
    )
      this.setErrors(companyId.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetBenefited',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    benefitedId: string,
  ): Promise<BenefitedDomainEntityBase | null> {
    return this.orderAggregateRoot.getBenefited(benefitedId);
  }
}
