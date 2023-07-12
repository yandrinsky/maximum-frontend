import { IGetModelsResponse } from '../../domain/usecases/get-models/get-models.types';
import { IGetMarksInfoResponse } from '../../domain/usecases/get-marks-info/get-marks-info.types';

export const mainCarTableColumns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: 'Марка/Модель',
        dataIndex: 'model',
        key: 'model'
    },
    {
        title: 'Модификация',
        dataIndex: 'engine',
        key: 'engine'
    },
    {
        title: 'Комлпектация',
        dataIndex: 'equipmentName',
        key: 'equipmentName'
    },
    {
        title: 'Стоимость',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdAt',
        key: 'createdAt'
    }
];

type TConvertModelResponse = (models: IGetModelsResponse) => { value: string; label: string }[];

export const convertModelResponse: TConvertModelResponse = models => {
    return models
        .map(el =>
            el
                ? {
                      label: el,
                      value: el
                  }
                : null
        )
        .filter(el => el) as { value: string; label: string }[];
};

export const convertMarksInfoResponse = (marks: IGetMarksInfoResponse) => {
    return marks.map(el => ({
        label: { title: el.model, info: String(el.count) },
        value: el.model
    }));
};
