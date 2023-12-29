const LibraryHeader = ({searchChange}) => {
  return (
    <div className="flex border-solid border-b border-primaryBorderDark flex-grow bg-primaryBackgroundSoft text-primaryText shadow">
      <div className="flex p-2 align-middle items-center">
        <h3 className="align-middle font-semibold">
        <input 
          type="search"
          name="search"
          className="library-search bg-primaryBackgroundDark p-2 pl-4 focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md" 
          placeholder="Search .."
          onChange={(e)=>searchChange(e.target.value)}
        />
        </h3>
      </div>
    </div>
  );
};

export default LibraryHeader;
