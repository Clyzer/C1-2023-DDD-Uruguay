export abstract class OrderManagementGettedCompanyInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedCompanyInvoiceSubscriber', event);
    console.log('The action update process must be executed');
  }
}
