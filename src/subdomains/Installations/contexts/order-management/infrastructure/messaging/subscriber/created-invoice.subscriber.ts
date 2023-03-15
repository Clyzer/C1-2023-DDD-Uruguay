import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { InvoiceEntity } from '../../persistence';
import { EventEntity } from '../../persistence/entities/event.entity';
import { InvoiceService } from '../../persistence/services';

@Controller()
export class CreatedInvoiceController{

    constructor(private readonly invoiceService: InvoiceService){}

    /**
     * EventPattern se utiliza para definir un patrón de evento de Kafka
     * al que el controlador responderá.
     * 
     * Payload se utiliza para extraer los datos del mensaje del evento.
     *
     * KafkaContext que se utiliza para acceder a los metadatos del contexto de Kafka.
     * 
     * En el contexto de los eventos Kafka, el término "payload"
     * se refiere a los datos contenidos en el mensaje del evento. 
     * En otras palabras, el payload es la carga útil de información 
     * que se envía en el mensaje de Kafka.
     * 
     * @param {*} data
     * @param {KafkaContext} context
     * @memberof CreatedInvoiceController
     */
    @EventPattern('order_management.created_invoice')
    createdInvoice(@Payload() data: EventEntity, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

        const object: InvoiceEntity = JSON.parse(JSON.stringify(data.data));
        this.invoiceService.createInvoice(object);

    }
}