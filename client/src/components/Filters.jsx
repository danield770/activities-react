import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
function Filters({ filters, currentFilter, changeFilter }) {
  const [value, setValue] = React.useState(currentFilter);
  return (
    <>
      <div>Filter by:</div>
      <ol className='filters'>
        <li className='filter' key='all' onClick={() => changeFilter('all')}>
          <input
            type='radio'
            name='radio-filter'
            id='radio-all'
            value='all'
            checked={value === 'all'}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />

          <label htmlFor='radio-all'>
            {' '}
            {value === 'all' && (
              <BsCheckCircleFill size='20' className='icon-visual' />
            )}{' '}
            All Work
          </label>
        </li>
        {Object.keys(filters).map((filter) => (
          <li
            key={filter}
            className='filter'
            onClick={() => changeFilter(filter)}
          >
            <input
              type='radio'
              name='radio-filter'
              id={`radio-${filter}`}
              value={filter}
              checked={value === filter}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <label htmlFor={`radio-${filter}`}>
              {value === filter && (
                <BsCheckCircleFill size='20' className='icon-visual' />
              )}
              {/* eslint-disable-next-line react/prop-types */}
              {filters[filter]?.name}
            </label>
          </li>
        ))}
      </ol>
    </>
  );
}
export default Filters;
