import { EventPublisherBase } from 'src/libs';

export abstract class DeletedOrderEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.deleted_order',
      JSON.stringify({ data: this.response }),
    );
  }
}
