"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";

export default function AirlinesAdmin() {
  const [airlines, setAirlines] = useState([
    "Boeing 737-800", 
    "Boeing 737-900", 
    "Airbus A320", 
    "ATR 72", 
    "Bombardier CRJ1000", 
    "Airbus A330"
  ]);
  const [newAirline, setNewAirline] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const addAirline = () => {
    if (newAirline.trim()) {
      setAirlines([...airlines, newAirline]);
      setNewAirline("");
    }
  };

  const deleteAirline = (index: number) => {
    setAirlines(airlines.filter((_, i) => i !== index));
  };

  const editAirline = (index: number) => {
    setEditingIndex(index);
    setEditValue(airlines[index]);
  };

  const saveEditAirline = () => {
    const updatedAirlines = [...airlines];
    if (editingIndex !== null) {
      updatedAirlines[editingIndex] = editValue;
    }
    setAirlines(updatedAirlines);
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="max-h-screen w-full mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">
          Manage Airlines
        </h1>
        <div className="relative ">
          <div className="mb-4 flex gap-2 sticky top-0 bg-white p-4 z-10">
            <Input 
              type="text" 
              placeholder="Add new airline" 
              value={newAirline} 
              onChange={(e) => setNewAirline(e.target.value)} 
            />
            <Button onClick={addAirline}><Plus /></Button>
          </div>
          <div className="max-h-[60dvh] overflow-y-auto">
            {/* <ul className="space-y-2 overflow-y-auto"> */}
                {airlines.map((plane, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
                    {editingIndex === index ? (
                    <Input 
                        type="text" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 
                        className="mr-2"
                    />
                    ) : (
                    <span>{plane}</span>
                    )}
                    <div className="flex gap-2">
                    {editingIndex === index ? (
                        <Button onClick={saveEditAirline}><Check /></Button>
                    ) : (
                        <Button onClick={() => editAirline(index)}><Pencil /></Button>
                    )}
                    <Button onClick={() => deleteAirline(index)} variant="destructive"><Trash2 /></Button>
                    </div>
                </div>
                ))}
            {/* </ul> */}
          </div>
        </div>
    </div>
  );
}
