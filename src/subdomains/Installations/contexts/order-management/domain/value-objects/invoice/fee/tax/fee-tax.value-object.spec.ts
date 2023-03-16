import { FeeTaxValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = 20;

    // Act
    let fee = new FeeTaxValueObject(valueToTest).hasErrors();

    // Assert
    expect(fee).toBeFalsy();
})

test("Should return true because is less or equal to 1", () => {
    // Arrange
    let valueToTest = 0;

    // Act
    let fee = new FeeTaxValueObject(valueToTest).hasErrors();

    // Assert
    expect(fee).toBeTruthy();
})

test("Should return true because is more or equal to 999999999999", () => {
    // Arrange
    let valueToTest = 9999999999999;

    // Act
    let fee = new FeeTaxValueObject(valueToTest).hasErrors();

    // Assert
    expect(fee).toBeTruthy();
})