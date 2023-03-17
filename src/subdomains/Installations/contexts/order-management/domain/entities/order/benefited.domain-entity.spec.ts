import { IBenefitedDomainEntity } from '../interfaces';
import { BenefitedDomainEntityBase } from './';

test("Name will be defined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = { name: 'hola' };

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.name).toBeDefined()
})

test("Name will be undefined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = {};

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.name).toBeUndefined()
})

test("Phone will be defined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = { phone: 'hola' };

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.phone).toBeDefined()
})

test("Phone will be undefined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = {};

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.phone).toBeUndefined()
})

test("Address will be defined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = { address: 'hola' };

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.address).toBeDefined()
})

test("Address will be undefined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = {};

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.address).toBeUndefined()
})

test("BenefitedId will be defined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = {};

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.benefitedId).toBeDefined()
})

test("CreatedAt will be defined", () => {
    // Arrange
    let valueToTest: IBenefitedDomainEntity = {};

    // Act
    let benefited = new BenefitedDomainEntityBase(valueToTest);

    // Assert
    expect(benefited.createdAt).toBeDefined()
})