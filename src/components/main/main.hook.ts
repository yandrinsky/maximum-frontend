import { useEffect, useState } from 'react';
import { useGetModelsMutation } from '../../domain/usecases/get-models/get-models.mutation';
import { useGetCarsMutation } from '../../domain/usecases/get-cars/get-cars.mutation';
import { useGetPagesInfoMutation } from '../../domain/usecases/get-pages-info/get-pages-info.mutation';
import { useGetMarksInfoQuery } from '../../domain/usecases/get-marks-info/get-marks-info';

export const useMain = () => {
    const [models, setModels] = useState<string[]>([]);
    const [marks, setMarks] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const { mutate: mutateGetModels, data: modelsData } = useGetModelsMutation([]);
    const { mutate: mutateGetCars, data: carsData } = useGetCarsMutation([]);
    const { mutate: mutateGetPagesInfo, data: pagesInfoData } = useGetPagesInfoMutation([]);
    const { data: allMarksInfo } = useGetMarksInfoQuery();

    useEffect(() => {
        mutateGetModels({ mark: marks });

        if (!marks.length) {
            setModels([]);
        }
    }, [marks.length]);

    useEffect(() => {
        mutateGetCars({ mark: marks, model: models, page });
        mutateGetPagesInfo({ mark: marks, model: models });
    }, [marks.length, models.length, page]);

    useEffect(() => {
        setPage(1);
    }, [marks.length, models.length]);

    useEffect(() => {
        if (modelsData) {
            setModels(prevModels => prevModels.filter(model => modelsData.includes(model)));
        }
    }, [modelsData?.length]);

    return {
        allMarksInfo,
        setMarks,
        marks,
        models,
        modelsData,
        carsData,
        page,
        pagesInfoData,
        setPage,
        setModels
    };
};
