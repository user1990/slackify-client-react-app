import React from 'react';

import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { createMessageMutation } from '../../graphql/mutations/mutations';

const SendMessage = ({
  channelName,
  channelId,
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
      placeholder={`Message #${channelName}`}
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

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm }
    ) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { channelId, text: values.message },
      });
      resetForm(false);
    },
  })
)(SendMessage);
