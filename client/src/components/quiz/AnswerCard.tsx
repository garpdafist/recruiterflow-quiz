import { 
  Zap, 
  BarChart3, 
  Calendar, 
  Flame, 
  Bot, 
  TrendingUp, 
  FileSpreadsheet, 
  Users, 
  Cpu, 
  ClipboardList, 
  CalendarCheck, 
  HelpCircle,
  Bell,
  Clock,
  Phone,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  "zap": Zap,
  "bar-chart": BarChart3,
  "calendar": Calendar,
  "flame": Flame,
  "bot": Bot,
  "trending-up": TrendingUp,
  "file-spreadsheet": FileSpreadsheet,
  "users": Users,
  "cpu": Cpu,
  "clipboard-list": ClipboardList,
  "calendar-check": CalendarCheck,
  "help-circle": HelpCircle,
  "bell": Bell,
  "clock": Clock,
  "phone": Phone,
  "x-circle": XCircle
};

const iconColorMap: Record<string, string> = {
  "zap": "text-accent-foreground bg-accent",
  "bar-chart": "text-primary bg-accent",
  "calendar": "text-destructive bg-destructive/10",
  "flame": "text-destructive bg-destructive/10",
  "bot": "text-primary bg-accent",
  "trending-up": "text-destructive bg-destructive/10",
  "file-spreadsheet": "text-muted-foreground bg-muted",
  "users": "text-primary bg-accent",
  "cpu": "text-primary bg-accent",
  "clipboard-list": "text-accent-foreground bg-accent",
  "calendar-check": "text-primary bg-accent",
  "help-circle": "text-muted-foreground bg-muted",
  "bell": "text-accent-foreground bg-accent",
  "clock": "text-primary bg-accent",
  "phone": "text-accent-foreground bg-accent",
  "x-circle": "text-destructive bg-destructive/10"
};

interface AnswerCardProps {
  label: string;
  subtext: string;
  icon: string;
  isSelected?: boolean;
  onClick: () => void;
  testId?: string;
}

export function AnswerCard({
  label,
  subtext,
  icon,
  isSelected = false,
  onClick,
  testId
}: AnswerCardProps) {
  const IconComponent = iconMap[icon] || HelpCircle;
  const iconColors = iconColorMap[icon] || "text-gray-500 bg-gray-100";
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full p-5 md:p-6 rounded-xl border-2 text-left transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "hover:border-primary/40 hover:shadow-md hover:scale-[1.02]",
        isSelected
          ? "border-primary bg-accent shadow-md"
          : "border-border bg-card"
      )}
      data-testid={testId}
      aria-pressed={isSelected}
    >
      <div className="flex flex-col gap-3">
        <div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
            iconColors
          )}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            {label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {subtext}
          </p>
        </div>
      </div>
    </button>
  );
}
