import { useState } from 'react';
import validateForm from './validateForm';

const formLogic = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    inquryType: '',
    canWeHelp: ''
  });
  const [submitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    const { email, firstName, lastName, phone, inquiryType, canWeHelp } = inputs;
    const newErrors = validateForm(inputs);
    setErrors(newErrors);

    if (Object.keys(errors).length === 0) {
      const text = `New inquiry from the Row DTLA main site.
        \n\nRegistrant Details:
        \nName: ${firstName} ${lastName}
        \nEmail: ${email}
        \nPhone: ${phone}
        \nNature of Inquiry: ${inquiryType}
        \nHow can we help: ${canWeHelp}
      `;

      const directory = {
        general: {
          recipientEmail: 'info@rowdtla.com',
          recipientName: 'ROWDTLA Info'
        },
        retail: {
          recipientEmail: 'rowdtlaretail@atlas-cap.com',
          recipientName: 'ROWDTLA Retail Office'
        },
        creative: {
          recipientEmail: 'rowdtlaoffice@atlas-cap.com',
          recipientName: 'ROWDTLA Creative Office'
        },
        event: {
          recipientEmail: 'events@rowdtla.com',
          recipientName: 'ROWDTLA Events'
        },
        press: {
          recipientEmail: 'rowdtla@wagstaffworldwide.com',
          recipientName: 'ROWDTLA Press'
        }
      };

      const { recipientEmail, recipientName } = directory[inquiryType];

      var emailData = {
        from: '"ROW DTLA" <no_reply_row_dtla@dbox.com>',
        to: `"${recipientName}" <${recipientEmail}>`,
        subject: 'ROW DTLA - You have received an inquiry',
        text: text
      };

      fetch('https://form.api.dbxd.com/post-ses-email', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })
        .then(response => response.json())
        .then(result => {
          console.log('email sending successful ', result);
          setFormSubmitted(true);
        })
        .catch(error => {
          console.log('error sending email ', error);
        });
    }
  };

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  const handleBlur = e => {
    const newErrors = validateForm(inputs, e.target.name);
    setErrors(newErrors);
  };

  return {
    handleSubmit,
    handleChange,
    inputs,
    submitted,
    handleBlur,
    errors
  };
};

export default formLogic;
