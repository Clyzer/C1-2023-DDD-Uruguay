export abstract class OrderManagementGettedBenefitedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementGettedBenefitedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
