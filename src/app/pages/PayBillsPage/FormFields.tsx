import * as React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Paragraph from 'app/components/Elements/Paragraph';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Label from 'app/components/Elements/Label';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H5 from 'app/components/Elements/H5';
import H3 from 'app/components/Elements/H3';

import { selectData } from 'app/pages/DashboardPage/slice/selectors';
import { numberCommas } from 'app/components/Helpers';

import { IFieldTypes, RENDER_FIELDS } from './fields';
import useFetch from 'utils/useFetch';
import { BillersState, ValidateSuccessResponse } from './types';
import { DateTime } from 'luxon';

type FormFieldsProps = {
  biller: BillersState;
  onSuccess: (
    form: { [name: string]: { label: string; value: string; name: string } },
    validate: ValidateSuccessResponse,
    payload: { [name: string]: any },
  ) => void;
  onBack: () => void;
};

export default function FormFields({
  biller,
  onSuccess,
  onBack,
}: FormFieldsProps) {
  const { error, response, goFetch, fetchReset } = useFetch();

  const dashData: any = useSelector(selectData);
  const [balance, setBalance] = React.useState('0.00');
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [fields, setFields] = React.useState<IFieldTypes[]>([]);
  const [note, setNote] = React.useState<any>('');
  const [payload, setPayload] = React.useState<{ [name: string]: string }>({});
  const [isConfirm, setIsConfirm] = React.useState<{
    show: boolean;
    msg: string;
    response: any;
  }>({
    show: false,
    msg: '',
    response: {},
  });
  const [apiError, setApiError] = React.useState({ show: false, msg: '' });

  React.useEffect(() => {
    if (dashData) {
      setBalance(dashData.balance_info.available_balance);
    }
  }, [dashData]);

  React.useEffect(() => {
    const view = RENDER_FIELDS(biller.code);
    const data = {};
    view.fields.map(
      j =>
        (data[j.name] = j.required
          ? { label: j.label, value: '', error: false, msg: '', name: '' }
          : { label: j.label, value: '', name: '' }),
    );

    setFormData(data);
    setNote(view.note);
    setFields(view.fields);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [biller]);

  React.useEffect(() => {
    if (response) {
      if (response.validationNumber) {
        // initialize payload
        const formInfo: {
          [name: string]: {
            label: string;
            value: string;
            name: string;
            date?: string | undefined;
          };
        } = {};

        // get all the key name in our formData object
        const keys = Object.keys(formData);

        // Iterate through the keys to dynamically populate payload
        if (keys.length > 0) {
          keys.forEach(k => {
            formInfo[k] = {
              label: formData[k].label,
              value: formData[k].value,
              name: formData[k].name || '',
              date: formData[k].date || undefined,
            };
            return;
          });
        }

        onSuccess(formInfo, response, payload);
      }
    }

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }

      let providerError = error.provider_error || false;
      if (providerError && providerError.length > 0) {
        providerError.forEach(err => {
          const k = err.errors ? Object.keys(err.errors) : [];

          if (k && k.length > 0) {
            k.forEach(key => {
              if (
                key === 'general' ||
                key === 'account_number' ||
                key === 'referenceNumber'
              ) {
                if (formData['account_number']) {
                  formData['account_number'].error = true;
                }
                if (formData['referenceNumber']) {
                  formData['referenceNumber'].error = true;
                }
              } else {
                formData[key].error = true;
              }

              if (err.errors[key].length > 0) {
                let msg: string[] = [];
                err.errors[key].forEach((e: { message: string }) =>
                  msg.push(e.message),
                );

                if (
                  key === 'general' ||
                  key === 'account_number' ||
                  key === 'referenceNumber'
                ) {
                  if (formData['account_number']) {
                    // formData['account_number'].msg =
                    //   'Account number is invalid.';
                    formData['account_number'].msg = msg.join('\n');
                  }
                  if (formData['referenceNumber']) {
                    // formData['referenceNumber'].msg =
                    //   'Account number is invalid.';
                    formData['referenceNumber'].msg = msg.join('\n');
                  }
                } else {
                  formData[key].msg = msg.join('\n');
                }
              }
            });
          }

          if (k.length === 0 && err.data && err.data.valid) {
            setIsConfirm({
              show: true,
              msg: err.data.message,
              response: { ...err.data },
            });
          }
          if (k.length === 0 && !err.data && err.status === 500) {
            setApiError({ show: true, msg: err.message });
          }
        });
      }

      if (!providerError && error.errors) {
        let errors = error.errors.error_code ? error.errors.error_code : [];
        if (errors.length > 0) {
          errors.forEach(err => {
            if (err === 204) {
              setApiError({ show: true, msg: error.errors.message.join('\n') });
              return;
            }
            if (err === 402) {
              setApiError({ show: true, msg: error.errors.message.join('\n') });
              return;
            }
          });
        } else {
          setApiError({ show: true, msg: error.errors.message || '' });
        }
      }
      fetchReset();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  const onConfirm = () => {
    // initialize payload
    const formInfo: {
      [name: string]: { label: string; value: string; name: string };
    } = {};

    // get all the key name in our formData object
    const keys = Object.keys(formData);

    // Iterate through the keys to dynamically populate payload
    if (keys.length > 0) {
      keys.forEach(k => {
        formInfo[k] = {
          label: formData[k].label,
          value: formData[k].value,
          name: formData[k].name || '',
        };
        return;
      });
    }

    onSuccess(formInfo, isConfirm.response, payload);
    setIsConfirm({ show: false, msg: '', response: {} });
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.currentTarget;
    const oldValue = formData[name] || {};
    const hasFormat: any = e.currentTarget.dataset.format || false;

    setFormData({
      ...formData,
      [name]: {
        ...oldValue,
        date:
          type === 'date' && hasFormat
            ? DateTime.fromISO(value).toFormat(hasFormat)
            : undefined,
        value: value,
        error: false,
        msg: '',
        name: '',
      },
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.currentTarget;
    const rn = e.target.options[e.target.selectedIndex].dataset.rn; // human readable name of the select options
    const oldValue = formData[name] || {};

    setFormData({
      ...formData,
      [name]: {
        ...oldValue,
        value: value,
        error: false,
        msg: '',
        name: rn || '',
      },
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    let newFormData = { ...formData };

    fields.forEach((field: IFieldTypes, i: number) => {
      if (field.required && field.validator) {
        const validate =
          field.name === 'amount'
            ? field.validator(
                formData[field.name].value,
                balance,
                field.min,
                field.max,
              )
            : field.validator(
                formData[field.name].value,
                field.maxLength,
                field.label,
              );

        if (validate.error) {
          hasError = true;
          newFormData[field.name] = {
            ...formData[field.name],
            ...validate,
          };
          return;
        }
      }
    });

    if (hasError) {
      setFormData(newFormData);
    }

    if (!hasError) {
      setLoading(true);

      // initialize payload
      let requestPayload: { [name: string]: string; otherInfo?: any } = {};
      let otherInfo = {};

      // get all the key name in our formData object
      const keys = Object.keys(formData);

      // Iterate through the keys to dynamically populate payload
      if (keys.length > 0) {
        keys.forEach(k => {
          // If key has otherInfo string
          if (k.includes('otherInfo')) {
            const o = k.split('.'); // Split the key name
            otherInfo[o[1]] = formData[k].date
              ? formData[k].date
              : formData[k].value;
            return;
          }
          requestPayload[k] = formData[k].date
            ? formData[k].date
            : formData[k].value;
          return;
        });
      }

      if (Object.keys(otherInfo).length > 0) {
        requestPayload['otherInfo'] = otherInfo; // include the other info in our payload
      }

      setPayload(requestPayload);
      const referenceNumber =
        requestPayload.account_number || requestPayload.referenceNumber;

      goFetch(
        `/pay/bills/validate/account/${biller.code}/${referenceNumber}`,
        'POST',
        JSON.stringify(requestPayload),
        '',
        true,
        true,
      );
    }
  };

  return (
    <>
      <Box
        title={`Pay Bills ${biller ? `- ${biller.name}` : ''}`}
        titleBorder
        withPadding
        style={{ minHeight: 250 }}
      >
        {loading && <Loading position="absolute" />}
        <form>
          {/* <Field style={{ textAlign: 'center' }}>
            <img src={image} alt={biller.logo} style={{ maxWidth: 100 }} />
          </Field> */}
          {fields && fields.length > 0 && (
            <>
              {fields.map((f: IFieldTypes) => {
                if (f.type === 'select') {
                  return (
                    <Field key={f.name}>
                      <Label>{f.label}</Label>
                      <Select
                        fullWidth
                        onChange={onChangeSelect}
                        value={formData[f.name].value}
                        name={f.name}
                        placeholder={f.placeholder}
                        required={f.required}
                      >
                        <option value="">Please select</option>
                        {f.option &&
                          f.option.map(o => (
                            <option
                              key={o.value}
                              value={o.value}
                              data-rn={o.label}
                            >
                              {o.label}
                            </option>
                          ))}
                      </Select>
                      {formData[f.name].error && (
                        <ErrorMsg formError>{formData[f.name].msg}</ErrorMsg>
                      )}
                    </Field>
                  );
                }

                if (f.name === 'amount') {
                  return (
                    <Field key={f.name}>
                      <Label>{f.label}</Label>
                      <InputTextWrapper>
                        <Input
                          type={f.type}
                          onChange={onChangeValue}
                          value={formData[f.name].value}
                          name={f.name}
                          placeholder={f.placeholder}
                          required={f.required}
                          hidespinner={f.type === 'number'}
                        />
                        <span>PHP</span>
                      </InputTextWrapper>
                      {formData[f.name].error ? (
                        <ErrorMsg formError>{formData[f.name].msg}</ErrorMsg>
                      ) : (
                        <Paragraph
                          size="xsmall"
                          color="secondary"
                          padding="2px 0 0"
                        >
                          Available Balance: Php {numberCommas(balance)}
                        </Paragraph>
                      )}
                    </Field>
                  );
                }

                return (
                  <Field key={f.name}>
                    <Label>{f.label}</Label>
                    <Input
                      type={f.type}
                      onChange={onChangeValue}
                      value={formData[f.name].value}
                      name={f.name}
                      placeholder={f.placeholder}
                      required={f.required}
                      hidespinner={f.type === 'number'}
                      min={f.min || undefined}
                      max={f.max || undefined}
                      maxLength={f.maxLength || undefined}
                      data-format={f.type === 'date' ? f.format : undefined}
                      data-date-inline-picker="true"
                    />
                    {formData[f.name].error && (
                      <ErrorMsg formError>{formData[f.name].msg}</ErrorMsg>
                    )}
                  </Field>
                );
              })}
              {note && <Paragraph size="xsmall">{note}</Paragraph>}
            </>
          )}

          <Flex alignItems="flex-start" justifyContent="flex-end">
            <Button
              type="button"
              onClick={onBack}
              color="secondary"
              variant="outlined"
              size="large"
            >
              Back
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              color="primary"
              variant="contained"
              size="large"
            >
              Next
            </Button>
          </Flex>
        </form>
      </Box>
      <img
        src="/img/paybills/bayad-partner.png"
        alt="Bayad Partner"
        style={{
          width: 95,
          display: 'block',
          margin: '0 auto',
          padding: '10px 0 0',
        }}
      />

      <Dialog show={apiError.show} size="xsmall">
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <CircleIndicator size="large" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
          <Paragraph size="small" margin="0 0 24px">
            {apiError.msg}
          </Paragraph>

          <Button
            fullWidth
            onClick={() => setApiError({ show: false, msg: '' })}
            variant="outlined"
            size="medium"
            color="secondary"
          >
            Close
          </Button>
        </div>
      </Dialog>

      <Dialog show={isConfirm.show} size="xsmall">
        <div style={{ margin: '24px 20px', textAlign: 'center' }}>
          <CircleIndicator
            size="large"
            color={isConfirm.response?.code === 1 ? 'primary' : 'danger'}
          >
            <FontAwesomeIcon
              icon={isConfirm.response?.code === 1 ? 'exclamation' : 'times'}
            />
          </CircleIndicator>
          <H3 margin="10px 0 5px">
            {isConfirm.response?.code === 1 ? 'Heads up!' : 'Oops!'}
          </H3>
          <Paragraph size="small" margin="0 0 24px">
            {isConfirm.msg}
          </Paragraph>

          {isConfirm.response?.code === 1 && (
            <Button
              onClick={onConfirm}
              variant="contained"
              size="medium"
              color="primary"
            >
              I Agree
            </Button>
          )}
          <Button
            onClick={() => setIsConfirm({ show: false, msg: '', response: {} })}
            size="medium"
          >
            {isConfirm.response?.code === 1 ? 'Cancel' : 'Close'}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
