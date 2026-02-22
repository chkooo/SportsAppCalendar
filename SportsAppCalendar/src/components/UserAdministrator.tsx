import UserAdminTB from "./DashboardComponents/UserAdminTB";

function UserAdministrator() {
  return (
    <div className="h-full bg-zinc-900 text-white flex items-center justify-start flex-col gap-6">
      <h1 className="text-4xl font-bold">Gestión de Usuarios</h1>
      <button className="mt-3 bg-blue-400 text-gray-200 border border-t-2 border-l-2 border-zinc-800 rounded-lg font-bold py-2 px-4 hover:bg-blue-500 tracking-tight">
        +Agregar Usuario
      </button>
      <div className="w-full h-48 bg-zinc-800 flex items-center px-4 flex-col gap-4">
        <div className="w-full h-4 text-sm text-gray-100 flex justify-between items-center bg-white/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2">
          <div>ID</div>
          <div>Nombre</div>
          <div>Email</div>
          <div>Telefono</div>
          <div>Rol</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        <UserAdminTB
          id="1"
          name="Juan Pérez"
          email="juan@correo.com"
          phone="6561234567"
          role="Usuario"
          status="Activo"
        />
      </div>
    </div>
  );
}

export default UserAdministrator;
