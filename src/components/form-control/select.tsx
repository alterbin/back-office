import React from 'react';

interface IProps extends React.HTMLProps<HTMLSelectElement> {
  disabledValue?: string;
  altOptionLabel?: string;
  containerClassName?: string;
  optionLabel?: string;
  optionValue?: string;
  error?: string;
  htmlFor?: string;
  options?: any[];
}

export const Select = (props: IProps) => {
  const {
    label,
    htmlFor,
    name = '',
    value,
    onBlur,
    onChange,
    disabledValue,
    className,
    containerClassName = '',
    options,
    altOptionLabel = '',
    error,
    optionLabel,
    optionValue,
    style,
    disabled,
  } = props;

  return (
    <div className={`form-group w-100 ${containerClassName}`}>
      {!!label && <label className={error ? 'text-danger' : ''} htmlFor={htmlFor}>{label}</label>}

      <select
        value={value}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        style={style}
        disabled={disabled}
        className={`form-select app_select ${className || ''} ${error ? 'border-danger' : ''}`}
      >
        {!!disabledValue && (
          <option disabled value="">
            {disabledValue || 'Choose...'}
          </option>
        )}

        {options
          && options.map((item: any, index: number) => {
            const setValue = optionValue ? item[optionValue] : item;
            let setLabel = optionLabel ? item[optionLabel] || item[altOptionLabel] : item;

            if (typeof setLabel === 'object') {
              setLabel = JSON.stringify(item);
            } else if (Array.isArray && Array.isArray(setLabel)) {
              setLabel = JSON.stringify(item);
            }

            return (
              <option value={setValue} key={JSON.stringify(item) + index}>
                {setLabel}
              </option>
            );
          })}
      </select>

      {!!error && (
        <p className="text-danger">{error}</p>
      )}
    </div>
  );
};
