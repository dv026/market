import { Input } from 'antd';
import { ChangeEvent, FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { Nullable } from '../../app/types';

interface NumericInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: Nullable<number | string>;
  maxLength?: number;
}

export const NumericInput: FC<NumericInputProps> = ({ value, onChange, maxLength = 14 }) => {
  return (
    <NumericFormat
      onChange={onChange}
      value={value}
      // only numbers
      type="tel"
      // to prevent ',' typing
      decimalSeparator=".."
      thousandSeparator="."
      customInput={Input}
      maxLength={maxLength}
    />
  );
};
