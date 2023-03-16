import { EmployedIdValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '5081ca07-34aa-46e1-8133-49ea6fe97c13';

    // Act
    let employed = new EmployedIdValueObject(valueToTest).hasErrors();

    // Assert
    expect(employed).toBeFalsy();
})

test("Should return true because don't is a UUID", () => {
    // Arrange
    let valueToTest = '1234';

    // Act
    let employed = new EmployedIdValueObject(valueToTest).hasErrors();

    // Assert
    expect(employed).toBeTruthy();
})