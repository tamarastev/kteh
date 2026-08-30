import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { bookingService } from "../services/BookingService";
import Button from "../components/Button";
import FormField from "../components/FormField";
import "./Profile.scss";

type Tab = "notifications" | "security" | "payments" | "settings" | "support";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("notifications");

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [userLocation, setUserLocation] = useState(user?.location ?? "");

  if (!user) return null;

  const bookings = bookingService.getBookingsForUser(user.email);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ fullName, phone, location: userLocation });
    setEditing(false);
  };

  return (
    <div className="hs-profile">
      <div className="hs-container hs-profile__wrap">
        <div className="hs-profile__card">
          <div className="hs-profile__head">
            <div className="hs-profile__avatar">{user.getInitials()}</div>
            <div>
              <h2>{user.fullName}</h2>
              <span>{user.getMembershipLabel()}</span>
            </div>
            <div className="hs-profile__actions">
              <Button variant="outline" onClick={() => setEditing((v) => !v)}>
                {editing ? "Cancel" : "Edit profile"}
              </Button>
              <Button variant="outline" onClick={() => setActiveTab("support")}>
                Customer support
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>

          {editing ? (
            <form className="hs-profile__edit-form" onSubmit={handleSave}>
              <FormField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <FormField
                label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FormField
                label="Location"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
              <Button type="submit">Save changes</Button>
            </form>
          ) : (
            <div className="hs-profile__body">
              <div className="hs-profile__info">
                <h3>Personal information:</h3>
                <div>
                  <span className="hs-profile__label">Full Name</span>
                  <span>{user.fullName}</span>
                </div>
                <div>
                  <span className="hs-profile__label">Email</span>
                  <span>{user.email}</span>
                </div>
                <div>
                  <span className="hs-profile__label">Phone number</span>
                  <span>{user.phone || "—"}</span>
                </div>
                <div>
                  <span className="hs-profile__label">Location</span>
                  <span>{user.location || "—"}</span>
                </div>
              </div>

              <div className="hs-profile__menu">
                <button onClick={() => navigate("/favorites")}>Saved properties</button>

                {(
                  [
                    ["notifications", "Notifications"],
                    ["security", "Security"],
                    ["payments", "Payments"],
                    ["settings", "Settings"],
                  ] as [Tab, string][]
                ).map(([tab, label]) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? "hs-profile__menu-item--active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {label}
                  </button>
                ))}

                <div className="hs-profile__tab-content">
                  {activeTab === "support" && (
                    <p>
                      Za podršku nas kontaktirajte na <strong>011 111 111</strong> ili na{" "}
                      <strong>homespace@example.com</strong>.
                    </p>
                  )}
                  {activeTab === "notifications" &&
                    (bookings.length === 0 ? (
                      <p>Nemate zakazanih obilazaka.</p>
                    ) : (
                      <ul className="hs-profile__bookings">
                        {bookings.map((b) => (
                          <li key={b.id}>
                            Zakazan obilazak za <strong>{b.propertyTitle}</strong> —{" "}
                            {b.visitDate}
                          </li>
                        ))}
                      </ul>
                    ))}
                  {activeTab === "security" && <p>Promena lozinke i podešavanja bezbednosti.</p>}
                  {activeTab === "payments" && <p>Nema sačuvanih načina plaćanja.</p>}
                  {activeTab === "settings" && <p>Podešavanja obaveštenja i jezika aplikacije.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
