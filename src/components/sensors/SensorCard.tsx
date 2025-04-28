
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  withAnimation?: boolean;
  animationDelay?: string;
  alert?: boolean;
  onClick?: () => void;
}

const SensorCard = ({ 
  title, 
  children, 
  icon, 
  className, 
  withAnimation = true,
  animationDelay = 'animation-delay-0',
  alert = false,
  onClick
}: SensorCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "sensor-card flex flex-col p-4 rounded-lg border",
        "bg-white",
        withAnimation && "animate-fade-in",
        animationDelay,
        alert ? "border-2 border-red-500" : "border-border",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-between mb-3",
        alert && "text-red-500"
      )}>
        <h3 className={cn(
          "text-sm font-medium",
          alert ? "text-red-500" : "text-muted-foreground"
        )}>
          {title}
        </h3>
        {icon && <div className={alert ? "text-red-500" : "text-muted-foreground"}>{icon}</div>}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default SensorCard;

