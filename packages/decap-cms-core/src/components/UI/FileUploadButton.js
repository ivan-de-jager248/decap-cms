import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'decap-cms-ui-default';

export function FileUploadButton({ label, imagesOnly, onChange, disabled, className }) {
  return (
    <label tabIndex={'0'} className={`nc-fileUploadButton ${className || ''}`}>
      <span className="button-text">{label}</span>
      <Icon type="add" size="small" className="button-icon" />
      <input
        type="file"
        accept={imagesOnly ? 'image/*' : '*/*'}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
}

FileUploadButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  imagesOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
