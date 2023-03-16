export abstract class OrderManagementUpdatedKitModelOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedKitModelOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
