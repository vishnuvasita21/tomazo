// #REFERENCE: Code modified from:
// https://herotofu.com/solutions/guides/react-post-form-data-to-api

import FormLogic from "./formLogic"

const FORM_ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/setRestaurantStatus";

const Form = () => {

  const { handleSubmit, status, message } = FormLogic();

  if (status === "success") {
    return (
      <>
        <div className="text-2xl">Currently Closed status updated successfully!</div>
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
          METHOD="PUT"
        >
          <input
            type="number"
            placeholder="Restaurant ID"
            name="RestaurantID"
            required
          />

          <select id="CurrentlyClose" name="CurrentlyClosed">
            <option value="True">True</option>
            <option value="False">False</option>
          </select>

          <input
            type="submit"
            value="submit"
          />
        </form>
  );
};

export default Form;