const UpdateButton = ({ ButtonName, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        class=" bg-green-800 hover:bg-green-900 font-normal text-xs py-2 md:px-2 px-3 rounded-lg text-white mr-4 md:mr-1"
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default UpdateButton;
