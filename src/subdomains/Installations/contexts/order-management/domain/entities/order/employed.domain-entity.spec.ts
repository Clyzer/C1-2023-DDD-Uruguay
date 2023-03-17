import { IEmployedDomainEntity } from '../interfaces';
import { EmployedDomainEntityBase } from './';

test("Name will be defined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = { name: 'hola' };

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.name).toBeDefined()
})

test("Name will be undefined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = {};

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.name).toBeUndefined()
})

test("Phone will be defined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = { phone: 'hola' };

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.phone).toBeDefined()
})

test("Phone will be undefined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = {};

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.phone).toBeUndefined()
})

test("EmployedId will be defined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = {};

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.employedId).toBeDefined()
})

test("CreatedAt will be defined", () => {
    // Arrange
    let valueToTest: IEmployedDomainEntity = {};

    // Act
    let employed = new EmployedDomainEntityBase(valueToTest);

    // Assert
    expect(employed.createdAt).toBeDefined()
})