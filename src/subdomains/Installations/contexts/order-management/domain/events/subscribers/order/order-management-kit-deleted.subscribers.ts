export abstract class OrderManagementDeletedKitOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedKitOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
