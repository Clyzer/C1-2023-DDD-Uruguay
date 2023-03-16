export abstract class OrderManagementUpdatedFeeChargeInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedFeeChargeInvoiceSubscriber', event);
    console.log('The action update process must be executed');
  }
}
