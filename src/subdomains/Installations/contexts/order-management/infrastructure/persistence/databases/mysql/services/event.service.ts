import { Injectable } from '@nestjs/common';

import { EventMySqlEntity } from '../entities';
import { EventRepository } from '../repositories';

@Injectable()
export class EventMySqlService{

  constructor(private readonly eventRepository: EventRepository) {}

  createEvent(event: EventMySqlEntity): Promise<EventMySqlEntity> {
    return this.eventRepository.create(event);
  }

  getEvent(eventId: string): Promise<EventMySqlEntity> {
    return this.eventRepository.findById(eventId);
  }

  deleteEvent(eventId: string): Promise<boolean> {
    return this.eventRepository.delete(eventId);
  }
  
}
