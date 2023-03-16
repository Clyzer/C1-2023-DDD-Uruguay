import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IBenefitedDomainEntity } from '../../../domain/entities/interfaces/';
import { BenefitedDomainEntityBase } from '../../../domain/entities/order';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import {
  IUpdateBenefitedNameCommand,
} from '../../../domain/interfaces/commands/order';
import {
  IUpdateBenefitedNameResponse,
} from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import {
  BenefitedAddressValueObject,
  BenefitedCompanyIdValueObject,
  BenefitedIdValueObject,
  BenefitedNameValueObject,
  BenefitedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class UpdateBenefitedNameUserCase<
    Command extends IUpdateBenefitedNameCommand = IUpdateBenefitedNameCommand,
    Response extends IUpdateBenefitedNameResponse = IUpdateBenefitedNameResponse,
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
    const benefited = await this.orderAggregateRoot.getBenefited(command.benefitedId.valueOf());
    this.validateEntity(benefited);
    benefited.name = new BenefitedNameValueObject(command.name.valueOf());
    return await this.executeOrderAggregateRoot(
      benefited.benefitedId.valueOf(),
      benefited
    );
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
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedName',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    benefitedId: string,
    newBenefited: BenefitedDomainEntityBase
  ): Promise<BenefitedDomainEntityBase | null> {
    return this.orderAggregateRoot.updateBenefitedName(benefitedId, newBenefited);
  }
}
