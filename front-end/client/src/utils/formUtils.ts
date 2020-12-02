const validateEmail = (mail: string) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return true;
  }
  return false;
};

const isInputEmpty = (text: string) => {
  if (text) return false;
  return true;
};

const handleChange = (setData: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  setData((prevState: any) => ({
    ...prevState,
    [name]: value,
  }));
};

export {
  validateEmail,
  isInputEmpty,
  handleChange,
};
