import { Component, createRef } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";

import CustomTextField from "../commons/form/CustomTextField";
import classes from "./ExchangeRateConverter.module.css";
import validationSchema from "./FormValidationSchema";
import { fetchExchangeRate } from "../../services/ExchangeRateService";

interface Currency {
    fromCurrency: string,
    toCurrency: string,
}

interface ExchangeRateConverterProps {
    fromCurrency: string,
    toCurrency: string,
    updateCurrencies: Function
}

interface ExchangeRateConverterState {
    exchangeRate: number,
    convertedValue: number,
}

class ExchangeRateConverter extends Component<ExchangeRateConverterProps, ExchangeRateConverterState> {
    private amountRef = createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);

        this.state = {
            exchangeRate: 0,
            convertedValue: 0,
        };
    }

    render() {
        return (
            <Formik
                initialValues={{
                    fromCurrency: this.props.fromCurrency,
                    toCurrency: this.props.toCurrency,
                    common: '',
                }}
                validationSchema={validationSchema}
                onSubmit={({ fromCurrency, toCurrency }, { setSubmitting, setErrors }) => {
                    if (fromCurrency === toCurrency) {
                        setErrors({ common: 'Both currecnies cannot be same!' });
                        setSubmitting(false);
                        return;
                    }
                    fetchExchangeRate(fromCurrency, toCurrency)
                        .then((data) => {
                            if (data['Error Message']) {
                                setErrors({ common: 'Invalid input(s), please check again!' })
                            } else {
                                const exchangeRate = parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                                if (exchangeRate) {
                                    this.setState({
                                        ...this.state,
                                        exchangeRate,
                                        convertedValue: parseFloat(this.amountRef?.current?.value || '0') * exchangeRate
                                    });
                                    this.props.updateCurrencies(fromCurrency, toCurrency);
                                }
                            }
                        })
                        .catch(() => {
                            setErrors({ common: 'Sorry! could not get the Exchange rate!' })
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}>
                {formData => (
                    <form className={classes.form} onSubmit={formData.handleSubmit}>
                        <CustomTextField name="fromCurrency" label="From e.g. INR, EUR, USD" formData={formData} />
                        <CustomTextField name="toCurrency" label="To e.g. INR, EUR, USD" formData={formData} />
                        {formData.errors && !!formData.errors.common ? <div className="form-inline-error">{formData.errors.common}</div> : null}
                        <Button
                            color="primary"
                            disabled={formData.isSubmitting || this.inputNotChanged(formData.values)}
                            variant="contained"
                            type="submit"
                            fullWidth>Get Rate</Button>
                        {
                            (this.state.exchangeRate > 0) ? <>
                                <h3 style={{ textAlign: 'center', color: '#3700B3' }}>Exchange rate: {this.state.exchangeRate.toFixed(4)}</h3>
                                <TextField
                                    inputProps={{ 'data-testid': 'amount' }}
                                    inputRef={this.amountRef}
                                    defaultValue="0"
                                    name="amount"
                                    type="number"
                                    label="Amount"
                                    onChange={(evt) => {
                                        if (parseFloat(evt.target.value) < 0) {
                                            evt.target.value = '0';
                                        }
                                        this.setState({ convertedValue: ((parseFloat(evt.target.value) || 0) * this.state.exchangeRate) });
                                    }} />
                                <h3 style={{ textAlign: 'center', color: '#008b00', marginBottom: 0 }}>Converted Amount: {this.state.convertedValue.toFixed(4)}</h3>
                            </> : null
                        }
                    </form>)
                }

            </Formik>
        );
    }

    // just to check whether any input udpated so that we can avoid API calls for same inputs
    inputNotChanged({ fromCurrency, toCurrency }: Currency): boolean {
        return (this.props.fromCurrency === fromCurrency) && (this.props.toCurrency === toCurrency);
    }
}

export default ExchangeRateConverter;