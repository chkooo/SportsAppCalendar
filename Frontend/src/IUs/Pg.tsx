import UserETB from "../components/editables/UserETB";

function Pg() {
  return (
    <div className="relative bg-fuchsia-500 flex flex-col items-center justify-start h-screen pt-4">
      <UserETB user={{ id: '', name: '', email: '', phone: null }} onClose={() => {}} onSave={async () => {}} />
    </div>
  );
}

export default Pg;