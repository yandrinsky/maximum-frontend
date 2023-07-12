import { IGetMarksInfoResponse, IGetMarksInfoServerResponse } from './get-marks-info.types';
import { useQuery } from 'react-query';

export const useGetMarksInfoQuery = () => useQuery(['/marks-aggregate'], getMarksInfo);

const getMarksInfo = async (): Promise<IGetMarksInfoResponse> => {
    const response = await fetch('http://127.0.0.1:3001/marks-aggregate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    const data: IGetMarksInfoServerResponse = await response.json();

    return data.map(el => ({ model: el._id, count: Number(el.count) }));
};
