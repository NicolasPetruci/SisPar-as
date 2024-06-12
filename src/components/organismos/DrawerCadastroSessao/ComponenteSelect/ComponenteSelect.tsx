import { Select } from '@chakra-ui/react';
import React from 'react';

interface CustomSelectProps {
    value: string | { label: string; value: number } | null;
    onChange: (selectedValue: string | { label: string; value: number } | null) => void;
    options: { id: number; nome: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
    };

    return (
        <Select value={typeof value === 'string' ? value : value?.label || ''} onChange={handleChange}>
            {options.map(option => (
                <option key={option.id} value={option.nome}>
                    {option.nome}
                </option>
            ))}
        </Select>
    );
};

export default CustomSelect;