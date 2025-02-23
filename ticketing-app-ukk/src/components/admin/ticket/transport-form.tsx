import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSaveTransport, Transport } from "@/services/methods/transport";
import { useFormik } from 'formik';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

interface TransportModalProps {
    isOpen: boolean;
    onClose: () => void;
    transport?: Transport | null;
    isReadOnly: boolean;
  }

  const TransportForm: React.FC<TransportModalProps> = ({ isOpen, onClose, transport, isReadOnly }) => {
    const saveMutation = useSaveTransport();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formik = useFormik<Transport>({
        enableReinitialize: true,
        initialValues: {
          id: transport?.id || 0,
          name_transport: transport?.name_transport || "",
          image: transport?.image || "",
          has_discount:  false,
          description: transport?.description || "",
          type_id: transport?.type_id || 1,
          classes: transport?.classes && transport.classes.length > 0 
          ? transport.classes 
          : [{ class_name: "", seat_count: 20 }],
        },
        onSubmit: (values) => {
          // Validasi manual sebelum submit
          if (!values.name_transport.trim()) {
            setErrorMessage("Nama transportasi wajib diisi!");
            return;
          }
          const isClassesValid = values.classes.every(
            cls => cls.class_name.trim() && Number(cls.seat_count) >= 20
          );
          
          if (!isClassesValid) {
            setErrorMessage("Setiap kelas harus memiliki nama dan jumlah kursi minimal 20!");
            return;
          }

          if (values.classes.some(cls => !cls.class_name.trim() || cls.seat_count < 20)) {
            setErrorMessage("Setiap kelas harus memiliki nama dan jumlah kursi minimal 20!");
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
        if (transport) { 
          formik.resetForm({
            values: {
              id: transport.id,
              name_transport: transport.name_transport,
              image: transport.image,
              has_discount: transport.has_discount,
              description: transport.description,
              type_id: transport.type_id,
              classes: transport.classes.map(cls => ({
                class_name: cls.class_name,
                seat_count: cls.seat_count,
              })),
            }
          });
        } else {
          formik.resetForm();
        }
      }, [transport]);

      useEffect(() => {
        if (isOpen) {
          setErrorMessage(null);
          formik.resetForm();
        }
      }, [isOpen]);

      useEffect(() => {
        return () => {
          if (formik.values.image && typeof formik.values.image !== 'string') {
            URL.revokeObjectURL(URL.createObjectURL(formik.values.image));
          }
        };
      }, [formik.values.image]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">{transport ? "Edit Transportasi" : "Tambah Transportasi"}</DialogTitle>
        </DialogHeader>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Type Id Transport */}
            <div  className="w-full">
                <Label className="block text-sm font-medium">ID Transportasi</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start" disabled={isReadOnly}>
                            {formik.values.type_id === 1 ? "Pesawat" : 
                             formik.values.type_id === 2 ? "Kereta Api" : 
                             "Pilih Type Transportasi"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            textValue="1"
                            className="cursor-pointer"
                            onClick={() => formik.setFieldValue("type_id", 1)}
                            disabled={isReadOnly}
                        >
                            Pesawat
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            textValue="2"
                            className="cursor-pointer"
                            onClick={() => formik.setFieldValue("type_id", 2)}
                            disabled={isReadOnly}
                        >
                            Kereta Api
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

          {/* Nama Transport */}
          <div>
            <Label className="block text-sm font-medium">Nama Transportasi</Label>
            <Input
              name="name_transport"
              value={formik.values.name_transport || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isReadOnly}
            />
          </div>

          {/* Image URL */}
          <div className="items-center">
          <Label className="block text-sm font-medium">Upload Gambar</Label>
            <Input
              type="file"
              className="mt-2 flex items-center"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (!file.type.startsWith('image/')) {
                    setErrorMessage('File harus berupa gambar');
                    return;
                  }
                  if (file.size > 2 * 1024 * 1024) {
                    setErrorMessage('Ukuran file maksimal 2MB');
                    return;
                  }
                  formik.setFieldValue("image", file);
                }
              }}
              disabled={isReadOnly}
            />
            {formik.values.image && (
              typeof formik.values.image === 'string' ? (
                <Image 
                  src={formik.values.image} 
                  alt="Preview" 
                  width={500}
                  height={500}
                  className="mt-2 h-20 w-20 object-cover rounded"
                />
              ) : (
                <Image 
                  src={URL.createObjectURL(formik.values.image)} 
                  alt="Preview" 
                  width={500}
                  height={500}
                  className="mt-2 h-20 w-20 object-cover rounded"
                />
              )
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium">Deskripsi</Label>
            <Textarea name="description" value={formik.values.description || ""} onChange={formik.handleChange} disabled={isReadOnly}/>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formik.values.has_discount}
              onCheckedChange={(value) => formik.setFieldValue("has_discount", value)}
            />
            <label className="text-sm">Transportasi memiliki diskon</label>
          </div>

          <div>
            <Label className="block text-sm font-medium">Kelas & Jumlah Kursi</Label>
            <div className="space-y-2">
              {formik.values.classes.map((classItem, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <Input
                    name={`classes[${index}].class_name`}
                    value={classItem.class_name || ""}
                    onChange={formik.handleChange}
                    placeholder="Nama Kelas"
                    className="w-1/2"
                    disabled={isReadOnly}
                  />
                  <Input
                    type="number"
                    name={`classes[${index}].seat_count`}
                    value={classItem.seat_count || ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      formik.setFieldValue(`classes[${index}].seat_count`, value >= 20 ? value : 20);
                    }}
                    placeholder="Jumlah Kursi"
                    className="w-1/2"
                    disabled={isReadOnly}
                  />
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        formik.setFieldValue("classes", formik.values.classes.filter((_, i) => i !== index))
                      }
                    >
                      Hapus
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {!isReadOnly && (
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() =>
                  formik.setFieldValue("classes", [...formik.values.classes, { class_name: "", seat_count: 20 }])
                }
              >
                + Tambah Kelas
              </Button>
            )}
          </div>

          {/* Tombol Simpan & Batal */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={saveMutation.status === "pending"}>
                {saveMutation.status === "pending" ? "Menyimpan..." : "Simpan"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TransportForm;