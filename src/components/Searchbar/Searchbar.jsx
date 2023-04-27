import { BsSearch } from 'react-icons/bs'
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./Searchbar.module.css"
import * as yup from "yup";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

export const Searchbar = ({onFormSubmit}) => {

    const initialValues = {
        query: '',
    }

    const schema = yup.object().shape({
        query: yup.string().required(),
    })

    const handleSubmit = (values, actions) => {
        const {resetForm, setSubmitting} = actions;
    
        if (values.query.trim() === '') {
            toast.error('Please, enter your search query!');
            resetForm();
            return;
        }

        onFormSubmit(values.query);

        setSubmitting(); // --- to make submit btn disabled during submitting
        resetForm();
    };

    return (
        <header className={css.searchbar}>
            <Formik 
            initialValues = {initialValues} 
            onSubmit = {handleSubmit}
            validationSchema={schema}
            >

            {(props) => {
                return (
                    <Form className={css.searchForm}>

                    <button type="submit" 
                    className={css['searchForm-button']}
                    disabled={props.isSubmitting} // --- to make submit btn disabled during submitting
                    >
                        <span 
                        className={css['searchForm-button-label']}
                        >Search</span>   
                        <BsSearch/> 
                    </button>

                    <label className={css['searchForm-button-label']} htmlFor="query">   Search query</label>
                    
                    <Field
                    id="query"
                    name="query"
                    className={css['searchForm-input']}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    ></Field>
                    <ErrorMessage name="query" />

                </Form>
                )
            }}
            </Formik>
        </header>
    )
}

Searchbar.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}