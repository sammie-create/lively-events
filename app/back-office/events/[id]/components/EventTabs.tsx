type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
};

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "guests", label: "Guests" },
  { key: "registration", label: "Registration" },
  { key: "blasts", label: "Blasts" },
  { key: "insights", label: "Insights" },
];

function EventTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-6 px-24">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`text-sm pb-2 ${
            activeTab === tab.key
              ? "text-[#F47B20] border-b-2 border-[#F47B20]"
              : "text-[#7F8389] hover:text-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default EventTabs;
