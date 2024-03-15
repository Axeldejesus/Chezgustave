// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import style from './rangeSlider.module.css';

// eslint-disable-next-line react/prop-types
const RangeSlider = ({ min, max, step, onChange }) => {
    const [values, setValues] = useState({ min: min, max: max });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevState => {
            if (name === 'min' && parseInt(value) > parseInt(prevState.max)) {
                return { min: parseInt(value), max: parseInt(value) };
            }
            if (name === 'max' && parseInt(value) < parseInt(prevState.min)) {
                return { min: parseInt(value), max: parseInt(value) };
            }
            return { ...prevState, [name]: value };
        });
        onChange(values);
    };

    return (
        <div className={style.rangeSlider}>
            <div className={style.columunSlider}>
                <span>Minimum</span>
                <input
                    label="Minimum"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={values.min}
                    onChange={handleChange}
                    className={style.min}
                    name="min"
                />
            </div>
            <div className={style.columunSlider}>
            <span>Maximum</span>
              <input
                  label="Maximum"
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={values.max}
                  onChange={handleChange}
                  className={style.max}
                  name="max"
              />
            </div>
        </div>
    );
};

export default RangeSlider;
