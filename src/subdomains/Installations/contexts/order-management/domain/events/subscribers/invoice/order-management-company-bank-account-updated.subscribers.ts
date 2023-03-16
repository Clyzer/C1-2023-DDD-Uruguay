export abstract class OrderManagementUpdatedCompanyBankAccountInvoiceSubscriber {
  async handle(event: any) {
    console.log(
      'OrderManagementUpdatedCompanyBankAccountInvoiceSubscriber',
      event,
    );
    console.log('The action update process must be executed');
  }
}
