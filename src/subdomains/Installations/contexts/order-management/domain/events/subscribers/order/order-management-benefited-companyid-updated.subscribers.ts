export abstract class OrderManagementUpdatedBenefitedCompanyIdOrderSubscriber {
  async handle(event: any) {
    console.log(
      'OrderManagementUpdatedBenefitedCompanyIdOrderSubscriber',
      event,
    );
    console.log('The action update process must be executed');
  }
}
