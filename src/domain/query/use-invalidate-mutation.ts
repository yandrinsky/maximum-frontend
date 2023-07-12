import { MutationFunction, useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { QUERY_KEYS } from './query-keys';

export const useInvalidateMutation = <
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>({
    mutationFn,
    options,
    invalidateKeys
}: {
    mutationFn: MutationFunction<TData, TVariables>;
    options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;
    invalidateKeys?: QUERY_KEYS[];
}) => {
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        ...options,
        onSuccess: (...params) => {
            invalidateKeys?.map(key =>
                queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] })
            );

            options?.onSuccess?.(...params);
        }
    });
};
