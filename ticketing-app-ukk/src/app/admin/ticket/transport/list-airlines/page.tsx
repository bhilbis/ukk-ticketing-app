/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { useTransports, useDeleteTransport } from "@/services/methods/transport";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, Eye, PlusIcon } from "lucide-react";
import TransportForm from "@/components/admin/ticket/transport-form";
import Image from "next/image";
import TransportDetailModal from "@/components/admin/ticket/transport-detail";
import { useAuth } from "@/context/AuthContext";

export default function TransportList() {
  const {userLevel} = useAuth();
  const { data  } = useTransports();
  const deleteMutation = useDeleteTransport();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleShow = (transport: any) => {
    setSelectedTransport(transport);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (transport: any) => {
    setSelectedTransport(transport);
    setIsModalOpen(true);
    setIsReadOnly(false);
  };

  const handleAdd = () => {
    setSelectedTransport(null);
    setIsModalOpen(true);
    setIsReadOnly(false);
  };

  return (
    <div className="p-8 w-full min-h-screen flex flex-col space-y-6">
      <div className="max-w-7xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Daftar Transportasi
        </h1>

        {/* Section Pesawat */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full">
              <svg className="text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Pesawat</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.filter(t => t.type_id === 1).map((transport) => (
              <div key={transport.id} className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={transport.image
                      ? typeof transport.image === "string"
                        ? transport.image.startsWith("http")
                          ? transport.image
                          : `${BASE_URL}${transport.image}`
                        : transport.image instanceof File
                        ? URL.createObjectURL(transport.image)
                        : "/airplane/clouds.jpg"
                      : "/airplane/clouds.jpg"}
                    alt={transport.name_transport}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{transport.name_transport}</h3>
                  <p className="text-gray-600 text-sm min-h-[60px] line-clamp-3">
                    {transport.description || "Tidak ada deskripsi"}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShow(transport)}
                      className="text-gray-600 hover:bg-blue-100 rounded-full"
                      title="Detail Transportasi"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                    {userLevel && userLevel === 1 && (
                      <>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(transport)}
                        className="text-blue-600 hover:bg-gray-50 rounded-full"
                        title="Edit Transportasi"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMutation.mutate(transport.id)}
                        className="text-red-600 hover:bg-red-50 rounded-full"
                        title="Hapus Transportasi"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Kereta Api */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.3c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Kereta Api</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.filter(t => t.type_id === 2).map((transport) => (
              <div key={transport.id} className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={transport.image
                      ? typeof transport.image === "string"
                        ? transport.image.startsWith("http")
                          ? transport.image
                          : `${BASE_URL}${transport.image}`
                        : transport.image instanceof File
                        ? URL.createObjectURL(transport.image)
                        : "/airplane/clouds.jpg"
                      : "/airplane/clouds.jpg"}
                    alt={transport.name_transport}
                    width={400}
                    height={200}
                    className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{transport.name_transport}</h3>
                  <p className="text-gray-600 text-sm min-h-[60px] line-clamp-3">
                    {transport.description || "Tidak ada deskripsi"}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShow(transport)}
                      className="text-gray-600 hover:bg-blue-100 rounded-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(transport)}
                      className="text-blue-600 hover:bg-gray-50 rounded-full"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMutation.mutate(transport.id)}
                      className="text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {userLevel && userLevel === 1 && (
        <div className='fixed bottom-8 right-8'>
          <Button 
            onClick={handleAdd}
            className="rounded-full px-6 py-6 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
            <PlusIcon className="w-5 h-5 mr-2 text-white" />
            <span className="text-white font-semibold">Tambah Transportasi</span>
          </Button>
        </div>
      )}

      {isModalOpen && (
        <TransportForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transport={selectedTransport}
          isReadOnly={isReadOnly}
        />
      )}
      {isDetailModalOpen && (
        <TransportDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          transport={selectedTransport}
        />
      )}
    </div>
  );
}
