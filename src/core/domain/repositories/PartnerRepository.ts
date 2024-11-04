import { Partner } from "@core/domain/entities/Partner"

export interface PartnerRepository {
    add(partner: Partner)
    fetch(): Promise<Partner[]>
    findByEmail(partnerEmail: string): Promise<Partner>
}