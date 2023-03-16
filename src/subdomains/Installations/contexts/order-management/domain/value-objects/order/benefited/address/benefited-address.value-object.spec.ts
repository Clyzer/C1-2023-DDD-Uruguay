import { BenefitedAddressValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '987654321';

    // Act
    let benefited = new BenefitedAddressValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeFalsy();
})

test("Should return true because length is less or equal to 6", () => {
    // Arrange
    let valueToTest = '12345';

    // Act
    let benefited = new BenefitedAddressValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeTruthy();
})

test("Should return true because length is more or equal to 50", () => {
    // Arrange
    let valueToTest = '123456789012345678901234567890123123456789012345678901';

    // Act
    let benefited = new BenefitedAddressValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeTruthy();
})