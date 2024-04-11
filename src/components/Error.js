function Error({ errorMessage }) {
  return (
    <p className="error">
      <span>💥</span> There was an error fecthing questions.
      <strong>{errorMessage}</strong>
    </p>
  );
}

export default Error;
