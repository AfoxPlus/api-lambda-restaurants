import { Message } from "@core/domain/entities/Message";
import { MessageModel } from "./models/message.model";

export class MessageMongoDBDataSource {
    async createMessage(data: Message): Promise<boolean> {
        await MessageModel.create(data)
        return true
    }

    async getMessages(): Promise<Message[]> {
        return await MessageModel.find();
    }
}