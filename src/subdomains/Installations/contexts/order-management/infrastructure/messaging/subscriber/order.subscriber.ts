import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import {
  BenefitedEntity,
  EmployedEntity,
  EventEntity,
  KitEntity,
  OrderEntity,
} from '../../persistence/entities';
import {
  BenefitedService,
  EmployedService,
  KitService,
  OrderService,
} from '../../persistence/services';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly kitService: KitService,
    private readonly employedService: EmployedService,
    private readonly benefitedService: BenefitedService
    ) {}

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
   * @memberof OrderController
   */
  @EventPattern('order_management.created_order')
  async createdOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    let object: OrderEntity = JSON.parse(JSON.stringify(data.data));
    let kit: KitEntity = await this.kitService.createKit(object.kit);
    let employed: EmployedEntity = await this.employedService.createEmployed(object.employed);
    let benefited: BenefitedEntity = await this.benefitedService.createBenefited(object.benefited);
    object.kit = kit;
    object.employed = employed;
    object.benefited = benefited;
    await this.orderService.createOrder(object);

  }

  @EventPattern('order_management.getted_order')
  gettedOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: OrderEntity = JSON.parse(JSON.stringify(data.data));
    this.orderService.getOrder(object.orderId);
  }

  @EventPattern('order_management.deleted_order')
  deletedOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: OrderEntity = JSON.parse(JSON.stringify(data.data));
    this.orderService.deleteOrder(object.orderId);
  }
}
