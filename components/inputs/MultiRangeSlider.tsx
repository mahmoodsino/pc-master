import { useRef } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;

const Range = createSliderWithTooltip(Slider.Range);

interface Props {
  lower?: number;
  higher?: number;
  handleChange: (value: number[]) => void;
  from:number,
  to:number
}

const MultiRangeSlider = ({ lower, higher, handleChange,from,to }: Props) => {
  const ref = useRef(null);


  return (
      <Range
        min={lower}
        max={higher}
        allowCross={true}
        value={[from, to]}
        defaultValue={[from, to]}
        tipFormatter={(value: number) => `${value} `}
        ref={ref}
        trackStyle={[
          { backgroundColor: '#373737', height: '4px', marginTop: '3px' },
        ]}
        handleStyle={[
          {
            backgroundColor: '#373737',
            width: '20px',
            height: '20px',
            border: 'none',
          },
        ]}
        onChange={(value: number[]) => handleChange(value)}
      />
  );
};

export default MultiRangeSlider;