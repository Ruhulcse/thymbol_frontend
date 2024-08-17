const UpdateButton = ({ ButtonName, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        class="focus:outline-none w-16 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-normal rounded-lg text-xs px-2 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {ButtonName}
      </button>
    </div>
  );
};

export default UpdateButton;
