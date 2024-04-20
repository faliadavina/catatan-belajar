import FormCatatan from "./FormCatatan";

const Notepad: React.FC = () => {
  const handleCatatanSubmit = async (content: string, privateSetting: boolean) => {};

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <FormCatatan onSubmit={handleCatatanSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Notepad;
