function UserAdminTB({
  id,
  name,
  email,
  phone,
  role,
  status,
}: {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
}) {
  return (
    <div className="w-full h-4 text-sm text-gray-100 flex justify-around items-center bg-white/10 border border-t-2 border-l-2 border-gray-500 rounded-lg p-2">
      <div>{id}</div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{role}</div>
      <div>{status}</div>
      <div>Acciones</div>
    </div>
  );
}

export default UserAdminTB;
