import "./Collage.css";

const topStripPhotos = [
  {
    image: "/images/site/collage/pizzeria4.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/pizzeria4.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/pizzeria4.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/pizzeria4.jpg",
    alt: "Bild från Felino Pizza",
  },
];

export default function Collage() {
  return (
    <section className="collageSection">
      <div className="sectionCornerLabel collageSectionLabel">Om Felino</div>

      <div className="collageEditorial">
        <div className="collageLines" aria-hidden="true">
          <svg
            className="collageLine collageLine--leftToFeature"
            viewBox="0 0 260 140"
          >
            <path
              d="M18 12 C70 128, 180 24, 232 68"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M220 54 L234 68 L216 71"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="collageLine collageLine--rightToFeature"
            viewBox="0 0 260 140"
          >
            <path
              d="M242 112 C290 28, 82 24, 30 68"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M44 54 L30 68 L48 71"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="collageLine collageLine--featureToWide"
            viewBox="0 0 120 150"
          >
            <path
              d="M62 10 C66 46, 66 80, 42 124"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M52 112 L42 126 L58 120"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="collageLine collageLine--bottomLeft"
            viewBox="0 0 220 90"
          >
            <path
              d="M16 26 C74 80, 154 78, 206 48"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M194 38 L208 48 L192 52"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            className="collageLine collageLine--bottomRight"
            viewBox="0 0 220 90"
          >
            <path
              d="M204 24 C146 78, 66 76, 14 48"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M28 38 L14 48 L30 52"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="collageTopStrip">
          {topStripPhotos.map((photo, index) => (
            <div key={index} className="collageTopPhoto">
              <div className="collageTape" />
              <img src={photo.image} alt={photo.alt} />
            </div>
          ))}
        </div>

        <div className="collageHeading">
          <span className="collageEyebrow">Vår historia</span>
          <h2>En kvartersrestaurang med tempo, värme och personlighet.</h2>
          <p>
            Felino Pizza är byggt kring en enkel idé: att det ska vara lätt att
            få riktigt god mat, men att upplevelsen ändå ska kännas mänsklig,
            personlig och levande. Vi vill vara ett ställe som passar både den
            snabba lunchen, den spontana middagen och kvällarna när man bara
            vill hamna rätt.
          </p>
        </div>

        <div className="collageGrid">
          <aside className="collageColumn collageColumn--left">
            <div className="collageCard collageCard--text">
              <span className="collageCardLabel">Bakom namnet</span>
              <p>
                Felino startade som en tanke om att kombinera fart med känsla.
                Inte stelt, inte överarbetat — bara en plats med bra rytm, bra
                människor och en atmosfär som känns självklar från första
                steget in.
              </p>
            </div>

            <div className="collageQuote">
              “Vi vill att det ska kännas varmt direkt, även när allt går
              snabbt.”
            </div>

            <div className="collageCard collageCard--photo">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/pizzeria4.jpg"
                alt="Medarbetare i restaurangen"
              />
              <p>Personalen sätter tonen lika mycket som maten gör.</p>
            </div>

            <div className="collageCard collageCard--note">
              <span className="collageCardLabel">I vardagen</span>
              <p>
                Hos oss ska det kännas lätt att komma in, lätt att beställa och
                lätt att vilja komma tillbaka. Det är den typen av vardagsställe
                vi alltid velat bygga.
              </p>
            </div>

            <div className="collageMiniFacts">
              <div className="collageFact">Lokalt tänk</div>
              <div className="collageFact">Öppet från lunch till kväll</div>
              <div className="collageFact">Tempo utan stresskänsla</div>
            </div>

            <div className="collageHandNote">
              Bakom disken finns samma energi varje dag.
            </div>
          </aside>

          <main className="collageColumn collageColumn--center">
            <div className="collageFloatingText collageFloatingText--top">
              Här handlar det inte bara om maten,
              <br />
              utan om känslan runt omkring.
            </div>

            <div className="collageCard collageCard--feature">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/pizzeria4.jpg"
                alt="Signaturrätt från Felino Pizza"
              />
              <div className="collageFeatureText">
                <span className="collageCount">1/3</span>
                <h3>En plats att återvända till</h3>
                <p>
                  För oss handlar restaurangupplevelsen inte bara om vad som
                  ligger på tallriken, utan om helheten. Ljuset, tempot,
                  bemötandet, detaljerna och känslan av att man gärna kommer
                  tillbaka.
                </p>
              </div>
            </div>

            <div className="collageRowSplit">
              <div className="collageCard collageCard--note">
                <span className="collageCardLabel">Vår vision</span>
                <p>
                  Vi tror på vardagslyx i ett avslappnat format. Ett ställe som
                  får vara snyggt och genomtänkt utan att tappa värmen.
                </p>
              </div>

              <div className="collageCard collageCard--photo">
                <div className="collageCardTape" />
                <img
                  src="/images/site/collage/pizzeria4.jpg"
                  alt="Teamet i restaurangen"
                />
                <p>Bakom disken finns samma energi varje dag.</p>
              </div>
            </div>

            <div className="collageCard collageCard--widePhoto">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/pizzeria4.jpg"
                alt="Interiör eller restaurangmiljö"
              />
              <p>
                Från lunchrush till kvällshäng vill vi att stämningen ska vara
                densamma: enkel, levande och välkomnande.
              </p>
            </div>

            <div className="collageFloatingText collageFloatingText--bottom">
              Ett lokalt ställe att återvända till.
            </div>
          </main>

          <aside className="collageColumn collageColumn--right">
            <div className="collageCard collageCard--text">
              <span className="collageCardLabel">Människorna</span>
              <p>
                Det viktigaste hos oss är inte att allt känns perfekt — utan att
                det känns äkta. Gäster ska känna att det finns personer bakom
                platsen, inte bara ett koncept.
              </p>
            </div>

            <div className="collageCard collageCard--photo">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/pizzeria4.jpg"
                alt="Detaljbild från kök eller servering"
              />
              <p>Små detaljer, tydlig identitet och mycket omtanke.</p>
            </div>

            <div className="collageHandNote">
              Ett ställe som får bli en del av människors vardag.
            </div>

            <div className="collageCard collageCard--text collageCard--small">
              <span className="collageCardLabel">Det vi gillar</span>
              <ul className="collageList">
                <li>Välkomnande service</li>
                <li>Hög energi i lokalen</li>
                <li>Schysst tempo</li>
                <li>Detaljer som känns genomtänkta</li>
              </ul>
            </div>

            <div className="collageCard collageCard--photo collageCard--tall">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/pizzeria4.jpg"
                alt="Bild från restaurangens vardag"
              />
              <p>Visionen märks i både människorna, rytmen och miljön.</p>
            </div>

            <div className="collageStamp">Sedan 2025 • Felino Pizza</div>
          </aside>
        </div>

        <div className="collageBottomFill">
          <div className="collageBottomCard collageBottomCard--left">
            <span className="collageBottomCardLabel">Teamet</span>
            <p>
              Det bästa med vardagen här är att samma människor sätter tonen om
              och om igen. Gäster lär känna oss, och vi lär känna dem tillbaka.
            </p>
          </div>

          <div className="collageBottomCenterNote">
            Lite högt tempo. Mycket värme. Alltid känsla.
          </div>

          <div className="collageBottomCard collageBottomCard--right">
            <span className="collageBottomCardLabel">Kvarterskänslan</span>
            <p>
              Vi vill vara den där platsen man tänker på utan att behöva tänka
              så mycket — självklar för lunch, middag eller något snabbt på väg
              hem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}