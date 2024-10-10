import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface ClockProps {
  timeZone?: string; // Ejemplo: "America/New_York"
}

const Clock: React.FC<ClockProps> = ({ timeZone }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(timerId);
  }, []);

  // Determina la zona horaria, usa local si no se especifica
  const zone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Convierte la hora actual a la zona horaria especificada
  const zonedDate = toZonedTime(currentTime, zone);
  
  // Formatea la fecha y hora
  const formattedTime = format(zonedDate, 'HH:mm:ss');

  const formattedDate = format(zonedDate, 'EEEE, d MMMM yyyy');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md text-white">
      <div className="text-4xl font-bold">{formattedTime}</div>
      <div className="mt-2 text-lg">{formattedDate}</div>
      {timeZone && (
        <div className="mt-1 text-sm text-gray-300">{zone.split("/")[1].replace("_"," ")}</div>
      )}
    </div>
  );
};

export default Clock;
