import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export const useForm = (initialForm, validatorFn, actionFn, entityName) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors(
      validatorFn({
        ...formData,
        [name]: value,
      })
    );
  };

  // * Puede o no enviar un maximo de elementos del array, ya que tiene un valor alto por defecto.
  const handleMultipleSelect = (event, maxLength = 10000) => {
    let { value, name } = event.target;

    // * Selects multiple que guardara elementos en un array que no permite tener repeticiones.
    if (formData[name].length < maxLength && !formData[name].includes(value)) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    }
    setErrors(
      validatorFn({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleList = (event, listName) => {
    const { innerText } = event.target;

    const filteredSelect = formData[listName].filter(
      (value) => value !== innerText
    );

    setFormData({
      ...formData,
      [listName]: filteredSelect,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validatorFn(formData));

    // * Si el estado errors no tiene propiedades significa que no hay errores y procedemos a hacer el post.
    if (!Object.keys(errors).length) {
      dispatch(actionFn(formData)).then(() => {
        alert(`New ${entityName} created successfully`);
        dispatch(getVideogames()).then(() => navigate("/home"));
      });
    } else {
      return;
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleMultipleSelect,
    handleList,
    handleSubmit,
  };
};
