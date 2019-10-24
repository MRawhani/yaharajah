import React from "react";
import { Field, reduxForm } from "redux-form";
import { RenderInput } from "./../shared/form/renderInput";
import { ResError } from "./../shared/form/ResError";

const RegisterForm = props => {
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
        className="form-control"
        name="username"
        
        label="اسم المستخدم"
        type="text"
        component={RenderInput}
      />

      <Field
        name="email"
        
        type="email"
        label="ايميل"
        className="form-control"
        component={RenderInput}
      />

      <Field
        name="password"
        
        type="password"
        label="كلمة المرور"
        className="form-control"
        component={RenderInput}
      />

      <Field
        name="passwordConfirmation"
        
        type="password"
        label="تأكيد كلمة المرور"
        className="form-control"
        component={RenderInput}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit
      </button>

      <ResError errors={errors}/>
    </form>
  );
};
const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = "اقل عدد منا لحروف هو 4";
  }
  if (!values.email) {
    errors.email = "الايميل مطلوب";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "ادخل التأكيد";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = "Password must match";
  }
  return errors;
};

export default reduxForm({
  form: "registerForm", // a unique identifier for this form,
  validate
})(RegisterForm);
