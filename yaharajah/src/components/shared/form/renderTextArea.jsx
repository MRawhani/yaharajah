import React from 'react'

export const RenderTextArea = ({
  input,
  label,
  type,
  rows,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className={"input-group"}>
      <textarea {...input}  type={type} className={className} />
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);
