import {
  IBenefitedDomainEntity,
  IEmployedDomainEntity,
  IKitDomainEntity,
  IOrderDomainEntity,
  OrderDomainEntityBase,
} from './';

test("Order will be defined", () => {
    // Arrange
    let kit: IKitDomainEntity = {};
    let employed: IEmployedDomainEntity = {};
    let benefited: IBenefitedDomainEntity = {};

    // Act
    let order = new OrderDomainEntityBase({ kit: kit, employed: employed, benefited: benefited });

    // Assert
    expect(order).toBeDefined();
})

test("Kit will be defined", () => {
    // Arrange
    let kit: IKitDomainEntity = {};
    let employed: IEmployedDomainEntity = {};
    let benefited: IBenefitedDomainEntity = {};

    // Act
    let order = new OrderDomainEntityBase({ kit: kit, employed: employed, benefited: benefited });

    // Assert
    expect(order.kit).toBeDefined();
})

test("Employed will be defined", () => {
    // Arrange
    let kit: IKitDomainEntity = {};
    let employed: IEmployedDomainEntity = {};
    let benefited: IBenefitedDomainEntity = {};

    // Act
    let order = new OrderDomainEntityBase({ kit: kit, employed: employed, benefited: benefited });

    // Assert
    expect(order.employed).toBeDefined();
})

test("Benefited will be defined", () => {
    // Arrange
    let kit: IKitDomainEntity = {};
    let employed: IEmployedDomainEntity = {};
    let benefited: IBenefitedDomainEntity = {};

    // Act
    let order = new OrderDomainEntityBase({ kit: kit, employed: employed, benefited: benefited });

    // Assert
    expect(order.benefited).toBeDefined();
})

test("Order will be undefined", () => {
    // Arrange
    let valueToTest: IOrderDomainEntity

    // Act
    let order = new OrderDomainEntityBase(valueToTest);

    // Assert
    expect(order.benefited).toBeUndefined();
    expect(order.kit).toBeUndefined();
})