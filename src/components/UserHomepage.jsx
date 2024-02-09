import UserHomepageHeader from "./UserHomepageHeader";
import ArticlesList from "./ArticlesList";
import Sidebar from "./Sidebar";

export default function UserHomepage() {
  return (
    <>
      <UserHomepageHeader />
      <section id="homepage--content">
        <Sidebar />
        <ArticlesList />
      </section>
    </>
  );
}
