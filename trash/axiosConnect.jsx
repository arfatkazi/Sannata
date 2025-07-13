function axiosCOnnect() {
  useEffect(() => {
    axios
      .get("/")
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const inputData = e.target.sometext.value;
    console.log(inputData);

    axios
      .post("/input", { name: inputData })
      .then((res) => console.log(res.data.reply))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          id="sometext"
          name="sometext"
          type="text"
          className=" border px-3 py-2 rounded mb-2"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default axiosCOnnect;
