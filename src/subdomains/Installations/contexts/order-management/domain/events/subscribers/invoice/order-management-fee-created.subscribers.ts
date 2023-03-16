export abstract class OrderManagementCreatedFeeInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedFeeInvoiceSubscriber', event);
    console.log('The action add process must be executed');
  }
}
