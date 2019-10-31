import React from "react";
import Modal from "react-responsive-modal";
import {ResError} from './../shared/form/ResError'
export default props => {
  const { open, closeModal,booking,confirmModal,errors } = props;
  
  return (
    <Modal
      open={open}
      onClose={closeModal}
      little
      classNames={{ modal: "booking-modal" }}
    >
      <h4 className="modal-title title pt-5">تأكيد الحجز </h4>
      <p className="dates">{booking.startAt} / {booking.endAt}</p>
      <div className="modal-body">
        <em>{booking.days} </em> ليالي /<em>{booking.rental.price}$</em> لليلة
        <p>
          ضيوف: <em>{booking.guests}</em>
        </p>
        <p>
          إجمالي: <em>{booking.totalPrice}</em>
        </p>
        <p>هل تريد تأكيد الحجز؟</p>
      </div>
      <ResError errors={errors}/>
      <div className="modal-footer">
        <button onClick={confirmModal} type="button" className="btn btn-primary">
          تأكيد
        </button>
        <button type="button" onClick={closeModal} className="btn btn-primary">
          الغاء
        </button>
      </div>
    </Modal>
  );
};
