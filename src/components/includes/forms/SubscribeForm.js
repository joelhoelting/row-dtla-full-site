/* eslint-disable no-console */
import React, { useContext, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Context from '~/context/Context';

import { mediaMin } from '~/styles/mediaQueries';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  .input-row {
    display: flex;
    width: 100%;
    transition: all 300ms ease;
    opacity: ${props => (!props.formSubmitted ? 1 : 0)};
    visibility: ${props => (!props.formSubmitted ? 'visible' : 'hidden')};
    label {
      letter-spacing: 1px;
      display: flex;
      flex-direction: column;
      width: 60%;
      span {
        height: 30%;
      }
      input {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
        border: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        font-size: 1.5em;
        padding: 0.5em;
        height: 48px;
        border-radius: 0;
        margin: 0;
      }
    }

    button {
      color: #fff;
      background-color: #000;
      border: 1px solid rgba(255, 255, 255, 0.7);
      margin-left: 1em;
      font-size: 1em;
      width: 40%;
      cursor: ${props => (props.disableSubmit ? 'initial' : 'pointer')};
      opacity: ${props => (props.disableSubmit ? 0.4 : 1)};
      height: 48px;
      margin-top: auto;
      ${mediaMin('tabletLandscape')} {
        width: 25%;
      }

      ${props =>
        !props.disableSubmit &&
        css`
          &:hover {
            background-color: #fff;
            color: #000;
          }
        `}}
    }

    .thank-you-row {
      position: absolute;
      left: 0;
      bottom: 50%;
      transform: translateY(50%);
      opacity: ${props => (props.formSubmitted ? 1 : 0)};
      visibility: ${props => (props.formSubmitted ? 'visible' : 'hidden')};
      transition: all 300ms ease;
      p {
        font-size: 2rem;
        letter-spacing: 1px;
      }
      h2 {
        font-size: 2rem;
        letter-spacing: 0.5px;
      }
    }
  }
`;

const CheckBoxRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  transition: all 300ms ease;
  opacity: ${props => (!props.formSubmitted ? 1 : 0)};
  visibility: ${props => (!props.formSubmitted ? 'visible' : 'hidden')};
  margin-bottom: 16px;
  input {
    margin: 0 8px 0 0;
  }
  input[type='checkbox'] {
    appearance: none;
    border: 1px solid ${props => (props.error ? 'red' : '#fff')};
    border-radius: 0;
    height: 16px;
    width: 16px;
    &:checked {
      background-color: #fff;
    }
  }
  label {
    margin-right: 16px;
  }
`;

const SubscribeForm = () => {
  const context = useContext(Context);
  const { CTAActive, closeCTA } = context;

  const checkboxRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    consumer: 'false',
    broker: 'false'
  });
  const [checkBoxError, setCheckBoxError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInput = e => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormSubmitted(true);

    if (CTAActive) {
      setTimeout(() => {
        closeCTA();
      }, 2000);
    }

    setTimeout(() => {
      uncheckAll();
      setFormData({
        email: '',
        consumer: 'false',
        broker: 'false'
      });
      setFormSubmitted(false);
      setDisableSubmit(false);
    }, 10000);
  };

  const uncheckAll = () => {
    checkboxRef.current.children[0].checked = false;
    checkboxRef.current.children[2].checked = false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, consumer, broker } = formData;
    // Disable submit button on sign up
    if (JSON.parse(consumer)) {
      setDisableSubmit(true);
      setCheckBoxError(false);

      fetch('https://form.api.dbxd.com/add-mailchimp-subscriber?projectname=rowdtla', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email
        })
      })
        .then(response => response.json())
        .then(resetForm)
        .catch(error => {
          console.log('error posting email address', error);
          setDisableSubmit(false);
        });
    }
    if (JSON.parse(broker)) {
      setDisableSubmit(true);
      setCheckBoxError(false);

      fetch('https://form.api.dbxd.com/add-mailchimp-subscriber?projectname=rowdtlabroker', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email
        })
      })
        .then(response => response.json())
        .then(resetForm)
        .catch(error => {
          console.log('error posting email address', error);
          setDisableSubmit(false);
        });
    }
    if (!JSON.parse(consumer) && !JSON.parse(broker)) {
      setCheckBoxError(true);
    }
  };

  return (
    <>
      <Form formSubmitted={formSubmitted} disableSubmit={disableSubmit} onSubmit={handleSubmit}>
        <CheckBoxRow
          formSubmitted={formSubmitted}
          disableSubmit={disableSubmit}
          error={checkBoxError}
          ref={checkboxRef}
        >
          <input name="consumer" type="checkbox" value={true} onChange={handleInput} />
          <label htmlFor="consumer">Consumer News</label>
          <input name="broker" type="checkbox" value={true} onChange={handleInput} />
          <label htmlFor="broker">Office/Broker News</label>
        </CheckBoxRow>
        <div className="input-row">
          <label htmlFor="email">
            <span>EMAIL ADDRESS</span>
            <input type="email" name="email" value={formData.email} onChange={handleInput} required />
          </label>
          <button type="submit" disabled={disableSubmit}>
            SIGN&nbsp;UP
          </button>
        </div>
        <div className="thank-you-row">
          <h2>You&apos;re on the list!</h2>
        </div>
      </Form>
    </>
  );
};

export default SubscribeForm;
