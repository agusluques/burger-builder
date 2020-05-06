import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as actionTypes from '../../../store/actions'

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your name',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your email',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMode: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    });
    const [loading, setLoading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const validate = (value, rules) => {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const newForm = { ...orderForm }

        const newElement = { ...newForm[inputIdentifier] }

        newElement.value = event.target.value;
        newElement.valid = validate(newElement.value, newElement.validation);
        newElement.touched = true;

        newForm[inputIdentifier] = newElement;

        let formIsValid = true;

        for (let form in orderForm){
            formIsValid = orderForm[form].valid && formIsValid
        }

        setFormIsValid(formIsValid);
        setOrderForm(newForm);
    }

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading({ loading: true });

        const formData = {};

        for (let form in orderForm) {
            formData[form] = orderForm[form].value
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false);
                props.history.push('/');
            })
            .catch(error => {
                console.log(error)
            });
    };

    let inputs = [];

    for (let input in orderForm) {
        inputs.push(
            <Input
                key={input}
                elementType={orderForm[input].elementType}
                elementConfig={orderForm[input].elementConfig}
                value={orderForm[input].value}
                changed={(event) => inputChangedHandler(event, input)}
                invalid={!orderForm[input].valid}
                shouldValidate={orderForm[input].validation}
                touched={orderForm[input].touched}>

            </Input>
        )
    }

    let form = (<form onSubmit={orderHandler}>
        {inputs}
        <Button btnType='Success' disabled={!formIsValid} clicked={orderHandler}>Order</Button>
    </form>);

    if (loading) form = <Spinner></Spinner>

    return (
        <div className={classes.ContactData}>
            <h4>Enter contact data</h4>
            {form}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));