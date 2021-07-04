import React from 'react';
import PropTypes from 'prop-types';
import './form-error.css';

function FormError({errorText}) {
  return (
    <div className="form-error">
      {errorText}
    </div>
  );
}

FormError.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default FormError;
