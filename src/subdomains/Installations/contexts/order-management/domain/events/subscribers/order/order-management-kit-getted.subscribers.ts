export abstract class OrderManagementGettedKitOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedKitOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
