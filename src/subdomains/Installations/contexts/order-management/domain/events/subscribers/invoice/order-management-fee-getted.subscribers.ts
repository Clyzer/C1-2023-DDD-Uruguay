export abstract class OrderManagementGettedFeeInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedFeeInvoiceSubscriber', event);
    console.log('The action add process must be executed');
  }
}
