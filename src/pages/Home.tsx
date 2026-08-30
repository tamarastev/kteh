import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { IconVerified, IconHandshake, IconClock, IconShield, IconHome } from "../components/Icons";
import "./Home.scss";

const perks = [
  { Icon: IconVerified, label: "Verified Listings" },
  { Icon: IconHandshake, label: "Trusted Agents" },
  { Icon: IconClock, label: "24/7 Support" },
  { Icon: IconShield, label: "Secure Payments" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="hs-home">
      <section className="hs-hero">
        <div className="hs-hero__overlay" />
        <div className="hs-container hs-hero__content">
          <h1>
            Find your
            <br />
            perfect
            <br />
            home
          </h1>
          <p>Your perfect home is just a click away.</p>
          <Button className="hs-hero__cta" onClick={() => navigate("/properties")}>
            <IconHome size={17} />
            Explore Properties...
          </Button>
        </div>
      </section>

      <section className="hs-container hs-perks">
        {perks.map(({ Icon, label }) => (
          <div className="hs-perks__item" key={label}>
            <span className="hs-perks__icon">
              <Icon />
            </span>
            <span>{label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
