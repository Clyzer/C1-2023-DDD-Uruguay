export abstract class OrderManagementDeletedBenefitedOrderSubscriber {
  async handle(event: any) {
    console.log('OrderManagementDeletedBenefitedOrderSubscriber', event);
    console.log('The action update process must be executed');
  }
}
