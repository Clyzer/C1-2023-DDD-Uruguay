export abstract class OrderManagementDeletedInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedInvoiceSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
