import React from 'react';
import styled from '@emotion/styled';

import { mediaMin } from '~/styles/mediaQueries';
import DropdownArrow from '~/assets/images/icons/dropdown.svg';

import formLogic from './formLogic';

const FormStyled = styled.form`
  width: 100%;
`;

const Success = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: #fff;
  }
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 40px;
  flex-direction: column;
  ${mediaMin('tabletLandscape')} {
    flex-direction: row;
  }

  &.last-row {
    margin-bottom: 0;
    ${mediaMin('tabletLandscape')} {
      margin-bottom: 40px;
    }
  }

  label {
    &.half {
      width: 100%;
      &:nth-of-type(1) {
        margin-bottom: 40px;
        ${mediaMin('tabletLandscape')} {
          padding-right: 1em;
          margin-bottom: 0;
        }
      }
      &:nth-of-type(2) {
        ${mediaMin('tabletLandscape')} {
          padding-left: 1em;
        }
      }
      ${mediaMin('tabletLandscape')} {
        width: 50%;
      }
    }

    &.full {
      width: 100%;
    }

    span {
      display: block;
      text-transform: uppercase;
      margin: 0.5em 0;
      font-size: 0.8rem;
      font-weight: 300;
      letter-spacing: 1px;
      ${mediaMin('tabletLandscape')} {
        font-size: 1rem;
      }
    }

    .select-wrapper {
      position: relative;
      color: red;
      .dropdown-arrow {
        position: absolute;
        right: 0;
        top: 20px;
        right: 20px;
      }
    }

    textarea {
      width: 100%;
      resize: none;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      font-size: 1.4rem;
      color: #fff;
      caret-color: #fff;
      padding: 10px;
      ${mediaMin('tabletLandscape')} {
        padding: 20px;
      }
    }
  }

  &.submit-row {
    justify-content: space-between;
    align-items: flex-start;
    span {
      display: block;
      font-size: 1rem;
      font-weight: 300;
      letter-spacing: 1px;
      margin: 1em 0;
      ${mediaMin('tabletLandscape')} {
        margin: 0;
      }
    }
    button {
      background: none;
      border: 1px solid #fff;
      color: #fff;
      cursor: pointer;
      transition: all 300ms ease;
      font-size: 2rem;
      padding: 0.5em 0;
      width: 100%;
      text-transform: uppercase;
      font-weight: 300;
      margin: 1em 0;
      letter-spacing: 2px;
      ${mediaMin('tabletLandscape')} {
        width: 45%;
        margin: 0;
        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: ${props => (props.error ? '1px solid red' : '1px solid rgba(255, 255, 255, 0.7)')};
  padding-bottom: 5px;
  padding-left: 5px;
  height: 50px;
  font-size: 1.4rem;
  color: #fff;
  caret-color: #fff;
  text-transform: uppercase;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-bottom: ${props => (props.error ? '1px solid red' : '1px solid rgba(255, 255, 255, 0.7)')};
  text-transform: uppercase;
  color: #fff;
  appearance: none;
  padding-left: 10px;
  border-radius: 0;
  option {
    font-size: 1.4rem;
    color: #000;
  }
`;

const ContactForm = () => {
  const { inputs, handleChange, handleSubmit, handleBlur, errors, submitted } = formLogic();

  return submitted ? (
    <Success>
      <span>Thank you for your interest in ROW DTLA</span>
      <span>WE WILL BE IN TOUCH SOON</span>
    </Success>
  ) : (
    <FormStyled onSubmit={handleSubmit}>
      <FormRow>
        <label htmlFor="firstName" className="half">
          <span>* First Name</span>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={inputs.firstName}
            error={errors.firstName}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="lastName" className="half">
          <span>* Last Name</span>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={inputs.lastName}
            error={errors.lastName}
            onBlur={handleBlur}
          />
        </label>
      </FormRow>
      <FormRow>
        <label htmlFor="email" className="full">
          <span>* Email</span>
          <Input
            type="email"
            name="email"
            id="email"
            error={errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            value={inputs.email}
          />
        </label>
      </FormRow>
      <FormRow>
        <label htmlFor="phone" className="full">
          <span>* Phone</span>
          <Input
            type="tel"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={inputs.phone}
            error={errors.phone}
            onBlur={handleBlur}
          />
        </label>
      </FormRow>
      <FormRow>
        <label htmlFor="inquiryType" className="full">
          <span>* Please select the nature of your inquiry</span>
          <div className="select-wrapper">
            <img className="dropdown-arrow" src={DropdownArrow} alt="dropdown arrow" />
            <Select
              name="inquiryType"
              id="inquiryType"
              onBlur={handleBlur}
              onChange={handleChange}
              error={errors.inquiryType}
              defaultValue={'DEFAULT'}
            >
              <option value={'DEFAULT'} disabled hidden>
                &nbsp;&nbsp;--
              </option>
              <option value="general">General</option>
              <option value="retail">Retail Leasing</option>
              <option value="creative">Creative Office Leasing</option>
              <option value="event">Event Inquiry</option>
              <option value="press">Press Inquiry</option>
            </Select>
          </div>
        </label>
      </FormRow>
      <FormRow className="last-row">
        <label htmlFor="canWeHelp" className="full">
          <span>Let us know how we can help</span>
          <textarea
            rows="6"
            type="text"
            name="canWeHelp"
            id="canWeHelp"
            onChange={handleChange}
            value={inputs.canWeHelp}
          />
        </label>
      </FormRow>
      <FormRow className="submit-row">
        <span className="no-margin">* required fields</span>
        <button type="submit" value="Submit" className={submitted ? 'active' : ''}>
          <span>Submit</span>
        </button>
      </FormRow>
    </FormStyled>
  );
};

export default ContactForm;
