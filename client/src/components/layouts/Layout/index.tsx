import Header from "../../elements/Header";
import "./index.scss";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
