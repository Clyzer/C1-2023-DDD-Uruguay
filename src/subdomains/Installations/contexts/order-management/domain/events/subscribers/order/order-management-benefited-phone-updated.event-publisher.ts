export abstract class OrderManagementUpdatedBenefitedPhoneNameOrderSubscriber {
  async handle(event: any) {
    console.log(
      'OrderManagementUpdatedBenefitedPhoneNameOrderSubscriber',
      event,
    );
    console.log('The action update process must be executed');
  }
}
