import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {object} initialForm - Objeto inicial con las propiedades y valores iniciales del formulario.
 * @param {function} validatorFn - Funcion que valida los campos del formulario.
 * @param {function} actionFn - REDUX = ACTION CREATOR que realiza la solicitud POST al servidor.
 * @param {string} entityName - Nombre descriptivo de la entidad a la que se refiere el formulario.
 * @returns - Estado vinculado al formulario, sus errores y funcionalidades básicas.
 */
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

    // * Selects multiples: Guardaran elementos en un array que no permite tener repeticiones.
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

  // * Elimina la opcion seleccionada del array que la contiene al hacerle click.
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validatorFn(formData));
    try {
      await dispatch(actionFn(formData));
      alert(`NEW ${entityName} CREATED SUCCESSFULLY.`);
      navigate("/home");
    } catch (error) {
      alert(`ERROR CREATING A NEW ${entityName}: ${error.response.data.error}`);
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
