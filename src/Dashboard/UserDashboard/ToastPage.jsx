function ToastPage() {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
        <div className="bg-gray-800 text-white px-4 py-2 w-full text-left mb-6">Warnings</div>
  
        <div className=" flex flex-col items-center gap-4">
          <div className="bg-cover bg-green-500 text-white px-4 py-2 rounded text-center w-48">Success</div>
          <div className="bg-red-500 text-white px-4 py-2 rounded text-center w-48">Error</div>
          <div className="bg-yellow-400 text-gray-800 px-4 py-2 rounded text-center w-48">Warning</div>
        </div>
      </div>
    );
  }
  
  export default ToastPage;