export abstract class OrderManagementCreatedInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedInvoiceSubscriber', event);
    console.log('The action registration process must be executed');
  }
}
