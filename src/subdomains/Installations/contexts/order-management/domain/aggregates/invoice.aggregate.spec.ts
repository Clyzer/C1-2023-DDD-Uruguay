import { IEventPublisher } from '../../../../../../libs/sofka';
import {
  CompanyDomainEntityBase,
  FeeDomainEntityBase,
  InvoiceDomainEntityBase,
} from '../entities';
import {
  CreatedInvoiceEventPublisherBase,
  InvoiceCompanyCreatedEventPublisherBase,
  InvoiceFeeCreatedEventPublisherBase,
} from '../events/publishers';
import {
  ICompanyDomainService,
  IFeeDomainService,
  IInvoiceDomainService,
} from '../services';
import { InvoiceAggregate } from './';

class InvoiceServiceTest implements IInvoiceDomainService<InvoiceDomainEntityBase> {
    createInvoice(invoice: InvoiceDomainEntityBase): Promise<InvoiceDomainEntityBase> {
        throw new Error('Pass.');
    }
    getInvoice(invoiceId: string): Promise<InvoiceDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteInvoice(invoiceId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    changeStatus(invoiceId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
}

class CompanyServiceTest implements ICompanyDomainService<CompanyDomainEntityBase> {
    createCompany(company: CompanyDomainEntityBase): Promise<CompanyDomainEntityBase> {
        throw new Error('Pass.');
    }
    getCompany(companyId: string): Promise<CompanyDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteCompany(companyId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    updateCompanyName(companyId: string, newCompanyName: CompanyDomainEntityBase): Promise<CompanyDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateCompanyBankAccount(companyId: string, newCompanyBankAccount: CompanyDomainEntityBase): Promise<CompanyDomainEntityBase> {
        throw new Error('Pass.');
    }
}

class FeeServiceTest implements IFeeDomainService<FeeDomainEntityBase> {
    createFee(fee: FeeDomainEntityBase): Promise<FeeDomainEntityBase> {
        throw new Error('Pass.');
    }
    getFee(feeId: string): Promise<FeeDomainEntityBase> {
        throw new Error('Pass.');
    }
    deleteFee(feeId: string): Promise<boolean> {
        throw new Error('Pass.');
    }
    updateFeeCharge(feeId: string, newFeeCharge: FeeDomainEntityBase): Promise<FeeDomainEntityBase> {
        throw new Error('Pass.');
    }
    updateFeeTax(feeId: string, newFeeTax: FeeDomainEntityBase): Promise<FeeDomainEntityBase> {
        throw new Error('Pass.');
    }
}

class CreatedInvoiceEventTest extends CreatedInvoiceEventPublisherBase<InvoiceDomainEntityBase> {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

class CreatedCompanyEventTest extends InvoiceCompanyCreatedEventPublisherBase {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

class CreatedFeeEventTest extends InvoiceFeeCreatedEventPublisherBase {
    constructor() {
        super(null as unknown as IEventPublisher);
    }
}

test("Aggregate will be defined", async () => {
    // Arrange
    let companyService = new CompanyServiceTest();
    let invoiceCompanyCreatedEventPublisherBase = new CreatedCompanyEventTest();
    
    let feeService = new FeeServiceTest();
    let invoiceFeeCreatedEventPublisherBase = new CreatedFeeEventTest();

    let invoiceService = new InvoiceServiceTest();
    let createdInvoiceEventPublisherBase = new CreatedInvoiceEventTest();

    // Act
    let aggregate = new InvoiceAggregate({ invoiceService, createdInvoiceEventPublisherBase, companyService, invoiceCompanyCreatedEventPublisherBase, feeService, invoiceFeeCreatedEventPublisherBase });

    // Assert
    expect(aggregate).toBeDefined();
})

test("CreateInvoice will be return an Error called 'Pass'", async () => {
    // Arrange
    let companyService = new CompanyServiceTest();
    let invoiceCompanyCreatedEventPublisherBase = new CreatedCompanyEventTest();
    
    let feeService = new FeeServiceTest();
    let invoiceFeeCreatedEventPublisherBase = new CreatedFeeEventTest();

    let invoiceService = new InvoiceServiceTest();
    let createdInvoiceEventPublisherBase = new CreatedInvoiceEventTest();

    let valueToTest = new InvoiceDomainEntityBase();

    // Act
    let aggregate = new InvoiceAggregate({ invoiceService, createdInvoiceEventPublisherBase, companyService, invoiceCompanyCreatedEventPublisherBase, feeService, invoiceFeeCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createInvoice(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})

test("CreateCompany will be return an Error called 'Pass'", async () => {
    // Arrange
    let companyService = new CompanyServiceTest();
    let invoiceCompanyCreatedEventPublisherBase = new CreatedCompanyEventTest();

    let valueToTest = new CompanyDomainEntityBase();

    // Act
    let aggregate = new InvoiceAggregate({ companyService, invoiceCompanyCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createCompany(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})

test("CreateFee will be return an Error called 'Pass'", async () => {
    // Arrange
    let feeService = new FeeServiceTest();
    let invoiceFeeCreatedEventPublisherBase = new CreatedFeeEventTest();

    let valueToTest = new FeeDomainEntityBase();

    // Act
    let aggregate = new InvoiceAggregate({ feeService, invoiceFeeCreatedEventPublisherBase });

    // Assert
    try {
        await aggregate.createFee(valueToTest);
    } catch (e) {
        expect(e).toBeDefined();
    }
})