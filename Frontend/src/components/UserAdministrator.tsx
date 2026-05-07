import { useEffect, useState, useCallback } from "react";
import UserAdminTB from "./DashboardComponents/UserAdminTB";
import UserCTB from "./editables/UserCTB";
import UserETB from "./editables/UserETB";
import { apiFetch } from "../api_url";
import type { UserRow, UserRole, PaginatedResponse, UserWithMemberships } from "../types/user";
import { ConfirmModal } from "./ui/Modal";

interface EditingUser extends UserRow {
  avatarUrl: string | null;
}

function UserAdministrator() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<{id: string, name: string}[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await apiFetch("/clients");
        const data = await res.json();
        setClients(data);
        if (data.length > 0) {
          setSelectedClientId(data[0].id);
        }
      } catch (e) {
        console.error("Error fetching clients:", e);
      }
    };
    fetchClients();
  }, []);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "">("");
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", limit.toString());
      if (search) params.set("q", search);
      if (roleFilter) params.set("role", roleFilter);
      if (statusFilter) params.set("status", statusFilter);
      if (selectedClientId) params.set("clientId", selectedClientId);

      const response = await apiFetch(`/users?${params}`);
      const data: PaginatedResponse<UserWithMemberships> = await response.json();
      
      const rows: UserRow[] = data.data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.memberships[0]?.role || "CUSTOMER",
        status: u.active ? "Activo" : "Inactivo",
        active: u.active,
      }));
      
      setUsers(rows);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      showToast("Error al cargar usuarios", "error");
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleToggle = async (id: string, currentStatus: string) => {
    const newActive = currentStatus !== "Activo";
    try {
      const response = await apiFetch(`/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: newActive }),
      });
      if (!response.ok) throw new Error("Error al actualizar");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, active: newActive, status: newActive ? "Activo" : "Inactivo" }
            : u
        )
      );
      showToast(`Usuario ${newActive ? "activado" : "desactivado"}`, "success");
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      showToast("Error al cambiar estado", "error");
    }
  };

  const handleEdit = (user: UserRow) => {
    setEditingUser({
      ...user,
      phone: user.phone || "",
      avatarUrl: null,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedData: { name: string; phone: string; avatarUrl: string; role?: UserRole }) => {
    try {
      // Check if role changed
      if (updatedData.role && updatedData.role !== editingUser?.role && selectedClientId) {
        await apiFetch(`/users/${editingUser!.id}/role`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: updatedData.role,
            clientId: selectedClientId,
          }),
        });
      }

      const response = await apiFetch(`/users/${editingUser!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedData.name,
          phone: updatedData.phone,
          avatarUrl: updatedData.avatarUrl,
        }),
      });
      if (!response.ok) throw new Error("Error al actualizar usuario");

      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser!.id
            ? {
                ...u,
                name: updatedUser.name,
                phone: updatedUser.phone,
                role: updatedData.role || u.role,
              }
            : u
        )
      );
      setShowEditModal(false);
      setEditingUser(null);
      showToast("Usuario actualizado", "success");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      showToast("Error al guardar cambios", "error");
    }
  };

  const handleCreate = async (data: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    password: string;
  }) => {
    try {
      const response = await apiFetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          clientId: selectedClientId || undefined,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al crear usuario");
      }
      
      setShowCreateModal(false);
      showToast("Usuario creado exitosamente", "success");
      fetchUsers();
    } catch (error: any) {
      showToast(error.message, "error");
      throw error;
    }
  };

  const handleDeleteClick = (user: UserRow) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setDeleting(true);
    try {
      const response = await apiFetch(`/users/${deletingUser.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar");
      
      showToast("Usuario eliminado", "success");
      setShowDeleteModal(false);
      setDeletingUser(null);
      fetchUsers();
    } catch (error) {
      showToast("Error al eliminar usuario", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div className="h-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-white flex items-center justify-start flex-col gap-6 p-6">
      <h1 className="text-4xl font-black tracking-tighter italic text-gray-800 dark:text-white">
        GESTIÓN DE USUARIOS
      </h1>

      {/* Filters Row */}
      <div className="w-full flex flex-wrap gap-3 items-center">
        {/* Client Selector */}
        {clients.length > 0 && (
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-4 py-2 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value as UserRole | "");
            setPage(1);
          }}
          className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los roles</option>
          <option value="ADMIN">Administrador</option>
          <option value="STAFF">Staff</option>
          <option value="CUSTOMER">Cliente</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as "active" | "inactive" | "");
            setPage(1);
          }}
          className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
      </div>

      <button
        onClick={() => setShowCreateModal(true)}
        className="mt-1 self-start bg-blue-500 text-white border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg font-bold py-2 px-6 hover:bg-blue-400 transition-all tracking-tight uppercase text-sm"
      >
        + Registrar Nuevo Usuario
      </button>

      <div className="w-full flex flex-col gap-0 bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-700">
        {/* HEADER */}
        <div className="w-full grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_2fr] gap-4 px-4 py-4 bg-gray-100 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700">
          {["ID", "Nombre", "Email", "Teléfono", "Rol", "Estado", "Acciones"].map((head, i) => (
            <div
              key={head}
              className={`text-gray-500 dark:text-gray-500 font-black text-[10px] uppercase tracking-widest ${
                i === 5 ? "text-center" : i === 6 ? "text-right" : ""
              }`}
            >
              {head}
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="w-full max-h-[500px] overflow-y-auto p-4 flex flex-col gap-2">
          {loading ? (
            <div className="py-10 text-center text-gray-400 dark:text-zinc-500 animate-pulse font-bold">
              Cargando datos...
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserAdminTB
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                role={user.role}
                status={user.status}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="py-10 text-center text-gray-400 dark:text-zinc-500 italic">
              No hay usuarios registrados en el sistema.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-700">
            <div className="text-sm text-gray-500 dark:text-zinc-400">
              Página {page} de {totalPages} ({total} usuarios)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-zinc-600"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-zinc-600"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <UserCTB onClose={() => setShowCreateModal(false)} onSave={handleCreate} />
      )}

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <UserETB
          user={editingUser}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDelete}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que deseas eliminar a "${deletingUser?.name}"? Esta acción desactivará al usuario.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        loading={deleting}
      />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default UserAdministrator;