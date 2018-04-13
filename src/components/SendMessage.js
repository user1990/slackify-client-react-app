import React from 'react';

import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { createMessageMutation } from '../graphql/mutations/mutations';

const SendMessage = ({
  placeholder,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <div className="send-message__input">
    <Input
      name="message"
      type="text"
      value={values.message}
      placeholder={`Message #${placeholder}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={e => {
        const ENTER_KEY = 13;
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </div>
);

export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (
    values,
    { props: { onSubmit }, setSubmitting, resetForm }
  ) => {
    if (!values.message || !values.message.trim()) {
      setSubmitting(false);
      return;
    }

    await onSubmit(values.message);
    resetForm(false);
  },
})(SendMessage);
