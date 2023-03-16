import { BenefitedPhoneValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '987654321';

    // Act
    let benefited = new BenefitedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeFalsy();
})

test("Should return true because length is less or equal to 8", () => {
    // Arrange
    let valueToTest = '1234567';

    // Act
    let benefited = new BenefitedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeTruthy();
})

test("Should return true because length is more or equal to 15", () => {
    // Arrange
    let valueToTest = '1234567890123456';

    // Act
    let benefited = new BenefitedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(benefited).toBeTruthy();
})