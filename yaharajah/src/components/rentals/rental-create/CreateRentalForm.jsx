import React from "react";
import { connect } from 'react-redux'
import { Field, reduxForm ,formValueSelector} from "redux-form";
import { RenderInput } from "./../../shared/form/renderInput";
import { RenderTextArea } from "./../../shared/form/renderTextArea";
import { RenderSelect } from "./../../shared/form/renderSelect";
import RenderFileUpload from "./../../shared/form/rentalFileUpload";
import { ResError } from "./../../shared/form/ResError";

let CreateRentalForm = props => {
    
  const {
    handleSubmit,
    pristine,
    submitting,
    submitForm,
    options,
    valid,
    errors
  } = props;
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field
        className="form-control"
        name="title"
        label="العنوان"
        type="text"
        component={RenderInput}
      />

      <Field
        className="form-control"
        name="description"
        label="وصف"
        type="text"
        component={RenderTextArea}
      />

      <Field
        name="city"
        type="text"
        label="city"
        className="form-control"
        component={RenderInput}
      />

      <Field
        name="street"
        type="text"
        label="street"
        className="form-control"
        component={RenderInput}
      />
      <Field
        name="category"
        label="نوع"
        className="form-control"
        options={options.categories}
        component={RenderSelect}
      />
      <Field
        name="image"
        label="ثورة"
        className="form-control"
        component={RenderFileUpload}
      />

      <Field
        name="bedrooms"
        type="number"
        label="Rooms"
        className="form-control"
        component={RenderInput}
      />
      <Field
        name="bathrooms"
        type="number"
        label="bathrooms"
        className="form-control"
        component={RenderInput}
      />
       <Field
        name="coin"
        label="العملة"
        className="form-control"
        options={options.coins}
        component={RenderSelect}
      />
      <Field
        name="price"
        type="text"
        label="السعر لليلة"
        className="form-control"
        sympol={props.coinValue}
        component={RenderInput}
      />
     
          <Field
        name="shared"
        type="checkbox"
        label="عائلي  "
        className="form-control"
        component={RenderInput}
      />
         <Field
        name="bargain"
        type="checkbox"
        label="قابل للتفاوض"
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


// mapping state => the 'form' state; to props
 CreateRentalForm= reduxForm({
  form: "createRentalForm" // a unique identifier for this form,
  ,initialValues:{shared:false,bargain:false,coin:'$',category:'شقة'}
})(CreateRentalForm);

const selector = formValueSelector('createRentalForm') // <-- same as form name
CreateRentalForm = connect(
  state => {
    // can select values individually
    const coinValue = selector(state, 'coin')
    return {
     coinValue
    }
  }
)(CreateRentalForm)

export default CreateRentalForm