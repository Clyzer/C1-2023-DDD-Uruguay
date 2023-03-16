export abstract class OrderManagementDeletedFeeInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedFeeInvoiceSubscriber', event);
    console.log('The action add process must be executed');
  }
}
