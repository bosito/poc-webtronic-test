export const initialStateForm = {
  title: "",
  description: "",
  fileUrl: "",
  createdDate: "",
};

export const validateSchema = (schema) => {
  if (
    schema.title.length &&
    schema.description.length &&
    schema.createdDate.length &&
    schema.fileUrl.length
  ) {
    return true;
  }

  return false;
};
