export abstract class OrderManagementUpdatedCompanyNameInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedCompanyNameInvoiceSubscriber', event);
    console.log('The action update process must be executed');
  }
}
