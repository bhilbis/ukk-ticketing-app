"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="max-h-screen container mx-auto px-6 mt-[6rem]">
      <Card>
        <CardHeader>
          <CardTitle>Manage Airlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2 sticky top-0 bg-white p-4 z-10">
            <Input 
              type="text" 
              placeholder="Add new airline" 
              value={newAirline} 
              onChange={(e) => setNewAirline(e.target.value)} 
            />
            <Button variant={"secondary"} onClick={addAirline}>Add</Button>
          </div>
          <div className="max-h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <ul className="space-y-2">
                {airlines.map((plane, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
                    {editingIndex === index ? (
                    <Input 
                        type="text" 
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 
                    />
                    ) : (
                    <span>{plane}</span>
                    )}
                    <div className="flex gap-2">
                    {editingIndex === index ? (
                        <Button onClick={saveEditAirline}>Save</Button>
                    ) : (
                        <Button onClick={() => editAirline(index)}>Edit</Button>
                    )}
                    <Button onClick={() => deleteAirline(index)} variant="destructive">Delete</Button>
                    </div>
                </li>
                ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
