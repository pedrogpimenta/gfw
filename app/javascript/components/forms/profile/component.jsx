import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import sortBy from 'lodash/sortBy';

import CountryDataProvider from 'providers/country-data-provider';
import Input from 'components/forms/components/input';
import Select from 'components/forms/components/select';

import Checkbox from 'components/forms/components/checkbox';
import Radio from 'components/forms/components/radio';

import Submit from 'components/forms/components/submit';
import ConfirmationMessage from 'components/confirmation-message';
import Button from 'components/ui/button';
import Error from 'components/forms/components/error';

import { email as validateEmail } from 'components/forms/validations';

import { sectors, howDoYouUse, interests, topics } from './config';

import './styles.scss';

class ProfileForm extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    countries: PropTypes.array,
    saveProfile: PropTypes.func,
    source: PropTypes.string
  };

  render() {
    const { initialValues, countries, saveProfile, source } = this.props;

    return (
      <Fragment>
        <Form
          onSubmit={saveProfile}
          initialValues={initialValues}
          render={({
            handleSubmit,
            valid,
            submitting,
            submitFailed,
            submitError,
            submitSucceeded,
            form: { reset },
            values
          }) => (
            <form className="c-profile-form" onSubmit={handleSubmit}>
              <div className="row">
                {submitSucceeded ? (
                  <div className="column small-12">
                    <ConfirmationMessage
                      title="Thank you for updating your My GFW profile!"
                      description="You may wish to read our <a href='/privacy-policy' target='_blank'>privacy policy</a>, which provides further information about how we use personal data."
                    />
                    <Button
                      className="reset-form-btn"
                      onClick={() => {
                        reset();
                      }}
                    >
                      Back to my profile
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    <div className="column small-12">
                      <h1>Your profile information</h1>
                      <h3>
                        We use this information to make Global Forest Watch more
                        useful for you. Your privacy is important to us and
                        we&apos;ll never share your information without your
                        consent.
                      </h3>
                    </div>
                    <div className="column small-12">
                      <Input name="firstName" label="first name" />
                      <Input name="lastName" label="surname" required />
                      <Input
                        name="email"
                        type="email"
                        label="email"
                        placeholder="example@globalforestwatch.org"
                        validate={[validateEmail]}
                        required
                      />
                      <Select
                        name="sector"
                        label="sector"
                        options={Object.keys(sectors).map(s => ({
                          label: s,
                          value: s
                        }))}
                        placeholder="Select a sector"
                        required={source === 'AreaOfInterestModal'}
                      />
                      {values.sector &&
                        sectors[values.sector] && (
                        <Radio
                          name="subsector"
                          label="Role"
                          options={sectors[values.sector].map(s => ({
                            label: s,
                            value: s.replace(/( )+|(\/)+/g, '_'),
                            radioInput: s === 'Other:'
                          }))}
                          selectedOption={values.subsector}
                          required={source === 'AreaOfInterestModal'}
                        />
                      )}
                      <Input name="jobTitle" label="job title" />
                      <Input
                        name="company"
                        label="Company / organization"
                        required
                      />
                      <p className="section-name">Where are you located?</p>
                      <Select
                        name="country"
                        label="country"
                        options={countries}
                        placeholder="Select a country"
                        required
                      />
                      <Input name="city" label="city" />
                      <Input
                        name="state"
                        label="state / department / province"
                      />
                      <p className="section-name">
                        What area are you most interested in?
                      </p>
                      <Select
                        name="aoiCountry"
                        label="country"
                        options={countries}
                        placeholder="Select a country"
                      />
                      <Input name="aoiCity" label="city" />
                      <Input
                        name="aoiState"
                        label="state / department / province"
                      />
                      <Select
                        name="interests"
                        label="What topics are you interested in?"
                        options={interests.sort()}
                        required
                        multiple
                      />
                      <Select
                        name="howDoYouUse"
                        label="how do you use global forest watch?"
                        options={sortBy(
                          howDoYouUse.map(r => ({
                            label: r,
                            value: r
                          })),
                          'label'
                        )}
                        multiple
                        required
                      />
                      <Checkbox
                        name="signUpToNewsletter"
                        options={[
                          {
                            label:
                              'Subscribe to monthly GFW newsletters and updates based on your interests.',
                            value: true
                          }
                        ]}
                      />

                      {values.signUpToNewsletter && (
                        <Select
                          name="topics"
                          label="I’m interested in receiving communications about"
                          options={topics}
                          required
                          multiple
                        />
                      )}
                      <Error
                        valid={valid}
                        submitFailed={submitFailed}
                        submitError={submitError}
                      />
                      <Submit submitting={submitting}>
                        {source === 'AreaOfInterestModal' ? 'next' : 'save'}
                      </Submit>
                    </div>
                    <div className="column small-12">
                      <p className="delete-profile">
                        <a href="mailto:gfw@wri-org">Email us </a>
                        to delete your MyGFW account.
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
            </form>
          )}
        />
        <CountryDataProvider />
      </Fragment>
    );
  }
}

export default ProfileForm;
