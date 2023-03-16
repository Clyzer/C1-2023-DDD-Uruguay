import { EventPublisherBase } from 'src/libs';

export abstract class OrderKitDeletedEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.kit_deleted',
      JSON.stringify({ data: this.response }),
    );
  }
}
