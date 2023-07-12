import React, { useEffect, useState } from 'react';
import { Table, Pagination, Select, Row, Col, Typography } from 'antd';
import { convertMarksInfoResponse, convertModelResponse, mainCarTableColumns } from './main.utils';
import { MarksPicker } from './marks-picker/marks-picker.component';
import { useGetModelsMutation } from '../../domain/usecases/get-models/get-models.mutation';
import { useGetMarksInfoQuery } from '../../domain/usecases/get-marks-info/get-marks-info';
import { useGetCarsMutation } from '../../domain/usecases/get-cars/get-cars.mutation';
import { useGetPagesInfoMutation } from '../../domain/usecases/get-pages-info/get-pages-info.mutation';

const { Text } = Typography;

export const Main: React.FC = () => {
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

    return (
        <Row style={{ justifyContent: 'center', display: 'flex', padding: 30 }}>
            <Col span={14}>
                <MarksPicker
                    data={allMarksInfo ? convertMarksInfoResponse(allMarksInfo) : []}
                    onChange={data => setMarks(data)}
                />

                <div style={{ padding: '10px 0' }}>
                    <Text>Модель:</Text>
                </div>

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Выберите модель"
                    //@ts-ignore
                    onChange={value => setModels(value)}
                    disabled={!marks.length}
                    value={convertModelResponse(models)}
                    options={modelsData && convertModelResponse(modelsData)}
                />

                <Table
                    columns={mainCarTableColumns}
                    dataSource={carsData}
                    pagination={{ position: [], showQuickJumper: false }}
                    style={{ margin: '10px 0' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                        current={page}
                        total={pagesInfoData?.pages ?? 1}
                        pageSize={1}
                        showSizeChanger={false}
                        onChange={current => setPage(current)}
                    />
                </div>
            </Col>
        </Row>
    );
};
