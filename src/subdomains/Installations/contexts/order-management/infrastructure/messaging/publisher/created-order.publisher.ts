import { lastValueFrom } from 'rxjs';

import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { IEventPublisher } from '../../../../../../../libs/sofka';
import {
  CreatedOrderEventPublisherBase,
} from '../../../domain/events/publishers';
import {
  EventEntity,
  OrderEntity,
} from '../../persistence/entities';

@Injectable()
export class CreatedOrderPublisher extends CreatedOrderEventPublisherBase {
    /**
     * ClientProxy es una clase proporcionada por
     * @nestjs/microservices que se utiliza para 
     * conectarse a un broker de mensajería 
     * (como RabbitMQ o Kafka) y enviar y recibir mensajes.
     * 
     * Creates an instance of CreateOrderPublisher.
     * @param {ClientProxy} proxy
     * @memberof CreateOrderPublisher
     */
    constructor(@Inject('ORDER_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    /**
     * El método emit en CreateOrderPublisher utiliza lastValueFrom de rxjs
     *  para enviar un mensaje al broker de mensajería utilizando el ClientProxy inyectado.
     *  El mensaje que se envía es un objeto pattern y data. pattern es una cadena
     *  que identifica el tipo de evento que se está enviando,
     *  y data es la información específica del evento que se está enviando.
     *
     * @template Result
     * @template Input
     * @param {*} pattern
     * @param {Input} data
     * @return {*}  {Promise<Result>}
     * @memberof CreateOrderPublisher
     */
    emit<Result = EventEntity, Input = OrderEntity>(
        pattern: EventEntity,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}