import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ButtonTab from "./ButtonTab";

const MainLayoutView = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(true);

  const handleSelectPage = (select = true) => {
    let navigationName = select ? "" : "book_store";
    navigate(navigationName);
    setCurrentPage(select);
  };

  return (
    <div className="flex flex-col w-screen h-screen ">
      <header>
        <nav className="shadow-md relative flex flex-row border-b border-gray-600 h-10 bg-white items-center px-5">
          <h2 className="font-bold">WebtronicLabs POC</h2>
        </nav>
      </header>
      <main className="overflow-auto flex flex-col flex-1">
        <Outlet />
      </main>
      <footer>
        <nav className="shadow-md relative flex flex-row border-b border-gray-600 h-10 bg-white">
          <ButtonTab
            title="AddBook"
            onClick={() => handleSelectPage(true)}
            isSelect={currentPage}
          />
          <ButtonTab
            title="BookStore"
            onClick={() => handleSelectPage(false)}
            isSelect={!currentPage}
          />
        </nav>
      </footer>
    </div>
  );
};

export default MainLayoutView;
