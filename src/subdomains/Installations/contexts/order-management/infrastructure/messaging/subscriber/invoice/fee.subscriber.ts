import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { FeeEntity } from '../../../persistence';
import { EventEntity } from '../../../persistence/entities/event.entity';
import { FeeService } from '../../../persistence/services';

@Controller()
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

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
   * @memberof FeeController
   */
  @EventPattern('order_management.invoice.fee_created')
  createdFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: FeeEntity = JSON.parse(JSON.stringify(data.data));
    this.feeService.createFee(object);
  }

  @EventPattern('order_management.invoice.fee_getted')
  gettedFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: FeeEntity = JSON.parse(JSON.stringify(data.data));
    this.feeService.getFee(object.feeId);
  }

  @EventPattern('order_management.invoice.fee_deleted')
  deletedFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: FeeEntity = JSON.parse(JSON.stringify(data.data));
    this.feeService.deleteFee(object.feeId);
  }

  @EventPattern('order_management.invoice.fee_charge_updated')
  updateFeeCharge(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: FeeEntity = JSON.parse(JSON.stringify(data.data));
    this.feeService.updateFeeCharge(object.feeId, object);
  }

  @EventPattern('order_management.invoice.fee_tax_updated')
  updateFeeTax(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: FeeEntity = JSON.parse(JSON.stringify(data.data));
    this.feeService.updateFeeTax(object.feeId, object);
  }
}
