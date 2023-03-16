export abstract class OrderManagementUpdatedEmployedNameOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedEmployedNameOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
