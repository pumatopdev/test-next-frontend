"use client";

import React, { useEffect, useState } from "react";

type ColorPickProps = {
  initialColor?: string | null;
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickProps> = ({ initialColor, onColorChange }) => {
  const colors = [
    { name: "Red", value: "bg-c-red" },
    { name: "Orange", value: "bg-c-orange" },
    { name: "Yellow", value: "bg-c-yellow" },
    { name: "Green", value: "bg-c-green" },
    { name: "Blue", value: "bg-c-blue" },
    { name: "Indigo", value: "bg-c-indigo" },
    { name: "Purple", value: "bg-c-purple" },
    { name: "Pink", value: "bg-c-pink" },
    { name: "Brown", value: "bg-c-brown" },
  ];

  const [selectedColor, setSelectedColor] = useState<string>(initialColor || '');

  useEffect(() => {
    if (initialColor) {
      setSelectedColor(initialColor);
    }
  }, [initialColor]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div className="w-full flex flex-wrap gap-3">
      {colors.map((color) => (
          <div
            key={color.name}
            className={`w-[52px] h-[52px] rounded-full cursor-pointer ${
              selectedColor === color.value ? "border-white border-2" : "border-transparent border-2"
            } ${color.value}`}
            onClick={() => handleColorSelect(color.value)}
          />
        )
      )}
    </div>
  );
};

export default ColorPicker;
