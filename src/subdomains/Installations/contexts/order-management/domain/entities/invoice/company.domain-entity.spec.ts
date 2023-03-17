import { ICompanyDomainEntity } from '../interfaces';
import { CompanyDomainEntityBase } from './';

test("Name will be defined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = { name: 'grandcompany' };

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.name).toBeDefined()
})

test("Name will be undefined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = {};

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.name).toBeUndefined()
})

test("BankAccount will be defined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = { bankAccount: 'grandcompanyaccount' };

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.bankAccount).toBeDefined()
})

test("BankAccount will be undefined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = {};

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.bankAccount).toBeUndefined()
})

test("CompanyId will be defined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = {};

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.companyId).toBeDefined()
})

test("CreatedAt will be defined", () => {
    // Arrange
    let valueToTest: ICompanyDomainEntity = {};

    // Act
    let company = new CompanyDomainEntityBase(valueToTest);

    // Assert
    expect(company.createdAt).toBeDefined()
})