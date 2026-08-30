# Home Space

Home Space je klijentska veb aplikacija za pretragu, prikaz i upravljanje nekretninama (kuće, stanovi, vile,
poslovni prostor i studiji). 

# Funkcionalnosti

- Registracija i prijava korisnika (autentifikacija, sesija u `localStorage`)
- Pretraga i filtriranje nekretnina (lokacija sa live predlozima sa OpenStreetMap Nominatim API-ja, broj osoba,
  period, tip nekretnine)
- Paginacija liste rezultata
- Detaljan prikaz nekretnine (galerija, karakteristike, ocena, opis, mapa lokacije)
- Zakazivanje obilaska nekretnine
- Dodavanje/uklanjanje nekretnina u listu omiljenih (Favorites), posebno po korisniku
- Upravljanje korisničkim profilom (izmena podataka, pregled zakazanih obilazaka, odjava)
- Potpuno responzivan dizajn (desktop, tablet, mobilni)

# Tehnologije

React 19 · TypeScript · Vite · react-router-dom v7 · Sass (SCSS) · Context API · OpenStreetMap Nominatim API ·
Web Storage API (localStorage)

# Pokretanje projekta lokalno

```bash
npm install
npm run dev     
npm run build    
npm run preview  
```

# Struktura projekta

```
src/
  components/   – reusable komponente (Navbar, PropertyCard, Button, FormField, StarRating, Pagination, ProtectedRoute)
  pages/        – stranice aplikacije (Home, Login, Register, Properties, PropertyDetails, Favorites, Profile, NotFound)
  context/      – React Context (AuthContext, FavoritesContext)
  services/     – servisni sloj / klase (AuthService, FavoritesService, BookingService, GeoService)
  models/       – TypeScript interfejsi i klase (Property, User, Booking)
  data/         – seed podaci o nekretninama (properties.ts)
  styles/       – globalne SCSS varijable i stilovi
public/images/  – lokalno generisane demo fotografije nekretnina i pozadine (offline-safe, bez spoljnih CDN-ova)
```

# Napomene

- Podaci o nekretninama su seed/demo skup (`src/data/properties.ts`) jer aplikacija nema pravi backend — svi
  korisnički podaci (nalozi, omiljene nekretnine, zakazani obilasci) čuvaju se u `localStorage`.
- Slike nekretnina su generisane lokalno (`public/images`) da bi aplikacija radila i bez pristupa spoljnim
  CDN-ovima za slike; `generate_images.py` (Python + Pillow) pokazuje kako su generisane.
- Pretraga lokacija i mapa na strani nekretnine koriste pravi, besplatan OpenStreetMap Nominatim API (bez ključa).
