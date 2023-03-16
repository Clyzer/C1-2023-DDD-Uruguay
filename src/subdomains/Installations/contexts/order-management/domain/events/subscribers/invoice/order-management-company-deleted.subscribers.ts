export abstract class OrderManagementDeletedCompanyInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedCompanyInvoiceSubscriber', event);
    console.log('The action add process must be executed');
  }
}
