export abstract class OrderManagementGettedInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedInvoiceSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
