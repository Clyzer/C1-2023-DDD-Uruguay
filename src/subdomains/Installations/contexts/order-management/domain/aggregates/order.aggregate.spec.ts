import { IEventPublisher } from '../../../../../../libs/sofka';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
  OrderDomainEntityBase,
} from '../entities';
import {
  CreatedOrderEventPublisherBase,
  OrderBenefitedCreatedEventPublisherBase,
  OrderEmployedCreatedEventPublisherBase,
  OrderKitCreatedEventPublisherBase,
} from '../events/publishers';
import {
  IBenefitedDomainService,
  IEmployedDomainService,
  IKitDomainService,
  IOrderDomainService,
} from '../services';
import { OrderAggregate } from './';

class OrderServiceTest implements IOrderDomainService<OrderDomainEntityBase> {
    createOrder(order: OrderDomainEntityBase): Promise<OrderDomainEntityBase> {
        throw new Error('Pass.');
    }
    getOrder(orderId: string): Promise<OrderDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteOrder(orderId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    changeStatus(orderId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
}

class BenefitedServiceTest implements IBenefitedDomainService<BenefitedDomainEntityBase> {
    createBenefited(benefited: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
    getBenefited(benefitedId: string): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteBenefited(benefitedId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    updateBenefitedAddress(benefitedId: string, newBenefitedAddress: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateBenefitedCompanyId(benefitedId: string, newBenefitedCompanyId: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateBenefitedName(benefitedId: string, newBenefitedName: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateBenefitedPhone(benefitedId: string, newBenefitedPhone: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
        throw new Error('Pass.');
    }
}

class EmployedServiceTest implements IEmployedDomainService<EmployedDomainEntityBase> {
    createEmployed(employed: EmployedDomainEntityBase): Promise<EmployedDomainEntityBase> {
        throw new Error('Pass.');
    }
    getEmployed(employedId: string): Promise<EmployedDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteEmployed(employedId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    updateEmployedName(employedId: string, newEmployedName: EmployedDomainEntityBase): Promise<EmployedDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateEmployedPhone(employedId: string, newEmployedPhone: EmployedDomainEntityBase): Promise<EmployedDomainEntityBase> {
        throw new Error('Pass.');
    }

}

class KitServiceTest implements IKitDomainService<KitDomainEntityBase> {
    createKit(kit: KitDomainEntityBase): Promise<KitDomainEntityBase> {
        throw new Error('Pass.');
    }
    getKit(kitId: string): Promise<KitDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteKit(kitId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    updateKitModel(kitId: string, newKitModel: KitDomainEntityBase): Promise<KitDomainEntityBase> {
        throw new Error('Pass.');
    }

}

class CreatedOrderEventTest extends CreatedOrderEventPublisherBase<OrderDomainEntityBase> {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

class CreatedBenefitedEventTest extends OrderBenefitedCreatedEventPublisherBase {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

class CreatedEmployedEventTest extends OrderEmployedCreatedEventPublisherBase {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

class CreatedKitEventTest extends OrderKitCreatedEventPublisherBase {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

test("Aggregate will be defined", async () => {
    // Arrange
    let benefitedService = new BenefitedServiceTest();
    let orderBenefitedCreatedEventPublisherBase = new CreatedBenefitedEventTest();
    
    let employedService = new EmployedServiceTest();
    let orderEmployedCreatedEventPublisherBase = new CreatedEmployedEventTest();

    let orderService = new OrderServiceTest();
    let createdOrderEventPublisherBase = new CreatedOrderEventTest();

    // Act
    let aggregate = new OrderAggregate({ orderService, createdOrderEventPublisherBase, benefitedService, orderBenefitedCreatedEventPublisherBase, employedService, orderEmployedCreatedEventPublisherBase });

    // Assert
    expect(aggregate).toBeDefined();
})

test("CreateOrder will be return an Error called 'Pass'", async () => {
    // Arrange
    let benefitedService = new BenefitedServiceTest();
    let orderBenefitedCreatedEventPublisherBase = new CreatedBenefitedEventTest();
    
    let employedService = new EmployedServiceTest();
    let orderEmployedCreatedEventPublisherBase = new CreatedEmployedEventTest();

    let orderService = new OrderServiceTest();
    let createdOrderEventPublisherBase = new CreatedOrderEventTest();

    let valueToTest = new OrderDomainEntityBase();

    // Act
    let aggregate = new OrderAggregate({ orderService, createdOrderEventPublisherBase, benefitedService, orderBenefitedCreatedEventPublisherBase, employedService, orderEmployedCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createOrder(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})

test("CreateBenefited will be return an Error called 'Pass'", async () => {
    // Arrange
    let benefitedService = new BenefitedServiceTest();
    let orderBenefitedCreatedEventPublisherBase = new CreatedBenefitedEventTest();

    let valueToTest = new BenefitedDomainEntityBase();

    // Act
    let aggregate = new OrderAggregate({ benefitedService, orderBenefitedCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createBenefited(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})

test("CreateEmployed will be return an Error called 'Pass'", async () => {
    // Arrange
    let employedService = new EmployedServiceTest();
    let orderEmployedCreatedEventPublisherBase = new CreatedEmployedEventTest();

    let valueToTest = new EmployedDomainEntityBase();

    // Act
    let aggregate = new OrderAggregate({ employedService, orderEmployedCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createEmployed(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})

test("CreateKit will be return an Error called 'Pass'", async () => {
    // Arrange
    let kitService = new KitServiceTest();
    let orderKitCreatedEventPublisherBase = new CreatedKitEventTest();

    let valueToTest = new KitDomainEntityBase();

    // Act
    let aggregate = new OrderAggregate({ kitService, orderKitCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createKit(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})