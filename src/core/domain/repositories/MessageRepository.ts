import { Message } from "@core/domain/entities/Message"

export interface MessageRepository {
    add(message: Message)
    fetch(): Promise<Message[]>
}