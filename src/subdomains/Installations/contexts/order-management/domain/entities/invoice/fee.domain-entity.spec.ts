import { IFeeDomainEntity } from '../interfaces';
import { FeeDomainEntityBase } from './';

test("Tax will be defined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = { tax: 5 };

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.tax).toBeDefined()
})

test("Tax will be undefined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = {};

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.tax).toBeUndefined()
})

test("Charge will be defined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = { charge: 5 };

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.charge).toBeDefined()
})

test("Charge will be undefined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = {};

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.charge).toBeUndefined()
})

test("FeeId will be defined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = {};

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.feeId).toBeDefined()
})

test("CreatedAt will be defined", () => {
    // Arrange
    let valueToTest: IFeeDomainEntity = {};

    // Act
    let fee = new FeeDomainEntityBase(valueToTest);

    // Assert
    expect(fee.createdAt).toBeDefined()
})