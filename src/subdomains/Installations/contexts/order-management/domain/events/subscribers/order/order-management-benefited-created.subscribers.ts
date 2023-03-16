export abstract class OrderManagementCreatedBenefitedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementCreatedBenefitedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
