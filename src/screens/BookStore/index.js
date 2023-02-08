import { useState, useEffect } from "react";

import { API } from "aws-amplify";
import { listBooks } from "../../graphql/queries";
import { deleteBook } from "../../graphql/mutations";
import { useNavigate } from 'react-router-dom'

const BookStore = () => {
  const [listBooksState, setListBooksState] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLits = async () => {
    try {
      setLoading(true);
      setListBooksState([]);
      const bookList = await await API.graphql({ query: listBooks });
      setListBooksState([...bookList.data?.listBooks?.items]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (elementId) => {
    try {
      await API.graphql({
        query: deleteBook,
        variables: { input: { id: elementId } },
      });
      fetchLits();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLits();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 ">
      {listBooksState.map((element, index) => {
        return (
          <div key={`${index.toString()}-${element?.id}`} className="m-5">
            <content className="border-2 border-gray-400 rounded-lg bg-gray-300 flex flex-col overflow-hidden">
              <header className="w-48 h-52">
                <img
                  className="h-32 lg:h-48 md:h-36 w-full object-cover object-center"
                  src={
                    "https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg"
                  }
                  alt={`book number ${index}`}
                />
              </header>
              <section className="w-48 px-2 pb-2 ">
                <div className="">
                  <span className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    NAME BOOK
                  </span>
                  <h3 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {element?.title}
                  </h3>
                </div>
                <p className="leading-relaxed mb-3">{element?.description}</p>
                <footer className="w-full flex justify-between">
                  <div
                    onClick={() => navigate(`edit_book/${element.id}`)}
                    className="cursor-pointer rounded border border-indigo-600 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white active:bg-indigo-500 px-1 py-1"
                  >
                    <h3>Update</h3>
                  </div>
                  <div
                    onClick={() => handleDeleteBook(element.id)}
                    className="cursor-pointer rounded border border-red-600 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white active:bg-red-500 px-1 py-1"
                  >
                    <h3>delete</h3>
                  </div>
                </footer>
              </section>
            </content>
          </div>
        );
      })}
    </div>
  );
};

export default BookStore;
