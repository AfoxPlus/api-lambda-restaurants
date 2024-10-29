export interface RestaurantFilter {
    types?: string[],
    coordinates: [number, number];
    maxDistance: number
}