// #REFERENCE: Code modified from:
// https://herotofu.com/solutions/guides/react-post-form-data-to-api

import FormLogic from "./formLogic"

const FORM_ENDPOINT = "https://us-central1-csci5410-14dd5.cloudfunctions.net/deleteReservationRestaurant";

const Form = () => {

  const { handleSubmit, status, message } = FormLogic();

  if (status === "success") {
    return (
      <>
        <div className="text-2xl">Reservation deleted successfully!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="text-2xl">We encountered an error!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  return (
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          METHOD="DELETE"
        >

          <input
            type="string"
            placeholder="Document ID"
            name="documentID"
            required
          />

          <input
            type="submit"
            value="submit"
          />
        </form>
  );
};

export default Form;