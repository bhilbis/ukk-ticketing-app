/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRoutes } from '@/services/methods/fetch-route';
import { Schedule, useSaveSchedule } from '@/services/methods/schedule';
import { useFormik } from 'formik';
import { Plane, TrainFront } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface RouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    schedule?: Schedule | null;
    isReadOnly: boolean;
}

const ScheduleForm: React.FC<RouteModalProps> = ({ isOpen, onClose, schedule, isReadOnly }) => {
    const { data } = useRoutes();
    const saveMutation = useSaveSchedule();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formatTime = (time: string) => {
        return time ? time.slice(0, 5) : "";
    };
    
    const formik = useFormik<Schedule>({
        enableReinitialize: true,
        initialValues: {
            id: schedule?.id || 0,
            departure_date: schedule?.departure_date || "",
            departure_time: schedule?.departure_time ? formatTime(schedule.departure_time) : "",
            route_ids: schedule?.routes 
            ? schedule.routes.map(route => route.id) 
            : schedule?.route_ids || [],
        },
        onSubmit: (values) => {
            if (!values.departure_date.trim()) {
                setErrorMessage("Tanggal keberangkatan wajib diisi!");
                return;
            }
            if (!values.departure_time.trim()) {
                setErrorMessage("Jam keberangkatan wajib diisi!");
                return;
            }
            if (!values.route_ids.length) {
                setErrorMessage("Rute wajib diisi!");
                return;
            }

            setErrorMessage(null);

            saveMutation.mutate(values, {
                onSuccess: () => {
                    toast.success(schedule ? "Jadwal berhasil diperbarui!" : "Jadwal berhasil ditambahkan!");
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Failed to save schedule");
                }
            });
        },
    });

    // Initialize selected routes when editing
    useEffect(() => {
        if (schedule && isOpen) {
            const ids = schedule.routes 
                ? schedule.routes.map(route => route.id)
                : schedule.route_ids || [];
                
            formik.setFieldValue("route_ids", ids);
        }
    }, [schedule, isOpen]);

    const handleRouteSelect = (routeId: number) => {
        const currentIds = formik.values.route_ids;
        const updatedIds = currentIds.includes(routeId)
            ? currentIds.filter(id => id !== routeId)
            : [...currentIds, routeId];
            
        formik.setFieldValue("route_ids", updatedIds);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {schedule ? "Edit" : "Tambah"} Rute
                    </DialogTitle>
                </DialogHeader>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="w-full">
                        <Label className="text-sm font-medium">Tanggal Keberangkatan</Label>
                        <Input
                            type="date"
                            name="departure_date"
                            value={formik.values.departure_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full !block"
                            min={today}
                            disabled={isReadOnly}
                        />
                    </div>

                    <div className="w-full">
                        <Label className="text-sm font-medium">Jam Keberangkatan</Label>
                        <Input
                            type="time"
                            name="departure_time"
                            value={formik.values.departure_time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            min="00:00"
                            className="w-full !block"
                            disabled={isReadOnly}
                        />
                    </div>
                    
                    <div>
                        <Label className="text-sm font-medium">Rute</Label>
                        <div className="space-y-2">
                            {data?.map((route) => (
                                <div key={route.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={formik.values.route_ids.includes(route.id)}
                                        onCheckedChange={() => handleRouteSelect(route.id)}
                                        disabled={isReadOnly}
                                    />
                                    {route.transport?.type_id === 1 ? (
                                        <Plane className='w-5 h-5 text-blue-500'/>
                                    ) : (
                                        <TrainFront className='w-5 h-5 text-yellow-500' />
                                    )}
                                    <span>{route.start_route} - {route.end_route}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={saveMutation.status === "pending" || isReadOnly}>
                            {saveMutation.status === "pending" ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleForm;