const Search = ({ setSearch, placeHolder }: any | any) => {
  return (
    <form className="form-inline p-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeHolder}
        onChange={({ currentTarget: input }) => setSearch(input.value)}
      />
    </form>
  );
};

export default Search;
