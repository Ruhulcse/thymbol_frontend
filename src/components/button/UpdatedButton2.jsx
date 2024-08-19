const UpdatedButton2 = ({ onClick, ButtonName }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        class=" bg-green-800 hover:bg-green-900 font-normal text-[6px] md:text-[10px] py-1 md:py-2 md:px-2 px-1 md:rounded-lg rounded-md text-white mr-6 md:mr-4"
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default UpdatedButton2;
