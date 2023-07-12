import { useInvalidateMutation } from '../../query/use-invalidate-mutation';
import { QUERY_KEYS } from '../../query/query-keys';
import {
    IGetPagesInfoServerResponse,
    IGetPagesInfoProps,
    IGetPagesInfoResponse
} from './get-pages-info.types';

export const useGetPagesInfoMutation = (invalidateKeys: QUERY_KEYS[]) =>
    useInvalidateMutation({ mutationFn: getPages, invalidateKeys });

const getPages = async (props: IGetPagesInfoProps): Promise<IGetPagesInfoResponse> => {
    const response = await fetch('http://127.0.0.1:3001/pages-aggregate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(props)
    });

    const data: IGetPagesInfoServerResponse = await response.json();
    return data;
};
