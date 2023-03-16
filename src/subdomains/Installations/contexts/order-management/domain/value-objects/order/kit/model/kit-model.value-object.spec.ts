import { KitModelValueObject } from './';

test("Should return false because don't have errors", () => {
    // Arrange
    let valueToTest = '987654321';

    // Act
    let kit = new KitModelValueObject(valueToTest).hasErrors();

    // Assert
    expect(kit).toBeFalsy();
})

test("Should return true because length is less or equal to 2", () => {
    // Arrange
    let valueToTest = '2';

    // Act
    let kit = new KitModelValueObject(valueToTest).hasErrors();

    // Assert
    expect(kit).toBeTruthy();
})

test("Should return true because length is more or equal to 10", () => {
    // Arrange
    let valueToTest = '12345678901';

    // Act
    let kit = new KitModelValueObject(valueToTest).hasErrors();

    // Assert
    expect(kit).toBeTruthy();
})