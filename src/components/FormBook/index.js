import { useEffect, useState } from "react";
import { initialStateForm } from "../../helpers";

const FormBook = ({ onSubmit, disabled = false, valueForms }) => {
  const [stateForm, setStateForm] = useState(initialStateForm);

  const handleForm = (event) => {
    setStateForm({
      ...stateForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(()=>{
    Object()
    if(valueForms && Object.keys(valueForms).length){
      setStateForm(valueForms)
    }
  }, [valueForms])

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let newState = stateForm;
    newState.createdDate = new Date().toLocaleDateString();
    if (
      newState.createdDate &&
      newState.description &&
      newState.fileUrl &&
      newState.title
    ) {
      onSubmit && onSubmit(newState);
      setStateForm(initialStateForm);
    }
  };

  return (
    <div>
      <form className="flex flex-col " onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="title"
          className=""
          placeholder="title book"
          required={true}
          disabled={disabled}
          value={stateForm.title}
          onChange={handleForm}
        />
        <textarea
          name="description"
          className=""
          placeholder="description"
          disabled={disabled}
          value={stateForm.description}
          onChange={handleForm}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="fileUrl"
          multiple={false}
          disabled={disabled}
          value={stateForm.fileUrl}
          onChange={handleForm}
        />
        <div className="w-full flex  justify-end">
          <button type="submit" className="bg-slate-200 rounded ">
            <p className="m-2">Submit</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBook;
