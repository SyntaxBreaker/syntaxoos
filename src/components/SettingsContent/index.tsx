interface SettingsContentProps {
  activeComponent: React.ReactNode;
}

function SettingsContent({ activeComponent }: SettingsContentProps) {
  return (
    <div className="flex flex-col gap-4 py-4 px-2 w-full">{activeComponent}</div>
  );
}

export default SettingsContent;
