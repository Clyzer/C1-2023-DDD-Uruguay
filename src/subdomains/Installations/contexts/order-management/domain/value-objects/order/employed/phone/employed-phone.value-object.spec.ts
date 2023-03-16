import { EmployedPhoneValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '987654321';

    // Act
    let employed = new EmployedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(employed).toBeFalsy();
})

test("Should return true because length is less or equal to 8", () => {
    // Arrange
    let valueToTest = '1234567';

    // Act
    let employed = new EmployedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(employed).toBeTruthy();
})

test("Should return true because length is more or equal to 15", () => {
    // Arrange
    let valueToTest = '1234567890123456';

    // Act
    let employed = new EmployedPhoneValueObject(valueToTest).hasErrors();

    // Assert
    expect(employed).toBeTruthy();
})