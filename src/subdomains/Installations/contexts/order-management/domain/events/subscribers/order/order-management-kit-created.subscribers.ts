export abstract class OrderManagementCreatedKitOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedKitOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
