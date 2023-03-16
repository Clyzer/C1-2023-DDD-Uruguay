export abstract class OrderManagementUpdatedFeeTaxInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedFeeTaxInvoiceSubscriber', event);
    console.log('The action update process must be executed');
  }
}
