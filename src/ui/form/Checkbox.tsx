import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Checkbox } from 'nav-frontend-skjema';

interface Props {
    control: Control;
    name: string;
    label: string;
}

const ControlledCheckbox = ({ control, name, label }: Props): JSX.Element => (
    <Controller
        control={control}
        defaultValue={false}
        name={name}
        render={({ field: { onChange, value, ref } }) => {
            return <Checkbox label={label} onChange={onChange} ref={ref} checked={value} />;
        }}
    />
);

export default ControlledCheckbox;
