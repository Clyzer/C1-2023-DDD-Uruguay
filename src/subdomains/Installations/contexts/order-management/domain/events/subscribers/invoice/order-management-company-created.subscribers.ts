export abstract class OrderManagementCreatedCompanyInvoiceSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedCompanyInvoiceSubscriber', event);
    console.log('The action add process must be executed');
  }
}
