
interface ManagementSectionProps {
  isLast?: boolean;
  title: string;
  children: React.ReactNode;
}
const ManagementSection = ({ title, children, isLast=false }: ManagementSectionProps) => {
  return (
    <div className={`bg-white ${isLast ? 'pt-5' : 'py-5'}`}>
      <h4 className="px-5 py-3 text-gray-900 font-bold">{title}</h4>
      <div className="divide-y divide-gray-200">{children}</div>
    </div>
  );
};

export default ManagementSection