export interface IGetCarsProps {
    mark: string[];
    model: string[];
    page?: number;
}

export type IGetCarsResponse = {
    _id: string;
    model: string;
    engine: string;
    equipmentName: string;
    price: string;
    createdAt: string;
}[];

export type IGetCarsServerResponse = {
    _id: string;
    mark: string;
    model: string;
    engine: {
        power: string;
        volume: string;
        transmission: string;
        fuel: string;
    };
    drive: string;
    equipmentName: string;
    price: string;
    createdAt: Date;
}[];
