import React from 'react';
import { Table, Pagination, Select, Row, Col, Typography } from 'antd';
import { convertMarksInfoResponse, convertModelResponse, mainCarTableColumns } from './main.utils';
import { MarksPicker } from './marks-picker/marks-picker.component';
import { useMain } from './main.hook';

const { Text } = Typography;

export const Main: React.FC = () => {
    const {
        setPage,
        page,
        models,
        modelsData,
        carsData,
        pagesInfoData,
        marks,
        allMarksInfo,
        setMarks,
        setModels
    } = useMain();

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
