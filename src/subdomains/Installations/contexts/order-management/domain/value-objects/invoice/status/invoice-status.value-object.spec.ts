import { InvoiceStatusValueObject } from './';

test("Should return false because don't have errors (true version)", () => {
    // Arrange
    let valueToTest = true;

    // Act
    let invoice = new InvoiceStatusValueObject(valueToTest).hasErrors();

    // Assert
    expect(invoice).toBeFalsy();
})

test("Should return false because don't have errors (false version)", () => {
    // Arrange
    let valueToTest = false;

    // Act
    let invoice = new InvoiceStatusValueObject(valueToTest).hasErrors();

    // Assert
    expect(invoice).toBeFalsy();
})