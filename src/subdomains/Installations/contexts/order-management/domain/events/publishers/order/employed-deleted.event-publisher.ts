import { EventPublisherBase } from 'src/libs';

export abstract class OrderEmployedDeletedEventPublisherBase<
  Response = boolean
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.employed_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
