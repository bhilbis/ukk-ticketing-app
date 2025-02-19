

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Routes, useSaveRoute } from '@/services/methods/route';
import { useTransports } from '@/services/methods/transport';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

interface RouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    route?: Routes | null;
}

const RouteForm: React.FC<RouteModalProps> = ({ isOpen, onClose, route }) => {
    const { data  } = useTransports();
    const saveMutation = useSaveRoute();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formik = useFormik<Routes>({
        enableReinitialize: false,
        initialValues: {
            id: route?.id || 0,
            destination: route?.destination || "",
            start_route: route?.start_route || "",
            end_route: route?.end_route || "",
            price: route?.price || 0,
            travel_duration: route?.travel_duration || "",
            transport_id: route?.transport_id || 2,
        },
        onSubmit: (values) => {
            // Validasi manual sebelum submit
            if (!values.destination.trim()) {
                setErrorMessage("Tujuan wajib diisi!");
                return;
            }
            if (!values.start_route.trim()) {
                setErrorMessage("Rute awal wajib diisi!");
                return;
            }
            if (!values.end_route.trim()) {
                setErrorMessage("Rute akhir wajib diisi!");
                return;
            }
            if (values.price <= 0) {
                setErrorMessage("Harga harus lebih dari 0!");
                return;
            }
            if (!values.travel_duration.trim()) {
                setErrorMessage("Durasi perjalanan wajib diisi!");
                return;
            }

            setErrorMessage(null); // Reset error jika validasi lolos

            saveMutation.mutate(values, {
                onSuccess: () => {
                    onClose();
                },
            });
        },
    });

    useEffect(() => {
        if (route && !formik.dirty) {
            formik.resetForm({
                values: {
                    id: route.id,
                    destination: route.destination,
                    start_route: route.start_route,
                    end_route: route.end_route,
                    price: route.price,
                    travel_duration: route.travel_duration,
                    transport_id: route.transport_id,
                }
            });
        }
    }, [route]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle  className="text-center">
                        {route ? "Edit" : "Tambah"} Rute
                    </DialogTitle>
                </DialogHeader>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="w-full">
                                <Label className="text-sm font-medium">Tujuan</Label>
                                <Input
                                    name="destination"
                                    placeholder='Jakarta'
                                    value={formik.values.destination}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                        </div>

                        {/*  */}
                        <div className='w-full'>
                            <Label className='text-sm font-medium'>Rute Awal</Label>
                            <Input 
                                name='start_route'
                                placeholder='Bandung'
                                value={formik.values.start_route}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {/*  */}
                        <div className='w-full'>
                            <Label className='text-sm font-medium'>Rute Akhir</Label>
                            <Input 
                                name='end_route'
                                placeholder='Jakarta'
                                value={formik.values.end_route}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        
                        {/*  */}
                        <div className='w-full'>
                            <Label className='text-sm font-medium'>Harga</Label>
                            <Input 
                                name='price'
                                type='number'
                                placeholder='200000'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <div className='w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>
                            <div>
                                <Label className='text-sm font-medium'>Durasi Perjalanan</Label>
                                <Input
                                    type='time'
                                    name='travel_duration'
                                    value={formik.values.travel_duration}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="00:00"
                                    max="10:00"
                                    className='w-full !block'
                                />
                            </div>

                            {/*  */}
                            <div>
                                <Label className='text-sm font-medium'>Transportasi</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                        {formik.values.transport_id
                                            ? data?.find((transport) => transport.id === formik.values.transport_id)?.name_transport || "Pilih Transportasi"
                                            : "Pilih Transportasi"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='start' className='w-72 lg:w-56 max-w-none'>
                                        {data?.map((transport) => (
                                            <DropdownMenuItem
                                                key={transport.id}
                                                textValue={transport.id.toString()}
                                                className="cursor-pointer"
                                                onClick={() => formik.setFieldValue("transport_id", transport.id)}
                                            >
                                                {transport.name_transport}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        {/*  */}
                        <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={saveMutation.status === "pending"}>
                            {saveMutation.status === "pending" ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                    </form>
                </DialogContent>
        </Dialog>
    )
}

export default RouteForm