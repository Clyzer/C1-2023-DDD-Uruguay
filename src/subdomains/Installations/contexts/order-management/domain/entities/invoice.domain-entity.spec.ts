import {
  ICompanyDomainEntity,
  IFeeDomainEntity,
  IInvoiceDomainEntity,
  InvoiceDomainEntityBase,
} from './';

test("Invoice will be defined", () => {
      // Arrange
      let company: ICompanyDomainEntity = {};
      let fee: IFeeDomainEntity = {};
  
      // Act
      let invoice = new InvoiceDomainEntityBase({ company: company, fee: fee });
  
      // Assert
      expect(invoice).toBeDefined();
  })

test("Company will be defined", () => {
    // Arrange
    let company: ICompanyDomainEntity = {};
    let fee: IFeeDomainEntity = {};

    // Act
    let invoice = new InvoiceDomainEntityBase({ company: company, fee: fee });

    // Assert
    expect(invoice.company).toBeDefined();
})
  
test("Kit will be defined", () => {
      // Arrange
      let company: ICompanyDomainEntity = {};
      let fee: IFeeDomainEntity = {};
  
      // Act
      let invoice = new InvoiceDomainEntityBase({ company: company, fee: fee });
  
      // Assert
      expect(invoice.fee).toBeDefined();
})
  
test("Invoice will be undefined", () => {
      // Arrange
      let valueToTest: IInvoiceDomainEntity
  
      // Act
      let invoice = new InvoiceDomainEntityBase(valueToTest);
  
      // Assert
      expect(invoice.company).toBeUndefined();
      expect(invoice.fee).toBeUndefined();
})