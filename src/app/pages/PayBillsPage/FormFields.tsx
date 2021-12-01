import * as React from 'react';
import { useSelector } from 'react-redux';

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

import bayadLogo from 'app/components/Assets/paybills/bayad-partner.png';

import { selectData } from 'app/pages/DashboardPage/slice/selectors';
import { numberCommas } from 'app/components/Helpers';

import { IFieldTypes, RENDER_FIELDS } from './fields';

type FormFieldsProps = {
  billerCode: string;
  onBack: () => void;
};

export default function FormFields({ billerCode, onBack }: FormFieldsProps) {
  const dashData: any = useSelector(selectData);
  const [balance, setBalance] = React.useState('0.00');
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [fields, setFields] = React.useState([]);
  const [note, setNote] = React.useState<any>('');

  React.useEffect(() => {
    if (dashData) {
      setBalance(dashData.balance_info.available_balance);
    }
  }, [dashData]);

  React.useEffect(() => {
    const view = RENDER_FIELDS(billerCode);
    const data = {};
    view.fields.map(
      j =>
        (data[j.name] = j.required
          ? { value: '', error: false, msg: '' }
          : { value: '' }),
    );

    setFormData(data);
    setNote(view.note);
    setFields(view.fields);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [billerCode]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: {
        value: value,
        error: false,
        msg: '',
      },
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: {
        value: value,
        error: false,
        msg: '',
      },
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    let newFormData = { ...formData };
    let payload = {};

    fields.forEach((field: IFieldTypes) => {
      if (field.required && field.validator) {
        const validate = field.validator(formData[field.name].value, balance);
        if (validate.error) {
          hasError = true;
          newFormData[field.name] = {
            ...formData[field.name],
            ...validate,
          };
          return;
        }

        payload[field.name] = formData[field.name].value;
        return;
      }
    });

    if (hasError) {
      setFormData(newFormData);
    }

    if (!hasError) {
      console.log(payload);
    }
  };

  return (
    <>
      <Box title="Pay Bills" titleBorder withPadding>
        {loading && <Loading position="relative" />}
        <form>
          {!loading && fields.length > 0 && (
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
                        {f.option &&
                          f.option.map(o => (
                            <option key={o.value} value={o.value}>
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
                      data-date-inline-picker="true"
                    />
                    {formData[f.name].error && (
                      <ErrorMsg formError>{formData[f.name].msg}</ErrorMsg>
                    )}
                  </Field>
                );
              })}
              {note && <Paragraph size="small">{note}</Paragraph>}
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
        src={bayadLogo}
        alt="Bayad Partner"
        style={{ width: 95, display: 'block', margin: '0 auto' }}
      />
    </>
  );
}
