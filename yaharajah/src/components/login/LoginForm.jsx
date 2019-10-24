import React from "react";
import { Field, reduxForm } from "redux-form";
import { RenderInput } from "./../shared/form/renderInput";
import { minLength4,required } from "./../shared/form/Validators";
import { ResError } from "./../shared/form/ResError";
const LoginForm = props => {
  const {
    handleSubmit,
    pristine,
    
    submitting,
    submitForm,
    valid,
    errors
  } = props;
  return (
    <form onSubmit={handleSubmit(submitForm)}>
  

      <Field
        name="email"
        
        type="email"
        label="ايميل"
        className="form-control"
        component={RenderInput}
        validate= {[required,minLength4] }
      />

      <Field
        name="password"
        
        type="password"
        label="كلمة المرور"
        className="form-control"
        component={RenderInput}
        validate={[required]}
      />


      <button
        className="btn btn-primary"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        نسجيل
      </button>

     <ResError errors={errors}/> 
    </form>
  );
};

export default reduxForm({
  form: "LoginForm" // a unique identifier for this form,

})(LoginForm);
