
const ButtonTab = ({ onClick, title, isSelect }) => {
  return (
    <div className="flex flex-1 flex-col" >
      {
        isSelect &&
        <div className="w-full h-1 bg-black" />
      }
      <div
        className="flex flex-1 justify-center items-center cursor-pointer "
        onClick={onClick}
      >
        <h3 className="font-bold">{title}</h3>

        
      </div>
    </div>
  );
};

export default ButtonTab;
