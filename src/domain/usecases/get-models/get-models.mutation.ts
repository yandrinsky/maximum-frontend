import { useInvalidateMutation } from '../../query/use-invalidate-mutation';
import { QUERY_KEYS } from '../../query/query-keys';
import { IGetModelsProps, IGetModelsResponse, IGetModelsServerResponse } from './get-models.types';
import { prodBaseUrl } from '../../ api/base-url';

export const useGetModelsMutation = (invalidateKeys: QUERY_KEYS[]) =>
    useInvalidateMutation({ mutationFn: getModels, invalidateKeys });

const getModels = async (props: IGetModelsProps): Promise<IGetModelsResponse> => {
    const response = await fetch(prodBaseUrl + '/models-aggregate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(props)
    });

    const data: IGetModelsServerResponse = await response.json();
    return data.map(el => el._id);
};
