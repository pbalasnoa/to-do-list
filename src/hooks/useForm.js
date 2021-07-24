import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  // let today = new Date();
  // const todayDate = `${today.getDate()} / ${
  //   today.getMonth() + 1
  // } / ${today.getFullYear()}`;

  // console.log(todayDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
}
