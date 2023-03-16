export abstract class OrderManagementUpdatedBenefitedAddressOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedBenefitedAddressOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
