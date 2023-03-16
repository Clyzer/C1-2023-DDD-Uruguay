import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { BenefitedEntity } from '../../../persistence';
import { EventEntity } from '../../../persistence/entities/event.entity';
import { BenefitedService } from '../../../persistence/services';

@Controller()
export class BenefitedController {
  constructor(private readonly benefitedService: BenefitedService) {}

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
   * @memberof BenefitedController
   */
  @EventPattern('order_management.order.benefited_created')
  createdBenefited(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.createBenefited(object);
  }

  @EventPattern('order_management.order.benefited_getted')
  gettedBenefited(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.getBenefited(object.benefitedId);
  }

  @EventPattern('order_management.order.benefited_deleted')
  deletedBenefited(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.deleteBenefited(object.benefitedId);
  }

  @EventPattern('order_management.order.benefited_name_updated')
  updateBenefitedName(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.updateBenefitedName(object.benefitedId, object);
  }

  @EventPattern('order_management.order.benefited_phone_updated')
  updateBenefitedPhone(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.updateBenefitedPhone(object.benefitedId, object);
  }

  @EventPattern('order_management.order.benefited_address_updated')
  updateBenefitedAddress(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.updateBenefitedAddress(object.benefitedId, object);
  }

  @EventPattern('order_management.order.benefited_companyid_updated')
  updateBenefitedCompanyId(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: BenefitedEntity = JSON.parse(JSON.stringify(data.data));
    this.benefitedService.updateBenefitedCompanyId(object.benefitedId, object);
  }
}
