import { Partner } from "@core/domain/entities/Partner";
import { PartnerDocument, PartnerModel } from "./models/partner.model";

export class PartnerMongoDBDataSource {
    async add(data: Partner): Promise<boolean> {
        const document = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            restaurants: [data.restaurants.map(item => item.code)]
        }
        await PartnerModel.create(document)
        return true
    }

    async get(): Promise<Partner[]> {
        return await PartnerModel.find();
    }

    async findPartnerByEmail(email: string): Promise<Partner> {
        try {
            const partnerDocument: PartnerDocument = await PartnerModel.findOne({ email }).exec();
            if (partnerDocument !== null) {
                const partner: Partner = {
                    name: partnerDocument.name,
                    email: partnerDocument.email,
                    phone: partnerDocument.phone,
                    restaurants: []
                }
                return partner;
            } else return null
        } catch (error) {
            throw new Error('Error al buscar partner');
        }
    }
}