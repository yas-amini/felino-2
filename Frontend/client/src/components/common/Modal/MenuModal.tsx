import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  getMenuPreview,
  type MenuPreviewCategoryDto,
} from "../../../api/menuPreviewApi";
import "./MenuModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MenuModal({ isOpen, onClose }: Props) {
  const [categories, setCategories] = useState<MenuPreviewCategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function loadPreview() {
      try {
        setIsLoading(true);
        const result = await getMenuPreview(5);
        setCategories(result);
      } catch (error) {
        console.error("Kunde inte hämta meny-preview:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPreview();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="wide">
      <div className="menuModal">
        <div className="menuModalTop">
          <div className="menuModalLogoTitle">
            <h2 className="menuModalTitle">Felino&apos;s Meny</h2>
          </div>

          <p className="menuModalSubtitle">
            Ett urval av våra mest populära rätter.
          </p>
        </div>

        <div className="menuModalDivider" />

        {isLoading ? (
          <div className="menuModalGrid">
            <section className="menuCategoryCard">
              <div className="menuCategoryTitle">
                <span className="menuCategoryTitleText">Laddar...</span>
              </div>
            </section>
          </div>
        ) : categories.length === 0 ? (
          <div className="menuModalGrid">
            <section className="menuCategoryCard">
              <div className="menuCategoryTitle">
                <span className="menuCategoryTitleText">Meny</span>
              </div>

              <div className="menuCategoryItems">
                <div className="menuItemRow">
                  <span className="menuItemName">
                    Kunde inte hämta menyförslag just nu.
                  </span>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="menuModalGrid">
            {categories.map((category) => (
              <section className="menuCategoryCard" key={category.title}>
                <div className="menuCategoryTitle">
                  <span className="menuCategoryTitleText">{category.title}</span>
                </div>

                <div className="menuCategoryItems">
                  {category.items.map((item) => (
                    <div className="menuItemRow" key={item.id}>
                      <span className="menuItemName">{item.name}</span>
                      <span className="menuItemPrice">{item.price}:-</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="menuModalDivider" />

        <div className="menuModalFooter">
          <p className="menuModalFooterText">
            Boka bord, beställ hemkörning/upphämtning eller kika in hela menyn på
            beställningssidan!
          </p>

          <div className="menuModalActions">
            <Link to="/boka-bord" className="menuModalLink">
              <Button
                variant="primary"
                leftIcon={<FontAwesomeIcon icon={faCalendar} />}
              >
                Boka bord
              </Button>
            </Link>

            <Link to="/bestall" className="menuModalLink">
              <Button
                variant="primary"
                leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
              >
                Beställ hem
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}