import { useInvalidateMutation } from '../../query/use-invalidate-mutation';
import { QUERY_KEYS } from '../../query/query-keys';
import { IGetCarsProps, IGetCarsResponse, IGetCarsServerResponse } from './get-cars.types';
import { prodBaseUrl } from '../../ api/base-url';

export const useGetCarsMutation = (invalidateKeys: QUERY_KEYS[]) =>
    useInvalidateMutation({ mutationFn: getCars, invalidateKeys });

const getCars = async (props: IGetCarsProps): Promise<IGetCarsResponse> => {
    const response = await fetch(prodBaseUrl + '/get-car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(props)
    });

    const data: IGetCarsServerResponse = await response.json();

    return data.map(({ _id, drive, createdAt, mark, model, price, engine, equipmentName }) => {
        const date = new Date(String(createdAt));

        return {
            _id,
            model: mark + ' ' + model,
            price,
            engine: `${Number(engine.volume).toFixed(1)} ${engine.transmission} (${
                engine.power
            } л.с.) ${drive} ${engine.fuel}`,
            equipmentName,
            createdAt: `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth()).padStart(
                2,
                '0'
            )}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        };
    });
};
