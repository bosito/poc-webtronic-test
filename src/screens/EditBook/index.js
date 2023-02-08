import { API } from "aws-amplify";
import { getBook } from "../../graphql/queries";
import { updateBook } from "../../graphql/mutations";
import { FormBook } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { initialStateForm } from "../../helpers";

const EditBook = () => {
  const { id } = useParams();
  const [stateForm, setStateForm] = useState(initialStateForm);

  const handleGetBookById = async () => {
    try {
      const oneBook = await API.graphql({
        query: getBook,
        variables: { id: id },
      });
      setStateForm({...oneBook.data.getBook, fileUrl: '' })
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBook = async (stateForm) => {
    try {
      const objectBook = {
        ...stateForm,
        id: id
      }
      delete objectBook.createdAt;
      delete objectBook.updatedAt;

      console.log('objectBook --->', objectBook);
      const updatedTodo = await API.graphql({
        query: updateBook,
        variables: { input: { ...stateForm, id: id } },
      });
      console.log('updatedTodo -->', updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetBookById()
  }, []);

  return (
    <div>
      <h1>hi i am edit book</h1>
      <FormBook disabled={false} onSubmit={handleEditBook} valueForms={stateForm} />
    </div>
  );
};

export default EditBook;
