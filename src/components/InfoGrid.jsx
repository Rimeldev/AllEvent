import { User, Mail, Calendar, CreditCard } from "lucide-react";

export default function InfoGrid({ data }) {
  const fields = [
    {
      label: "Titulaire",
      value: data.name,
      icon: User,
    },
    {
      label: "Email",
      value: data.email,
      icon: Mail,
    },
    {
      label: "Date d'achat",
      value: data.date,
      icon: Calendar,
    },
    {
      label: "Paiement",
      value: data.payment,
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {fields.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-1 border border-gray-200"
          >
            {/* Label + Icon */}
            <div className="flex items-center text-sm text-gray-500 font-medium gap-2">
              <Icon className="w-4 h-4 text-gray-400" />
              {item.label}
            </div>

            {/* Value */}
            <div className="text-black text-base font-semibold ml-6">
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
