export abstract class OrderManagementUpdatedBenefitedNameOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementUpdatedBenefitedNameOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
