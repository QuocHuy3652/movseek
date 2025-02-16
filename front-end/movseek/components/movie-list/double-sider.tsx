import React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface RangeSliderProps {
  values: number[]; // Giá trị hiện tại [min, max]
  step: number; // Bước nhảy
  min: number; // Giá trị nhỏ nhất
  max: number; // Giá trị lớn nhất
  onChange: (values: number[]) => void; // Hàm callback khi giá trị thay đổi
}

const DoubleSlider: React.FC<RangeSliderProps> = ({ values, step, min, max, onChange }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => {
          const { style, ...otherProps } = props;
          return (
            <div
              {...otherProps}
              style={{
                ...style,
                height: '6px',
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#733de4', '#ccc'],
                  min,
                  max,
                }),
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props, isDragged }) => {
          const { style, key, ...otherProps } = props;
          return (
            <div
              key={key}
              {...otherProps}
              style={{
                ...style,
                height: '16px',
                width: '16px',
                backgroundColor: isDragged ? '#733de4' : '#FFF',
                border: '2px solid #733de4',
                borderRadius: '50%',
                outline: 'none',
              }}
            />
          );
        }}
      />
      <div className="flex justify-between w-full mt-2 text-sm">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
    </div>
  );
};

export default DoubleSlider;
