import "./Collage.css";

const topStripPhotos = [
  {
    image: "/images/site/collage/burgerman.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/pizzeria8.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/klara-kulikova-WcV2YkM3Dls-unsplash.jpg",
    alt: "Bild från Felino Pizza",
  },
  {
    image: "/images/site/collage/PIZZERIA11.jpg",
    alt: "Bild från Felino Pizza",
  },
];

export default function Collage() {
  return (
    <section className="collageSection">
      <p className="favoritesKicker">Om Felino</p>

      <div className="collageEditorial">
        <div className="collageLines" aria-hidden="true">
          <svg
            className="collageLine collageLine--leftToFeature"
            viewBox="0 0 260 140"
          >
            <defs>
              <marker
                id="arrowhead-leftFeature"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0 0 L6 3 L0 6"
                  fill="none"
                  stroke="#386642"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            <path
              d="M18 12 C70 128, 180 24, 232 68"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-leftFeature)"
            />
          </svg>

          <svg
            className="collageLine collageLine--rightToFeature"
            viewBox="0 0 260 240"
          >
            <defs>
              <marker
                id="arrowhead-rightFeature"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0 0 L6 3 L0 6"
                  fill="none"
                  stroke="#386642"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            <path
              d="M242 212 C290 28, 82 94, 30 68"
              fill="none"
              stroke="#386642"
              strokeWidth="2.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-rightFeature)"
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
          <span className="collageEyebrow collageHeadingEyebrowText">
            Felino Pizzeria • Vår Historia
          </span>
          <h2 className="collageHeadingTitleText">
            En kvartersrestaurang med tempo, värme och personlighet.
          </h2>
          <p className="collageHeadingBodyText">
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
              <span className="collageCardLabel collageLeftNameLabelText">
                Bakom namnet
              </span>
              <p className="collageLeftNameBodyText">
                Felino startade som en tanke om att kombinera fart med känsla.
                Inte stelt, inte överarbetat — bara en plats med bra rytm, bra
                människor och en atmosfär som känns självklar från första
                steget in.
              </p>
            </div>

            <div className="collageQuote collageLeftQuoteText">
              “Vi vill att det ska kännas varmt direkt, även när allt går
              snabbt.”
            </div>

            <div className="collageCard collageCard--photo">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/staff.jpg"
                alt="Medarbetare i restaurangen"
              />
              <p className="collageLeftPhotoCaptionText">
               Här börjar din pizza.
              </p>
            </div>

            <div className="collageCard collageCard--note">
              <span className="collageCardLabel collageLeftDailyLabelText">
                I vardagen
              </span>
              <p className="collageLeftDailyBodyText">
                Hos oss ska det kännas lätt att komma in, lätt att beställa och
                lätt att vilja komma tillbaka. Det är den typen av vardagsställe
                vi alltid velat bygga.
              </p>
            </div>

            <div className="collageMiniFacts">
              <div className="collageFact collageFactLocalText">Lokalt tänk</div>
              <div className="collageFact collageFactHoursText">
                Öppet från lunch till kväll
              </div>
              <div className="collageFact collageFactTempoText">
                Tempo utan stresskänsla
              </div>
            </div>

            <div className="collageHandNote1 collageLeftHandNoteText">
              Bakom disken finns samma energi varje dag.
            </div>
          </aside>

          <main className="collageColumn collageColumn--center">
            <div className="collageFloatingText collageFloatingText--top collageCenterTopNoteText">
              Här handlar det inte bara om maten,
              <br />
              utan om känslan runt omkring.
            </div>

            <div className="collageCard collageCard--feature">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/gang.jpg"
                alt="Signaturrätt från Felino Pizza"
              />
              <div className="collageFeatureText">
                <span className="collageCount collageFeatureCountText">1/3</span>
                <h3 className="collageFeatureTitleText">
                  En plats att återvända till
                </h3>
                <p className="collageFeatureBodyText">
                  För oss handlar restaurangupplevelsen inte bara om vad som
                  ligger på tallriken, utan om helheten. Ljuset, tempot,
                  bemötandet, detaljerna och känslan av att man gärna kommer
                  tillbaka.
                </p>
              </div>
            </div>

            <div className="collageRowSplit">
              <div className="collageCard collageCard--note">
                <span className="collageCardLabel collageVisionLabelText">
                  Vår vision
                </span>
                <p className="collageVisionBodyText">
                  Vi tror på vardagslyx i ett avslappnat format. Ett ställe som
                  får vara snyggt och genomtänkt utan att tappa värmen.
                </p>
              </div>

              <div className="collageCard collageCard--photo">
                <div className="collageCardTape" />
                <img
                  src="/images/site/collage/peace.jpg"
                  alt="Teamet i restaurangen"
                />
                <p className="collageCenterPhotoCaptionText">
                  Personalen sätter tonen lika mycket som maten gör.
                </p>
              </div>
            </div>

            <div className="collageCard collageCard--widePhoto">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/guests.jpg"
                alt="Interiör eller restaurangmiljö"
              />
              <p className="collageWidePhotoCaptionText">
                Från lunchrush till kvällshäng vill vi att stämningen ska vara
                densamma: enkel, levande och välkomnande.
              </p>
            </div>

            <div className="collageFloatingText collageFloatingText--bottom collageCenterBottomNoteText">
              Ett lokalt ställe att återvända till ♥
            </div>
          </main>

          <aside className="collageColumn collageColumn--right">
            <div className="collageCard collageCard--text">
              <span className="collageCardLabel collagePeopleLabelText">
                Människorna
              </span>
              <p className="collagePeopleBodyText">
                Det viktigaste hos oss är inte att allt känns perfekt — utan att
                det känns äkta. Gäster ska känna att det finns personer bakom
                platsen, inte bara ett koncept.
              </p>
            </div>

            <div className="collageCard collageCard--photo">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/detaljer.jpg"
                alt="Detaljbild från kök eller servering"
              />
              <p className="collageRightPhotoCaptionText">
                Små detaljer, tydlig identitet och mycket omtanke.
              </p>
            </div>

            <div className="collageHandNote collageRightHandNoteText">
              Ett ställe som får bli en del av människors vardag.
            </div>

            <div className="collageCard collageCard--text collageCard--small">
              <span className="collageCardLabel collageLikesLabelText">
                Det vi gillar
              </span>
              <ul className="collageList collageLikesListText">
                <li className="collageLikesItem collageLikesItem1Text">
                  Välkomnande service
                </li>
                <li className="collageLikesItem collageLikesItem2Text">
                  Hög energi i lokalen
                </li>
                <li className="collageLikesItem collageLikesItem3Text">
                  Schysst tempo
                </li>
                <li className="collageLikesItem collageLikesItem4Text">
                  Detaljer som känns genomtänkta
                </li>
              </ul>
            </div>

            <div className="collageCard collageCard--photo collageCard--tall">
              <div className="collageCardTape" />
              <img
                src="/images/site/collage/restaurant.jpg"
                alt="Bild från restaurangens vardag"
              />
              <p className="collageTallPhotoCaptionText">
                Visionen märks i både människorna, rytmen och miljön.
              </p>
            </div>

            <div className="collageStamp collageStampText">⤦</div>
          </aside>
        </div>

        <div className="collageBottomFill">
          <div className="collageBottomCard collageBottomCard--left">
            <span className="collageBottomCardLabel collageBottomLeftLabelText">
              Teamet
            </span>
            <p className="collageBottomLeftBodyText">
              Det bästa med vardagen här är att samma människor sätter tonen om
              och om igen. Gäster lär känna oss, och vi lär känna dem tillbaka.
            </p>
          </div>

          <div className="collageBottomCenterNote collageBottomCenterNoteText">
            Högt tempo. Mycket värme. Alltid känsla.
          </div>

          <div className="collageBottomCard collageBottomCard--right">
            <span className="collageBottomCardLabel collageBottomRightLabelText">
              Kvarterskänslan
            </span>
            <p className="collageBottomRightBodyText">
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