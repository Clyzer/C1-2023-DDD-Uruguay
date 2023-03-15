import { EventPublisherBase } from 'src/libs';

export abstract class OrderStatusChangedEventPublisherBase<
  Response = boolean
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.status_changed",
      JSON.stringify({ data: this.response })
    );
  }
}
