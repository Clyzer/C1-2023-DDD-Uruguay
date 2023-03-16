export abstract class OrderManagementCreatedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedOrderSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
