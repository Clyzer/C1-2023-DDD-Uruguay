export abstract class OrderManagementDeletedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedOrderSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
