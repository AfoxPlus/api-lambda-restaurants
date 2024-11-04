import { Partner } from "@core/domain/entities/Partner";
import { PartnerRepository } from "@core/domain/repositories/PartnerRepository";
import { PartnerMongoDBDataSource } from "../sources/database/PartnerMongoDBDataSource";

export class PartnerDataRepository implements PartnerRepository {

    constructor(private dataSource: PartnerMongoDBDataSource) { }
    findByEmail = async (partnerEmail: string): Promise<Partner> => {
        return await this.dataSource.findPartnerByEmail(partnerEmail)
    }

    add = async (partner: Partner) => {
        await this.dataSource.add(partner)
    }
    fetch = async (): Promise<Partner[]> => {
        return await this.fetch()
    }
}