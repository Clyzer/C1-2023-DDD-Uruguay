export abstract class OrderManagementCreatedEmployedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedEmployedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
