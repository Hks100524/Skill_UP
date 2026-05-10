import Sidebar from "../../components/aptitude/Sidebar";
import Header from "../../components/aptitude/Header";
import CategoryCard from "../../components/aptitude/CategoryCard";
import Topbar from "../../components/aptitude/Topbar";
import { aptitudeSyllabus, getCategoryStats } from "../../data/topicsData";

export default function Technical() {
  const { title, subtitle, groups } = aptitudeSyllabus.technical;
  const { groupCount, topicCount } = getCategoryStats("technical");

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Topbar subtitle={title} />

        <Header
          title={title}
          subtitle={subtitle}
          groupCount={groupCount}
          topicCount={topicCount}
        />

        <div className="grid grid-cols-2 gap-6">
          {groups.map((group) => (
            <CategoryCard
              key={group.title}
              title={group.title}
              category="technical"
              items={group.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
