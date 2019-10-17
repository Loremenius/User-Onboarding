import React,{useState,useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CreateForm = ({ values, touched, errors, status }) =>{
    const [user, setUser] = useState([]);
    useEffect(() => {
        status && setUser(animals => [...user, status])
      },[status])
    return(
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Enter first and last name" /><br></br>
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Enter E-mail" /><br></br>
                <Field type="password" name="password" placeholder="Enter password" /><br></br>
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                    {" "}
                    Agree to terms of service
                    <Field
                        type="checkbox"
                        name="agreement"
                        checked={values.agreement}
                    />
                    <span className="checkmark" />
                </label><br></br>
                {touched.agreement && errors.agreement && (
                    <p className="error">{errors.agreement}</p>
                )}
                <button type="submit">Submit!</button>
                

            </Form>
            {user.map(user => (
                <ul key={user.id}>
                <li>Name: {user.name}</li>
                <li>E-mail: {user.email}</li>
                <li>Password: {user.password}</li>
                </ul>
            ))}

        </div>
    )
}
const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, agreement }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        agreement: agreement || false
      };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string(),
        password:Yup.string().required(),
        agreement:Yup.string().required()
      }),
      handleSubmit(values, {setStatus}) { 
        axios.post('https://reqres.in/api/users/', values) 
              .then(res => { setStatus(res.data); }) 
              .catch(err => console.log(err.response));
        }
  })(CreateForm);
  export default FormikForm;