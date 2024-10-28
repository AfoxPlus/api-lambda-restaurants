import { Message } from "@core/domain/entities/Message";
import { MessageRepository } from "@core/domain/repositories/MessageRepository";
import { MessageMongoDBDataSource } from "../sources/database/MessageMongoDBDataSource";

export class MessageDataRepository implements MessageRepository {

    constructor(private dataSource: MessageMongoDBDataSource) { }

    add = async (message: Message) => {
        this.dataSource.createMessage(message)
    }
    fetch = async (): Promise<Message[]> => {
        return await this.fetch()
    }
}