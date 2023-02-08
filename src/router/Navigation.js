import { Route, Routes } from "react-router-dom";
import { MainLayoutView } from "../components";
import { AddBook, BookStore, EditBook } from "../screens";
import Layout from "./Layout";

const Navigation = () => {
  return (
    <div className="bg-gray-200 flex h-screen w-screen">
      <Routes>
        <Route path="/" element={<MainLayoutView />}>
          <Route index element={<AddBook />} />
          <Route path="/book_store" element={<Layout />}>
            <Route index element={<BookStore />} />
            <Route path="edit_book/:id" element={<EditBook />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;
