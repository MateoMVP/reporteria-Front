"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AXIOS from "@/app/config/axios";

interface ButtonProps {
  ruta: string;
}

const Button: React.FC<ButtonProps> = ({ ruta }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [users, setUsers] = React.useState<
    {
      name: string;
      username: string;
    }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleGoHome = () => {
    router.push(ruta);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AXIOS.get<
          | {
              name: string;
              username: string;
            }[]
          | {
              error: string;
            }
        >("/tecnicos/username");

        if ("error" in response.data) {
          console.error(response.data.error);
          setError(response.data.error);
        } else {
          setUsers(response.data);
        }
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setError("Error al obtener los usuarios.");
      }
    };

    fetchUsers();
  }, []);
  const deleteUser = async (username: string) => {
    if (!confirm("Delete user?")) {
      return;
    }
    try {
      await AXIOS.delete(`/tecnicos/${username}`);
      setUsers((prev) => prev.filter((user) => user.username !== username));
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      setError("Error al eliminar el usuario.");
    }
  };
  return (
    <div className="grid grid-cols-2 w-full">
      <button
        onClick={handleGoHome}
        className="right-0 top-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go home
      </button>
      <button
        onClick={() => setOpenModal(true)}
        className="right-0 top-0 m-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        All users
      </button>
      {openModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg "
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      All users
                    </h3>
                    <div className="mt-2 w-full">
                      <p className="text-sm text-gray-500">List of all users</p>
                      <ul className="mt-4 w-full">
                        {users.map((user, index) => (
                          <li
                            key={index}
                            className="flex justify-between w-full"
                          >
                            <div>
                              {user.name} ({user.username})
                            </div>
                            <div>
                              <button
                                onClick={() => deleteUser(user.username)}
                                type="button"
                                name="delete"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
