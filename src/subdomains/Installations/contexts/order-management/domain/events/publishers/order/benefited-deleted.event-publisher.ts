import { EventPublisherBase } from '../../../../../../../../libs/sofka';

export abstract class OrderBenefitedDeletedEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.benefited_deleted',
      JSON.stringify({ data: this.response }),
    );
  }
}
