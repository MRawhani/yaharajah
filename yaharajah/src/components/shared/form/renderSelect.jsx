import React from 'react'

export const RenderSelect = ({
  input,
  label,
    options,
  className,
  meta: { touched, error, warning }
}) => {
   const renderOptions=()=>{
       return options.map((option,i)=>{
           return <option key={i} value={option.value}>{option.text}</option>
       })
    }
    return(
        <div className="form-group">
    <label>{label}</label>
    <div className={"input-group"}>
      <select {...input} className={className} >
          {renderOptions()}
          </select>
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
    )
};
