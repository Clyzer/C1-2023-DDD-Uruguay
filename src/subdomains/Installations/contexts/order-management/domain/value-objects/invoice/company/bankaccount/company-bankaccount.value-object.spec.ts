import { CompanyBankAccountValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '987654321';

    // Act
    let company = new CompanyBankAccountValueObject(valueToTest).hasErrors();

    // Assert
    expect(company).toBeFalsy();
})

test("Should return true because length is less or equal to 5", () => {
    // Arrange
    let valueToTest = '1234';

    // Act
    let company = new CompanyBankAccountValueObject(valueToTest).hasErrors();

    // Assert
    expect(company).toBeTruthy();
})

test("Should return true because length is more or equal to 15", () => {
    // Arrange
    let valueToTest = '12345678901234567890';

    // Act
    let company = new CompanyBankAccountValueObject(valueToTest).hasErrors();

    // Assert
    expect(company).toBeTruthy();
})