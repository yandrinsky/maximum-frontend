import React, { useState } from 'react';
import { Row, Typography } from 'antd';

export interface IModelsPickerComponent {
    data: { label: { title: string; info: string }; value: string }[];
    onChange: (data: string[]) => void;
    defaultChecked?: string[];
}

const { Text } = Typography;

export const MarksPicker: React.FC<IModelsPickerComponent> = ({ data, defaultChecked = [], onChange }) => {
    const [checkedValue, setCheckedValue] = useState<string[]>(defaultChecked);

    return (
        <Row>
            {data.map(({ label: { title, info }, value }) => (
                <React.Fragment key={value}>
                    <Text
                        style={{
                            marginRight: 10,
                            cursor: 'Pointer',
                            color: checkedValue.includes(value) ? '#4096ff' : ''
                        }}
                        onClick={() => {
                            setCheckedValue(prev => {
                                console.log('click');
                                let newChecked: string[];

                                if (checkedValue.includes(value)) {
                                    newChecked = prev.filter(el => el !== value);
                                } else {
                                    newChecked = [...prev, value];
                                }

                                onChange?.(newChecked);

                                console.log('newChecked', newChecked);

                                return newChecked;
                            });
                        }}
                    >
                        {title}
                    </Text>
                    <Text type="secondary" style={{ marginRight: 10 }}>
                        {info}
                    </Text>
                </React.Fragment>
            ))}
        </Row>
    );
};
