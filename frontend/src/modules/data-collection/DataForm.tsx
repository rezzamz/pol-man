import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DataForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      type: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
      type: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/api/halls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // تنظیم هدر Content-Type
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          {formik.errors.age ? <div>{formik.errors.age}</div> : null}
        </label>
      </div>
      <div>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          {formik.errors.type ? <div>{formik.errors.type}</div> : null}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DataForm;