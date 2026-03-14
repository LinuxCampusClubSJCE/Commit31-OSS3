import useAuth from "../context/useAuth";

function Dashboard() {
  
  const { user } = useAuth();
  
  
  
  return (
    <section className="min-h-[70vh] bg-white py-12 px-4 mt-15 flex flex-col items-center justify-start">
      <div className=" w-auto inline-block px-4 py-2 font-mono font-bold bg-green-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
        <h1 className="text-3xl"> Welcome <span className="text-white">{user?.name}</span></h1>
      </div>
    </section>
  )
  
}



export default Dashboard; 