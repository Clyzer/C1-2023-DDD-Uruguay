import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IBenefitedDomainEntity } from '../../../domain/entities/interfaces';
import { BenefitedDomainEntityBase } from '../../../domain/entities/order';
import {
  OrderBenefitedAddressUpdatedEventPublisherBase,
  OrderBenefitedGettedEventPublisherBase,
} from '../../../domain/events/publishers/order';
import {
  IUpdateBenefitedAddressCommand,
} from '../../../domain/interfaces/commands/order';
import {
  IUpdateBenefitedAddressResponse,
} from '../../../domain/interfaces/responses/order';
import { IBenefitedDomainService } from '../../../domain/services/order';
import {
  BenefitedAddressValueObject,
  BenefitedCompanyIdValueObject,
  BenefitedIdValueObject,
  BenefitedNameValueObject,
  BenefitedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class UpdateBenefitedAddressUserCase<
    Command extends IUpdateBenefitedAddressCommand = IUpdateBenefitedAddressCommand,
    Response extends IUpdateBenefitedAddressResponse = IUpdateBenefitedAddressResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly benefitedService: IBenefitedDomainService,
    private readonly orderBenefitedAddressUpdatedEventPublisherBase: OrderBenefitedAddressUpdatedEventPublisherBase,
    private readonly orderBenefitedGettedEventPublisherBase: OrderBenefitedGettedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      benefitedService,
      orderBenefitedAddressUpdatedEventPublisherBase,
      orderBenefitedGettedEventPublisherBase
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<BenefitedDomainEntityBase | null> {
    const benefited = await this.orderAggregateRoot.getBenefited(
      command.benefitedId.valueOf(),
    );
    this.validateEntity(benefited);
    benefited.address = command.address.valueOf();
    return await this.executeOrderAggregateRoot(
      benefited.benefitedId.valueOf(),
      benefited,
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
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedAddress',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    benefitedId: string,
    newBenefited: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase | null> {
    return this.orderAggregateRoot.updateBenefitedAddress(
      benefitedId,
      newBenefited,
    );
  }
}
