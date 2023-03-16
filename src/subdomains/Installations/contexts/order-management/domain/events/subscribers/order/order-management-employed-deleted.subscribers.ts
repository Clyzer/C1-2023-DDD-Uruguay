export abstract class OrderManagementDeletedEmployedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedEmployedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
