export abstract class OrderManagementGettedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedOrderSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
