import FirstTap from "./FirstTap";
import SecondTap from "./SecondTap";
const SimulateTap = () => {
  return (
    <>
      <FirstTap />
      <SecondTap />
      {/* {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : (
        <FirstTap setCardID={setCardID} handleSubmit={handleSubmit} />
      )}
      {error ? (
        <ErrorModal text={error} closePopup={() => setError(false)} />
      ) : (
        <SecondTap />
      )} */}
    </>
  );
};

export default SimulateTap;
