import { EventPublisherBase } from 'src/libs';

export abstract class DeletedOrderEventPublisherBase<
  Response = boolean
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.order_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
