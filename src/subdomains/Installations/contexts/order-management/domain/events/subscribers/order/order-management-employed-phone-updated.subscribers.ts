export abstract class OrderManagementUpdatedEmployedPhoneNameOrderSubscriber {
  async handle(event: any) {
    console.log(
      'OrderManagementUpdatedEmployedPhoneNameOrderSubscriber',
      event,
    );
    console.log('The action update process must be executed');
  }
}
