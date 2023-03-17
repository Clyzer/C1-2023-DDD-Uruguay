import { IKitDomainEntity } from '../interfaces';
import { KitDomainEntityBase } from './';

test("Model will be defined", () => {
    // Arrange
    let valueToTest: IKitDomainEntity = { model: 'hola' };

    // Act
    let kit = new KitDomainEntityBase(valueToTest);

    // Assert
    expect(kit.model).toBeDefined()
})

test("Model will be undefined", () => {
    // Arrange
    let valueToTest: IKitDomainEntity = {};

    // Act
    let kit = new KitDomainEntityBase(valueToTest);

    // Assert
    expect(kit.model).toBeUndefined()
})

test("KitId will be defined", () => {
    // Arrange
    let valueToTest: IKitDomainEntity = {};

    // Act
    let kit = new KitDomainEntityBase(valueToTest);

    // Assert
    expect(kit.kitId).toBeDefined()
})

test("CreatedAt will be defined", () => {
    // Arrange
    let valueToTest: IKitDomainEntity = {};

    // Act
    let kit = new KitDomainEntityBase(valueToTest);

    // Assert
    expect(kit.createdAt).toBeDefined()
})