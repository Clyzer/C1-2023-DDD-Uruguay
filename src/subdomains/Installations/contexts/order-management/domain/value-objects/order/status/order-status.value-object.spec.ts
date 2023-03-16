import { OrderStatusValueObject } from './';

test("Should return false because don't have errors (true version)", () => {
    // Arrange
    let valueToTest = true;

    // Act
    let order = new OrderStatusValueObject(valueToTest).hasErrors();

    // Assert
    expect(order).toBeFalsy();
})

test("Should return false because don't have errors (false version)", () => {
    // Arrange
    let valueToTest = false;

    // Act
    let order = new OrderStatusValueObject(valueToTest).hasErrors();

    // Assert
    expect(order).toBeFalsy();
})