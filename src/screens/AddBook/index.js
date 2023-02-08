import { FormBook } from "../../components";
import { validateSchema } from "../../helpers";

import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

const AddBook = () => {

  const handleOnSubmit = async (stateInputs) => {
    try {
      if (!validateSchema(stateInputs)) {
        return;
      }

      const newBook = await API.graphql({
        query: mutations.createBook,
        variables: { input: stateInputs },
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col shadow-md bg-white p-5 ">
        <FormBook disabled={false} onSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default AddBook;
