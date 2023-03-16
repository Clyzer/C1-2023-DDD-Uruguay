export abstract class OrderManagementGettedEmployedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedEmployedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
